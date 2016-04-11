import path from "path"

// ! client side loader only \\
export default ({ config }) => {
  const { webpackConfig } = config
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      loaders: [
        ...webpackConfig.module.loaders,
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.js$/,
          loaders: [
            `babel-loader${
              config.dev ? "?presets[]=babel-preset-react-hmre" : ""
            }`,
            "eslint-loader?fix",
          ],
          include: [
            path.resolve(config.cwd, "scripts"),
            path.resolve(config.cwd, "web_modules"),
          ],
        },
      ],
    },
    // ↓ HANDLE WITH CARE ↓ \\

    output: {
      ...webpackConfig.output,
      libraryTarget: "var",
      filename: "[name].[hash].js",
      ...config.production && {
        filename: "[name].[chunkhash].js",
      },
    },
    entry: {
      // 'w-1-vendor': [
      //   'react',
      //   'react-redux',
      //   'react-helmet',
      //   'react-router',
      //   'redux',
      //   'whatwg-fetch',
      //   'moment',
      //   'classnames'
      // ],
      "w-2-client": path.join(__dirname, "index-client"),
    },
  }
}
