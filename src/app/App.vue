<template>
  <div id="app" class="has-navbar-fixed-top">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserModule from '@/app/account/store';
import { Header } from './header';
import { Footer } from './footer';
import Helper from '@/utils/helper';

@Component({
  name: 'App',
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {
  private async created() {
    const accountState = Helper.Cookie.GetAccountState();
    if (accountState !== null) {
      await UserModule.LoadState(accountState);
      await UserModule.LoadUser();
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $background;
}
</style>