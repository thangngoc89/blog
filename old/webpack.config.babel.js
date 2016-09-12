import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor-fork"
import markdownItVideo from "markdown-it-video"
import pkg from "./package.json"

export const makeConfig = (config = {}) => {
  return {
    ...config.dev && {
      devtool: "#cheap-module-eval-source-map",
    },
    module: {
      noParse: /\.min\.js/,
      loaders: [
        {
          // phenomic requirement
          test: /\.md$/,
          loader: "phenomic/lib/content-loader",
        },
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.js$/,
          loaders: [
            `babel-loader${
              config.dev
              ? "?cacheDirectory=true&presets[]=babel-preset-react-hmre"
              : "?cacheDirectory=true"
            }`,
            "eslint-loader?fix",
          ],
          include: [
            path.resolve(__dirname, "scripts"),
            path.resolve(__dirname, "web_modules"),
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.global\.css$/,
          include: path.resolve(__dirname, "web_modules"),
          loader: ExtractTextPlugin.extract(
            "style-loader",
            [ `css-loader?modules&localIdentName=${
                config.production
                ? "[hash:base64:5]"
                : "[path][name]--[local]--[hash:base64:5]"
              }`,
              "postcss-loader",
            ].join("!"),
          ),
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
            "css-loader" + (
              "?modules"+
              "&localIdentName=" +
              (
                process.env.NODE_ENV === "production"
                ? "[hash:base64:5]"
                : "[path][name]--[local]--[hash:base64:5]"
              ).toString()
            ) + "!" +
            "postcss-loader!sass-loader",
          ),
        },
        {
          test: /content(\/|\\).*\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader?name=[path][name].[ext]&context=./content",
        },
        {
          test: /web_modules(\/|\\).*\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader",
          query: {
            name: "images/[path][name].[ext]",
            context: "./web_modules",
          },
        },
        {
          test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
          loader: "file-loader?name=font/[hash:base64].[ext]",
        },
      ],
    },

    phenomic: {
      contentLoader: {
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
      require("postcss-import")(),
      require("postcss-cssnext")({
        browsers: [ "last 2 versions", "ie >= 8", "iOS >= 6", "Android >= 4" ],
        features: {
          customProperties: {
            variables: {
              colorPrimary: "#FF9800",
              colorDivider: "#eeeeee",
            },
          },
          customMedia: {
            extensions: {
              "--sm": "screen and (min-width: 35.5rem)",
              "--md": "screen and (min-width: 48rem)",
              "--lg": "screen and (min-width: 64rem)",
              "--xl": "screen and (min-width: 80rem)",
            },
          },
        },
      }),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
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
      ...config.production && [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(
          { compress: { warnings: false } }
        ),
      ],
    ],

    output: {
      path: path.join(__dirname, config.destination),
      publicPath: config.baseUrl.pathname,
      filename: "[name].[hash].js",
    },

    resolve: {
      extensions: [ ".js", ".json", "" ],
      root: [ path.join(__dirname, "node_modules") ],
    },
    resolveLoader: { root: [ path.join(__dirname, "node_modules") ] },
  }
}
