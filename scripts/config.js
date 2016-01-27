/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'
import pkg from '../package.json'
import configurator from 'statinamic/lib/configurator'

const config = {
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base   : path.resolve(__dirname, '../'),
  dir_client  : 'web_modules',
  dir_content : 'content',
  dir_dist    : 'dist',
  ...configurator(pkg)
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
