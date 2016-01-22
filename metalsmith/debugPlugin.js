const debug = require('debug')('build:debugger')

const debugPlugin = () =>
  (files, metalsmith, done) => {
    debug(files)
    debug(metalsmith)
    done()
  }

export default debugPlugin
