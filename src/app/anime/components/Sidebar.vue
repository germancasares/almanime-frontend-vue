<template>
  <aside>
    <poster :image="anime.posterImage"></poster>
    <info :anime="anime"></info>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Anime } from "@/models";

import poster from "./Poster.vue";
import info from "./Info.vue";

@Component({
  components: { poster, info }
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
