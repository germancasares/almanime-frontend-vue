<template>
  <div class="container">
    <section class="section">
      <div>
        <h1 class="title">Current Season</h1>
        <hr>
        <div class="tile is-ancestor" v-for="animesChunk in currentSeasonAsChunks" :key="animesChunk.id">
          <div class="tile is-parent has-image is-3" v-for="anime in animesChunk" :key="anime.id">
            <tile :slug="anime.slug" :name="anime.name" :cover="anime.coverImage"></tile>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import tile from './Tile.vue';
import HomeModule, { IHomeState } from '@/app/home/store';
import Helper from '@/utils/helper';
import { mapState } from 'vuex';
import { Anime } from '@/models';

@Component({
  components: { tile },
  computed: mapState('Home', {
    currentSeason: (state: IHomeState) => state.currentSeason,
  }),
})
export default class Home extends Vue {
  private currentSeason!: Anime[];

  public async created() {
    await HomeModule.GetCurrentSeason().catch(alert);
  }

  get currentSeasonAsChunks() {
    return Helper.Chunk(this.currentSeason, 4);
  }
}
</script>
