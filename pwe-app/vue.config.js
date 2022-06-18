const { defineConfig } = require('@vue/cli-service')


module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    open: true
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        stream: require.resolve("stream-browserify")
      }
      
    }
  }
})
