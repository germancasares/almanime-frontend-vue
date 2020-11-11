<template>
  <div class="container fh">
    <section class="section">
      <div>
        <h1 class="title">
          Current Season
        </h1>
        <hr>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Helper from '@/utils/helper';
import { computed } from 'vue';
import { useStore } from '@/store';
import { HomeActionType } from './store/actions';

export default {
  components: {},
  async setup() {
    const store = useStore();
    const pagination = computed(() => store.state.home.pagination);
    const animes = computed(() => store.state.home.animes);

    if (Helper.IsObjectEmpty(pagination.value)) {
      store.dispatch(HomeActionType.UpdatePagination, {
        current: 1,
        pageSize: 8,
        isLoading: false,
      });
    }

    if (animes.value.length === 0) {
      store.dispatch(HomeActionType.GetAnimeSeasonPage, {
        page: pagination.value.current,
        includeMeta: true,
      });
    }

    return {};
  },
};
</script>

<style lang='scss' scoped>
.container {
  position: relative;

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
}
</style>
