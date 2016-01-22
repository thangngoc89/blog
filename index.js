import Metalsmith from 'metalsmith'
import markdown from 'metalsmith-markdown'
import react from 'metalsmith-react'
import metadata from 'metalsmith-metadata'
import serve from 'metalsmith-serve'
import watch from 'metalsmith-watch'
import sass from 'metalsmith-sass'
import debugPlugin from './metalsmith/debugPlugin'

import _debug from 'debug'
const debug = _debug('build')
debug('Build started')

/**
 * Run metalsmith
 * Drop .use(debugPlugin()) anywhere
 */
Metalsmith(__dirname)
  .use(metadata({
    'config': 'config/config.yml'
  }))
  .use(markdown())
  .use(sass())
  .use(
    react({
      before: '<!doctype html>',
      pattern: '**/*.html',
      defaultTemplate: 'layouts/Post.js',
      data: {
        some: 'data'
      },
      reactRender: 'renderToStaticMarkup'
    })
  )
  // .use(watch({
  //   paths: {
  //     '${source}/**/*': true,
  //     'templates/**/*': true
  //   },
  //   livereload: true
  // }))
  .use(serve({
    port: 3000,
    verbose: false
  }))
  .destination('./build')
  .build((err) => {
    debug('Build finished')
    if (err) {
      debug('Build error')
      debug(err)
    }
  })
