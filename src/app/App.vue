<template>
  <div :class="[isDarkTheme ? 'theme-dark' : 'theme-light']">
    <div id="theme">
      <Header />
      <router-view />

      <!-- <Footer></Footer> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';

import Header from '@/app/header/Header.vue';

export default {
  components: { Header },
  setup() {
    const store = useStore();
    const isDarkTheme = computed(() => store.state.app.isDarkTheme);

    return {
      isDarkTheme,
    };
  },
};
</script>

<style lang="scss">
#theme {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @include themed() {
    background-color: t($background);
  }
}
</style>
