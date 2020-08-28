<template>
  <aside>
    <Poster :image="Helper.ResizeImageOrDefault(anime.posterImage, AnimePosterSize.Small)"></Poster>
    <Info></Info>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Anime } from '@/models';
import { Poster } from '@/components';
import Info from './Info.vue';
import Helper from '@/utils/helper';
import { AnimePosterSize } from '@/enums';

@Component({
  components: { Poster, Info },
  computed: mapState('Anime', ['anime']),
})
export default class Sidebar extends Vue {
  private Helper = Helper;
  private AnimePosterSize = AnimePosterSize;
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
