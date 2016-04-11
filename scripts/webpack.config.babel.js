import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor-fork"
import markdownItVideo from "markdown-it-video"

export default ({ config, pkg }) => ({
  ...config.dev && {
    devtool: "cheap-module-eval-source-map",
  },
  module: {
    loaders: [
      { // statinamic requirement
        test: /\.md$/,
        loader: "statinamic/lib/content-loader",
      },
      {
        test: /\global.styles$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader" +
          "!postcss!sass-loader"
        ),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader" +
            "?modules" +
            "&localIdentName=[name]--[local]--[hash:base64:5]" +
          "!postcss!sass-loader"
        ),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader" +
            "?modules" +
            "&localIdentName=[name]--[local]--[hash:base64:5]" +
          "!postcss"
        ),
      },
      {
        test: /\.(html|ico|jpe?g|png|gif|svg)$/,
        loader: "file-loader?name=assets/images/[hash:base64]__[name].[ext]&context=" +
        path.join(config.cwd, config.destination),
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
        loader: "file-loader?name=font/[hash:base64].[ext]",
      },
    ],
  },
  statinamic: {
    loader: {
      context: path.join(config.cwd, config.source),
      renderer: (text) => (
        require("markdown-it")({
          html: true,
          linkify: true,
          typographer: true,
          highlight: (code, lang) => {
            code = code.trim()
            const hljs = require("highlight.js")
            // language is recognized by highlight.js
            if (lang && hljs.getLanguage(lang)) {
              return hljs.highlight(lang, code).value
            }
            // ...or fallback to auto
            return hljs.highlightAuto(code).value
          },
        })
        .use(markdownItTocAndAnchor, {
          tocFirstLevel: 1,
        })
        .use(markdownItVideo)
        .render(text)
      ),
      description: {
        pruneLength: 200,
      },
      feedsOptions: {
        title: pkg.config.sitename,
        site_url: pkg.homepage,
      },
      feeds: {
        "feed.xml": {
          collectionOptions: {
            filter: (item) => (item.layout === "Post" && !item.draft),
            sort: "date",
            reverse: true,
            limit: 20,
          },
        },
      },
    },
  },

  postcss: () => [
    require("autoprefixer"),
  ],
  sassLoader: {
    includePaths: [
      path.join(config.cwd, "web_modules/styles"),
      path.join(config.cwd, "web_modules"),
      path.join(config.cwd, "node_modules"),
    ],
  },

  plugins: [
    new ExtractTextPlugin("[name].[hash].css", { disable: config.dev }),
    new webpack.DefinePlugin({ "process.env": {
      NODE_ENV: JSON.stringify(
        config.production ? "production" : process.env.NODE_ENV
      ),
      STATINAMIC_PATHNAME: JSON.stringify(process.env.STATINAMIC_PATHNAME),
    } }),
    ...config.production && [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      // http://stackoverflow.com/a/25426019
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /vi/),
    ],
  ],

  // ↓ HANDLE WITH CARE ↓ \\

  output: {
    path: path.join(config.cwd, config.destination),
    publicPath: config.baseUrl.pathname,
  },
  resolve: {
    extensions: [ ".js", ".json", "" ],
    root: [ path.join(config.cwd, "node_modules") ],
  },
  resolveLoader: { root: [ path.join(config.cwd, "node_modules") ] },
})
