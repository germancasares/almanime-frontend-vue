<template>
  <aside>
    <Poster/>
    <Info/>
    <div class="new-subtitle is-flex mt-3">
      <router-link :to="{ name: 'subtitle-new', params: { acronym: fansub.acronym } }" class="button is-fullwidth">
        + Subtitle
      </router-link>
    </div>
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
  computed: mapState('FansubView', ['fansub']),
})
export default class Sidebar extends Vue {}
</script>

<style lang='scss' scoped>
aside {
  position: relative;
}

aside > * {
  margin: 0 auto;
}
</style>
