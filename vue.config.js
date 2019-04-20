const path = require('path');
module.exports = {
  transpileDependencies: ['vuex-module-decorators'],
  pwa: {
    name: 'Almanime'
  },
  configureWebpack: {
    resolve: {
      alias : {
        "icons": path.resolve(__dirname, "node_modules/vue-material-design-icons")
      }
    }    
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.scss";`
      }
    }
  }
}