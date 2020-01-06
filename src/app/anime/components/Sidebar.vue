<template>
  <aside>
    <Poster :image="anime.posterImage"></Poster>
    <Info :anime="anime"></Info>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Anime } from '@/models';

import Poster from './Poster.vue';
import Info from './Info.vue';

@Component({
  components: { Poster, Info },
})
export default class Sidebar extends Vue {
  @Prop() private anime!: Anime;
}
</script>

<style lang='scss' scoped>
aside {
  position: relative;
}

aside > * {
  margin: 0 auto;
}
</style>
