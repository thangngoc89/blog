import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor-fork'
import markdownItVideo from 'markdown-it-video'
import StatinamicAgoliaPlugin from '../web_modules/utils/statinamic-agolia-plugin'
// import pkg from '../package.json'

import config from './config.js'

export default {
  ...config.dev && {
    devtool: 'cheap-module-eval-source-map'
  },
  module: {
    loaders: [
      { // statinamic requirement
        test: /\.md$/,
        loader: 'statinamic/lib/md-collection-loader?' +
          JSON.stringify({
            context: path.join(config.cwd, config.source),
            basepath: config.baseUrl.path
          //   feedsOptions: {
          //     title: pkg.config.sitename,
          //     site_url: pkg.homepage
          //   },
          //   feeds: {
          //     'feed.xml': {
          //       collectionOptions: {
          //         filter: (item) => (item.layout === 'Post' && !item.draft),
          //         sort: 'date',
          //         reverse: true,
          //         limit: 20
          //       }
          //     }
          //   }
          })
      },
      {
        test: /\global.styles$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader' +
          '!postcss!sass-loader'
        )
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader' +
            '?modules' +
            '&localIdentName=[name]--[local]--[hash:base64:5]' +
          '!postcss!sass-loader'
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader' +
            '?modules' +
            '&localIdentName=[name]--[local]--[hash:base64:5]' +
          '!postcss'
        )
      },
      {
        test: /\.(html|ico|jpe?g|png|gif|svg)$/,
        loader: 'file-loader?name=assets/images/[hash:base64]__[name].[ext]&context=' +
        path.join(config.cwd, config.destination)
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=font/[hash:base64].[ext]'
      }
    ]
  },
  postcss: () => [
    require('cssnano')({
      sourcemap: true,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      safe: true,
      discardComments: {
        removeAll: true
      }
    }),
    require('autoprefixer')
  ],
  sassLoader: {
    includePaths: [
      path.join(config.cwd, 'web_modules/styles'),
      path.join(config.cwd, 'web_modules'),
      path.join(config.cwd, 'node_modules')
    ]
  },
  markdownIt: (
    require('markdown-it')({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (code, lang) => {
        code = code.trim()
        const hljs = require('highlight.js')
        // language is recognized by highlight.js
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(lang, code).value
        }
        // ...or fallback to auto
        return hljs.highlightAuto(code).value
      }
    })
    .use(markdownItTocAndAnchor, {
      tocFirstLevel: 1
    })
    .use(markdownItVideo)
  ),

  plugins: [
    new ExtractTextPlugin('[name].[hash].css', { disable: config.dev }),
    new webpack.DefinePlugin({ 'process.env': {
      NODE_ENV: JSON.stringify(
        config.production ? 'production' : process.env.NODE_ENV
      ),
      CLIENT: true,
      REDUX_DEVTOOLS: Boolean(process.env.REDUX_DEVTOOLS),
      STATINAMIC_PATHNAME: JSON.stringify(process.env.STATINAMIC_PATHNAME)
    } }),
    ...config.production && [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      // http://stackoverflow.com/a/25426019
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /vi/)
    ],
    // Only export new search data on Travis
    new StatinamicAgoliaPlugin({
      when: () => {
        // const env = process.env
        // return (
        //   env.production &&
        //   env.TRAVIS &&
        //   env.TRAVIS_NODE_VERSION.startsWith('5') &&
        //   env.TRAVIS_BRANCH === 'master' &&
        //   env.PACKAGE_MANAGER === 'npm'
        // )
        return false
      },
      appId: '24C9AMVZXS',
      adminKey: process.env.AGOLIA_ADMIN_KEY,
      indexName: 'khoanguyenblog',
      collectionOptions: {
        filter: (item) => (item.layout === 'Post' && !item.draft)
      }
    })
  ],

  // ↓ HANDLE WITH CARE ↓ \\

  output: {
    libraryTarget: 'commonjs2', // for node usage, undone in client config
    path: path.join(config.cwd, config.destination),
    publicPath: config.baseUrl.path
  },
  resolve: {
    extensions: [ '.js', '.json', '' ],
    root: [ path.join(config.cwd, 'node_modules') ]
  },
  resolveLoader: { root: [ path.join(config.cwd, 'node_modules') ] }
}
