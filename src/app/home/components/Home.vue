<template>
  <div class="container">
    <section class="section">
      <div>
        <h1 class="title">Current Season</h1>
        <hr />
        <div class="page">
          <div class="tile is-ancestor" v-for="animesChunk in currentSeasonAsChunks(animes)" :key="animesChunk.id">
            <div class="tile is-parent has-image is-3" v-for="anime in animesChunk" :key="anime.id">
              <Tile
                :id="anime.slug"
                :name="anime.name"
                :image="Helper.ResizeImageOrDefault(anime.coverImage, AnimeCoverSize.Tiny)"
                :route="{ name: 'anime', params: { slug: anime.slug } }"
                :isSelected="isBookmarked(anime.slug)"
                @selected="addBookmark"
                @deselected="unBookmark"
              >
              </Tile>
            </div>
          </div>
        </div>
        <div class="pages">
          <b-pagination
            :total="paginationMeta.count"
            :current="pagination.current"
            range-before="1"
            range-after="1"
            @change="newPage"
            order="is-right"
            :per-page="pagination.pageSize"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
            <template slot="previous">
              <span></span>
            </template>

            <template slot="next">
              <span></span>
            </template>
          </b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeModule, { IHomeState } from '@/app/home/store';
import Helper from '@/utils/helper';
import { mapState } from 'vuex';
import { Anime, PaginationMeta, Pagination } from '@/models';
import { Tile } from '@/components';
import { AnimeCoverSize } from '@/enums';
import UserModule from '@/app/account/store';

@Component({
  components: { Tile },
  computed: {
    ...mapState('Home', ['animes', 'paginationMeta', 'pagination']),
    ...mapState('User', ['bookmarks']),
  },
})
export default class Home extends Vue {
  private animes!: Anime[];
  private paginationMeta!: PaginationMeta;
  private pagination!: Pagination;
  private bookmarks!: string[];
  private Helper = Helper;
  private AnimeCoverSize = AnimeCoverSize;

  private async created() {
    if (Helper.IsObjectEmpty(this.pagination)) {
      await HomeModule.UpdatePagination({
        current: 1,
        pageSize: 8,
        isLoading: false,
      });
    }

    if (this.animes.length === 0) {
      await HomeModule.GetAnimeSeasonPage({
        page: this.pagination.current,
        includeMeta: true,
      });
    }
  }

  private async newPage(page: number) {
    await HomeModule.UpdatePagination({
      current: page,
      pageSize: 8,
      isLoading: true,
    });

    await HomeModule.GetAnimeSeasonPage({ page }).then(async () => {
      return await HomeModule.UpdatePagination({
        current: this.pagination.current,
        pageSize: this.pagination.pageSize,
        isLoading: false,
      });
    });
  }

  private currentSeasonAsChunks(animes: Anime[]) {
    return Helper.Chunk(animes, 4);
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
<style lang="scss" scoped>
.container {
  position: relative;
}

.title {
  @include themed() {
    color: t($title);
  }
}

hr {
  @include themed() {
    background-color: t($title);
  }
}

.page {
  margin-bottom: 1rem;
}

.pages ::v-deep .pagination-link {
  @include themed() {
    color: t($primary);
  }

  &.is-current {
    color: white;
  }
}
</style>