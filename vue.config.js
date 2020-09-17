const path = require('path');
module.exports = {
  transpileDependencies: ['vuex-module-decorators'],
  pwa: {
    name: 'Almanime'
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias : {
        "icons": path.resolve(__dirname, "node_modules/vue-material-design-icons")
      }
    }    
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/_color-themes.scss";'
      }
    }
  }
}