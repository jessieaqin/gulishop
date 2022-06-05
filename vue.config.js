const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//禁用eslint

  devServer: {
    host: 'localhost',
    port: 8082,
    https: false,
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',//转发的目标服务器地址
        // pathRewrite: { '^/api': '' },//路径地址需要带api
      },
    },
  },


})
