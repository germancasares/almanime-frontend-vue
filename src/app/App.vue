<template>
  <div id="app" class="has-navbar-fixed-top">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { get as getCookie } from "es-cookie";
import AccountModule, { IAccountState } from "@/app/account/store";
import { Header } from './header';
import { Footer } from './footer';

@Component({
  name: 'App',
  components: {
    Header,
    Footer,
  }
})
export default class App extends Vue {
  created() {
    let cookie = getCookie('accountState');
    if(cookie !== undefined) {
      let accountState: IAccountState = JSON.parse(cookie);
      AccountModule.LoadState(accountState);
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