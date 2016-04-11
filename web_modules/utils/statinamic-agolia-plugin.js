import cache from "statinamic/lib/md-collection-loader/cache"
import enhanceCollection from "statinamic/lib/enhance-collection"
import algoliasearch from "algoliasearch"
import remark from "remark"
import strip from "strip-markdown"
import debug from "debug"
import color from "chalk"

const log = debug("statinamic:plugin:agolia")
/**
 * Webpack plugin section
 */
const StatinamicAgoliaPlugin = function(opts) {
  this.opts = opts
}
StatinamicAgoliaPlugin.prototype.apply = function(compiler) {
  compiler.plugin("done", () => sendToAgolia(this.opts))
}

/**
 * Send everything to Agolia
 */
const sendToAgolia = (opts) => {
  const when = opts.when
  if (typeof when === "function" && !when()) {
    return
  }
  const mdProcess = remark.use(strip)
  // Flatten head
  let data = cache.map((item) => {
    return {
      ...item,
      ...item.head,
      head: undefined,
    }
  })

  if (opts.collectionOptions) {
    data = enhanceCollection(data, opts.collectionOptions)
  }

  data = data.map((item) => {
    item.objectID = item.__filename
    item.body = mdProcess.process(item.rawBody)

    delete item.__filename
    delete item.rawBody
    delete item.raw

    return item
  })

  log(color.green("Sending data to Agolia..."))

  const client = algoliasearch(opts.appId, opts.adminKey)
  const index = client.initIndex(opts.indexName)
  index.saveObjects(data, (error) => {
    // Don't fail on error
    if (error) {
      log(color.red("Error while sending data to Agolia"))
      log(error.stack || error)
    }

    log(color.green("Sent data to Agolia"))
  })
}

module.exports = StatinamicAgoliaPlugin
