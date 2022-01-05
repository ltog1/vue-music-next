const path = require('path')
const registerRouter = require('./backend/router')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        // sass-loader  7.x版本使用data  8.x版本使用prependData  10.x版本使用additionalData
        prependData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    before(app) {
      registerRouter(app)
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))

    if (process.env.NODE_ENV === 'production') {
      config.output
        .filename('js/[name].js?r=[contenthash:8]')
        .chunkFilename('js/[name].js?r=[contenthash:8]')
    }
  },
  configureWebpack: config => {
    // 使用打包分析工具  npm run build --report
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  }
}
