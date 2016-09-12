import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import { phenomicLoader } from "phenomic"

import pkg from "./package.json"

// note that this webpack file is exporting a "makeConfig" function
// which is used for phenomic to build dynamic configuration based on your needs
// see the end of the file if you want to export a default config
// (eg: if you share your config for phenomic and other stuff)
export const makeConfig = (config = {}) => {
  return {
    ...config.dev && {
      devtool: "#cheap-module-eval-source-map",
    },
    module: {
      noParse: /\.min\.js/,
      loaders: [
        // *.md => consumed via phenomic special webpack loader
        // allow to generate collection and rss feed.
        {
          // phenomic requirement
          test: /\.md$/,
          loader: phenomicLoader,
          exclude: [
            /stalled/,
          ],
          // config is in `phenomic` section later in the file
          // so you can use functions (and not just JSON) due to a restriction
          // of webpack that serialize/deserialize loader `query` option.
        },

        // *.json => like in node, return json
        // (not handled by webpack by default)
        {
          test: /\.json$/,
          loader: "json-loader",
        },

        // *.js => babel + eslint
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
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules", "react-icons"),
          ],
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, "src"),
          loader: ExtractTextPlugin.extract(
            "style-loader",
            [ "css-loader", "sass-loader" ].join("!"),
          ),
        },
        // copy assets and return generated path in js
        {
          test: /content(\/|\\).*\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader?name=[path][name].[ext]&context=./content",
        },
        {
          test: /src(\/|\\).*\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader",
          query: {
            name: "images/[path][name].[ext]",
            context: "./src",
          },
        },

        // svg as raw string to be inlined
        {
          test: /\.svg$/,
          loader: "raw-loader",
        },
        {
          test: /\.yml$/,
          loader: "json-loader!yaml-loader",
        },
      ],
    },

    phenomic: {
      context: path.join(__dirname, config.source),
      // plugins: [ ...phenomicLoaderPresets.markdown ]
      // see https://phenomic.io/docs/usage/plugins/
      feedsOptions: {
        title: pkg.name,
        site_url: pkg.homepage,
      },
      feeds: {
        "feed.xml": {
          collectionOptions: {
            filter: { layout: "Post" },
            sort: "date",
            reverse: true,
            limit: 20,
          },
        },
      },
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

// you might want to export a default config for another usage ?
// export default makeConfig()
