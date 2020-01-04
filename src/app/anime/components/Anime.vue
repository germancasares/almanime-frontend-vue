<template>
  <main>
    <Hero :image="anime.coverImage" :season="anime.season"></Hero>
    <section class="container">
      <div class="columns">
        <div class="column is-narrow is-paddingless">
          <Sidebar :anime="anime"></Sidebar>
        </div>
        <div class="column is-paddingless">
          <Crux :title="anime.name" :synopsis="anime.synopsis" :episodes="anime.episodes"></Crux>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Hero from './Hero.vue';
import Sidebar from './Sidebar.vue';
import Crux from './Crux.vue';
import { mapState } from 'vuex';
import AnimeModule, { IAnimeState } from '@/app/anime/store';

@Component({
  components: {
    Hero,
    Sidebar,
    Crux,
  },
  computed: mapState('Anime', ['anime']),
})
export default class Anime extends Vue {
  public async created() {
    if (this.$route.params.slug !== null) {
      await AnimeModule.GetAnimeBySlug(this.$route.params.slug).catch(alert);
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
