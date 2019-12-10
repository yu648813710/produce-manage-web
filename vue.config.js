const webpack = require('webpack')
let VUE_APP_EXCUTION = process.env.VUE_APP_EXCUTION // 环境变量
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 打包使用的插件
const productionGzipExtensions = ['js', 'css'] // 打包文件类型
module.exports = {
  publicPath: VUE_APP_EXCUTION === 'fn' ? '/' : '/producemng/',
  configureWebpack: config => {
    let plugins = [
      // 忽略所有的本地 moment 文件
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
    if (VUE_APP_EXCUTION !== 'fn') {
      // 如果是生产环境打包，那就压缩处理
      plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]

    // 配置打包
    config.optimization = {
      splitChunks: {
        minSize: 100000, // 模块大于 1m 会被抽离到公共模块
        maxSize: 200000, // 单个文件最大的size 2m
        minChunks: 2, // 模块出现 2 次就会被抽离到公共模块
        maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
        maxInitialRequests: 3, // 入口模块最多只能加载3个
        automaticNameDelimiter: '~', // 打包文件自定义的链接符
        name: true,
        chunks: 'async' // initial(初始块)、async(按需加载块)、all(默认，全部块)
      }
    }
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
  chainWebpack: config => {
    // 打包分析插件
    if (process.env.VUE_APP_IS_ANALYZER === true) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
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
