<template>
  <div id="app" class="has-navbar-fixed-top">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import { Header } from './header';
import { Footer } from './footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $background;
}
</style>