<template>
  <div :class="[isDarkTheme ? 'theme-dark' : 'theme-light']">
    <div id="app" class="has-navbar-fixed-top">
      <Header></Header>
      <router-view />
      <Footer></Footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import UserModule from '@/app/account/store';
import { app as AppModule } from './store';
import { Header } from './header';
import { Footer } from './footer';
import Helper from '@/utils/helper';
import { mapState } from 'vuex';

@Component({
  name: 'App',
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapState('App', ['isDarkTheme']),
  },
})
export default class App extends Vue {
  public isDarkTheme!: boolean;

  private async created() {
    this.loadTheme();
    await this.loadAccountState();
  }

  private loadTheme() {
    let isDarkTheme = Helper.LocalStorage.Get<boolean>('isDarkTheme');
    if (isDarkTheme === null) {
      isDarkTheme = false;
      Helper.LocalStorage.Create('isDarkTheme', isDarkTheme);
    }
    AppModule.UpdateTheme(isDarkTheme);
  }

  private async loadAccountState() {
    const accountState = Helper.Cookie.GetAccountState();
    if (accountState !== null) {
      await UserModule.LoadState(accountState);
      await UserModule.LoadUser();
      const isLoginOrRegister = this.$route.name === 'login' || this.$route.name === 'register';
      if (isLoginOrRegister) {
        this.$router.push({ name: 'home' });
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  @include themed() {
    background-color: t($background);
  }
}
</style>