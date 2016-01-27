import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import markdownIt from 'markdown-it'
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor-fork'
import markdownItVideo from 'markdown-it-video'
import hljs from 'highlight.js'

import builder from 'statinamic/lib/builder'
import prepareDefinedValues from 'statinamic/lib/prepare-defined-values'

import pkg from '../package.json'
import config from './config'

const paths = config.utils_paths
const CSS_HASH = (config.dev) ? '[name]__[local]__[hash:base64:5]' : '[hash:base64]'

const webpackConfig = {
  ...config.dev && {
    devtool: 'eval'
  },
  output: {
    path: paths.dist(),
    filename: '[name].js',
    publicPath: config.baseUrl.path
  },
  resolve: {
    extensions: ['.js', '.json', ''],
    root: paths.node()
  },
  resolveLoader: {
    root: paths.node()
  },
  module: {
    loaders: [
      //
      // statinamic requirement
      //
      {
        test: /\.md$/,
        loader: 'statinamic/lib/md-collection-loader',
        query: {
          context: paths.content(),
          basepath: config.baseUrl.path,
          feedsOptions: {
            title: pkg.config.siteName,
            site_url: pkg.homepage,
          }
          // feeds: {
          //   'feed.xml': {
          //     collectionOptions: {
          //       filters: [
          //         { layout: 'Post' },
          //         { draft: undefined },
          //         { draft: false }
          //       ],
          //       sort: 'date',
          //       reverse: true,
          //       limit: 20
          //     }
          //   }
          // }
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      // your loaders
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
          'eslint-loader?fix'
        ],
        exclude: /node_modules/
      },
      {
        test: /\global.styles$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'+
          '!postcss!sass-loader'
        ),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?localIdentName=' + CSS_HASH + '&modules' +
          '!postcss!sass-loader'
        ),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?localIdentName=' + CSS_HASH + '&modules' +
          '!postcss'
        ),
      },
      {
        test: /\.(html|ico|jpe?g|png|gif)$/,
        loader: 'file-loader?name=assets/images/[hash:base64]__[name].[ext]&context=' + paths.content(),
      },
    ],
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
      paths.client('styles'),
      paths.client(),
      paths.node()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ...prepareDefinedValues(config.consts),
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  markdownIt: (
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (code, lang) => {
        code = code.trim()
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
}

builder({
  config,
  source: paths.content(),
  dest: paths.dist(),
  staticAssets: {
    path: 'images',
    route: 'assets/article_images'
  },
  clientWebpackConfig: {
    ...webpackConfig,
    entry: {
      'statinamic-client': paths.base('scripts', 'index-client')
    },
    plugins: [
      ...webpackConfig.plugins,
      new ExtractTextPlugin(
        '[name].css',
        { disable: config.dev }
      ),
      ...config.prod && [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: {
            warnings: false
          }
        })
      ]
    ]
  },
  staticWebpackConfig: {
    ...webpackConfig,
    entry: {
      'statinamic-static': paths.base('scripts', 'index-static')
    },
    target: 'node',
    externals: [
      ...fs.readdirSync('node_modules').filter(x => x !== '.bin'),
      'statinamic/lib/md-collection-loader/cache'
    ],
    output: {
      ...webpackConfig.output,
      libraryTarget: 'commonjs2',
      path: paths.dist()
    },
    plugins: [
      ...webpackConfig.plugins,
      // extract (and overwrite) statinamic client css
      // poor workaround to avoid having 2 identical files...
      new ExtractTextPlugin('statinamic-client.css')
    ]
  }
})
