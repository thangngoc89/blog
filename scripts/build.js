import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import buildConfig from '../config'
import markdownIt from 'markdown-it'
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor-fork'
import markdownItVideo from 'markdown-it-video'
import hljs from 'highlight.js'

import pkg from '../package.json'
import builder from 'statinamic/lib/builder'
import configurator from 'statinamic/lib/configurator'
import prepareDefinedValues from 'statinamic/lib/prepare-defined-values'

const config = {
  ...buildConfig,
  ...configurator(pkg)
}

const paths = config.utils_paths
const CSS_HASH = (config.dev) ? '[name]__[local]__[hash:base64:5]' : '[hash:base64]'

const webpackConfig = {
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
        loader: 'statinamic/lib/md-collection-loader' +
          `?${ JSON.stringify({
            context: paths.content(),
            basepath: config.baseUrl.path,
            feedsOptions: {
              title: pkg.name,
              site_url: pkg.homepage,
            },
            feeds: {
              'feed.xml': {
                collectionOptions: {
                  filter: { layout: 'Post' },
                  sort: 'date',
                  reverse: true,
                  limit: 20,
                },
              },
            },
          }) }`,
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
    new webpack.DefinePlugin(prepareDefinedValues(config.consts))
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
      tocFirstLevel: 2
    })
    .use(markdownItVideo)
  ),
}

builder({
  config,
  source: paths.content(),
  dest: paths.dist(),
  staticAssets: {
    source: paths.content('images'),
    route: '/assets/article_images'
  },
  clientWebpackConfig: {
    ...webpackConfig,
    entry: {
      'statinamic-client': paths.base('scripts', 'index-client')
    },
    plugins: [
      ...webpackConfig.plugins,
      // ! \\ the static build below will extract the exact same thing in the
      // same file, but here we use extract plugin to REMOVE REDUNDANT CSS
      // from the build. Since there is a static build that is used for the
      // first viewed page (which contains all css), we don't need styles in
      // the JS too.
      new ExtractTextPlugin(
        '[name].css',
        { disable: config.dev }
      ),
      ...config.prod && [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
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
