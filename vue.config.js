module.exports = {
  pwa: {
    name: 'Almanime',
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/_variables.scss"; @import "@/styles/_color-themes.scss"; @import "@/styles/_global-rules.scss";'
      },
    },
  },
};
