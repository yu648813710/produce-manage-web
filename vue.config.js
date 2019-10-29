const webpack = require('webpack')
let VUE_APP_EXCUTION = process.env.VUE_APP_EXCUTION
module.exports = {
  publicPath: VUE_APP_EXCUTION === 'fn' ? '/' : './',
  configureWebpack: config => {
    let plugins = [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
    config.plugins = [...config.plugins, ...plugins]
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    // development server port 8000
    open: true,
    port: 8081,
    proxy: {
      '/api': {
        // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        // target: 'http://172.16.1.112',
        target: 'http://172.16.1.120',
        changeOrigin: true // 需要虚拟托管站点
      },
      '/producemanage': {
        target: 'http://172.16.1.112',
        // target: 'http://172.16.1.120:9090',
        ws: false,
        changeOrigin: true
      },
      '/solution': {
        // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        target: 'http://172.16.1.120:9070',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/productanalysis': {
        // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        target: 'http://172.16.1.120:9090',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/report': {
        // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        target: 'http://106.38.53.203:12825',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: true
}
