import cache from 'statinamic/lib/md-collection-loader/cache'
import debug from 'debug'
import _ from 'lodash'
const log = debug('statinamic:plugin:tagging')
/**
 * Webpack plugin section
 */
const StatinamicTaggingPlugin = function (opts) {
  this.opts = opts
}
StatinamicTaggingPlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', () => main())
}

/**
 * Send everything to Agolia
 */
const main = () => {
  if (cache.length <= 0) {
    return false
  }

  log('Start')
  const tags = _.chain(cache)
    .map((item) => (
      item.head && item.head.tags
    ))
    .filter((item) => item !== undefined)
    .flatten()
    .uniq()
    .value()

  log('Mutate collection')
  tags.forEach((item) => {
    cache.push({
      __url: `/tags/${item}`,
      __resourceUrl: `/tags/${item}/index.html`
    })
  })
  log(tags)
}

module.exports = StatinamicTaggingPlugin
