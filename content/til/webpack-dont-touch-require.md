---
layout: Post
title: Make webpack don't touch a require
date: 2018-01-23
tags: [til, webpack]
---

When using Webpack, it transforms all of your require/import statements.
But sometimes, you don't want that behaviour, you want to Webpack to keep it as is.

You can use `__non_webpack_require__` to generate a require function that is not parsed by Webpack.

For more useful global Webpack variables, check out the docs here: [https://webpack.js.org/api/module-variables/#**non_webpack_require**-webpack-specific-](https://webpack.js.org/api/module-variables/#__non_webpack_require__-webpack-specific-)
