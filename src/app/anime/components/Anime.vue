<template>
  <main>
    <hero :image="anime.coverImage"></hero>
    <section class="container">
      <div class="columns">
        <div class="column is-narrow is-paddingless">
          <sidebar :anime="anime"></sidebar>
        </div>
        <div class="column is-paddingless">
          <crux :title="anime.name" :synopsis="anime.synopsis"></crux>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import hero from "./Hero.vue";
import sidebar from "./Sidebar.vue";
import crux from "./Crux.vue";
import { mapState } from 'vuex';
import AnimeModule, { IAnimeState } from '@/app/anime/store';

@Component({
  components: { hero, sidebar, crux },
  computed: mapState('Anime', {
    anime: (state: IAnimeState) => state.anime
  })
})
export default class Anime extends Vue {
  async mounted() {
    if(this.$route.params['slug'] !== null) {
      await AnimeModule.GetAnimeBySlug(this.$route.params['slug']).catch(alert);
    }
  }
}
</script>

<style lang='scss' scoped>
.columns {
  margin-top: 0;
}

.column {
  position: relative;
  top: -140px;
}
</style>
