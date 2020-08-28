<template>
  <aside>
    <Poster></Poster>
    <Info></Info>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Anime, Fansub } from '@/models';

import { Poster } from '@/components';
import Info from './Info.vue';
import { mapState } from 'vuex';

@Component({
  components: { Poster, Info },
})
export default class Sidebar extends Vue {

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
