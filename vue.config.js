const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/utils/variables.scss";'
      }
    }
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  }
};
