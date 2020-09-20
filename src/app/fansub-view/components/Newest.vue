<template>
  <div class="container">
    <h1 class="title">Last Episodes</h1>
    <hr />
    <div class="tile is-ancestor" v-for="episodesChunk in episodesAsChunks()" :key="episodesChunk.id">
      <div class="tile is-parent has-image is-3" v-for="episode in episodesChunk" :key="episode.number">
        <Tile
          :name="getEpisodeName(episode.animeName, episode.number, episode.name)"
          :image="Helper.ResizeImageOrDefault(episode.animeCoverImage, AnimeCoverSize.Tiny)"
          :route="{ name: 'anime', params: { slug: episode.animeSlug }, query: { fansub: fansub.acronym } }"
        ></Tile>
      </div>
    </div>
    <h1 class="title">Last Completed Animes</h1>
    <hr />
    <div class="tile is-ancestor" v-for="animesChunk in animesAsChunks()" :key="animesChunk.id">
      <div class="tile is-parent has-image is-3" v-for="anime in animesChunk" :key="anime.slug">
        <Tile
          :id="anime.slug"
          :name="anime.name"
          :image="Helper.ResizeImageOrDefault(anime.coverImage, AnimeCoverSize.Tiny)"
          :route="{ name: 'anime', params: { slug: anime.slug }, query: { fansub: fansub.acronym } }"
          :isSelected="isBookmarked(anime.slug)"
          @selected="addBookmark"
          @deselected="unBookmark"
        ></Tile>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import {
  EpisodeWithSubtitle,
  AnimeWithEpisodesAndSubtitle,
  FansubAnime,
  Fansub,
  FansubEpisode,
} from '@/models';
import Helper from '@/utils/helper';
import { Tile } from '@/components';
import UserModule from '@/app/account/store';
import { AnimeCoverSize } from '@/enums';

@Component({
  components: { Tile },
  computed: {
    ...mapState('FansubView', ['fansub', 'animes', 'episodes']),
    ...mapState('User', ['bookmarks']),
  },
})
export default class Newest extends Vue {
  private fansub!: Fansub;
  private animes!: FansubAnime[];
  private episodes!: FansubEpisode[];
  private Helper = Helper;
  private bookmarks!: string[];
  private AnimeCoverSize = AnimeCoverSize;

  private animesAsChunks() {
    return Helper.Chunk(this.animes, 4);
  }

  private getEpisodeName(
    animeName: string,
    episodeNumber: number,
    name: string | null,
  ) {
    return name === null
      ? `${animeName} ~ Episode ${episodeNumber}`
      : `${animeName} ~ ${name}`;
  }

  private episodesAsChunks() {
    return Helper.Chunk(this.episodes, 4);
  }

  private async addBookmark(slug: string) {
    UserModule.AddBookmark(slug);
  }

  private async unBookmark(slug: string) {
    UserModule.RemoveBookmark(slug);
  }

  private isBookmarked(slug: string) {
    return this.bookmarks.includes(slug);
  }
}
</script>

<style lang='scss' scoped>
</style>