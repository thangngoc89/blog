/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'

const config = {
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base   : path.resolve(__dirname, '../'),
  dir_client  : 'web_modules',
  dir_content : 'content',
  dir_dist    : 'dist'
}

// ------------------------------------
// Utilities
// ------------------------------------
config.utils_paths = (() => {
  const resolve = path.resolve

  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base    : base,
    content : base.bind(null, config.dir_content),
    client  : base.bind(null, config.dir_client),
    dist    : base.bind(null, config.dir_dist),
    node    : base.bind(null, 'node_modules')
  }
})()

export default config
