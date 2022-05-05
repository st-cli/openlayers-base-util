/*
 * @Description: vue.config.js
 * @Autor: houyueke
 * @Date: 2022-04-01 10:38:46
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-28 11:59:56
 */
const CompressionPlugin = require('compression-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const { modifyVars } = require('./src/config/index')

module.exports = {
  lintOnSave: false, //保存时lint
  productionSourceMap: false, //打包是否生成source map 文件
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_URL_TARGET,
        changeOrigin: true
        // pathRewrite: {
        //   ['^' + process.env.VUE_APP_BASE_URL]: ''
        // }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.css$/,
        minRatio: 0.8,
        threshold: 10240,
        deleteOriginalAssets: isProd ? true : false
      })
    ]
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: modifyVars(),
        javascriptEnabled: true
      }
    }
  }
}
