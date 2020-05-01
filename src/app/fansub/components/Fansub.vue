<template>
  <main class="container">
    <section class="name is-size-1">{{ fansub.acronym }}</section>

    <section class="animes">
      <b-table :data="animes" detailed hoverable>
        <template slot-scope="props">
          <b-table-column field="name" label="Anime" searchable>{{ props.row.name }}</b-table-column>
          <b-table-column field="finished" label="Finished">{{ props.row.episodes | FinishedRecount }}</b-table-column>
          <b-table-column field="episodesCount" label="Total">{{ props.row.episodesCount }}</b-table-column>
        </template>

        <template slot="detail" slot-scope="props">
          <tr class="episodes" v-for="episode in props.row.episodes" :key="episode.number">
            <td></td>
            <td>{{ episode.number }}</td>
            <td>{{ episode.name }}</td>
            <td>{{ episode.subtitle.modificationDate | DateTimeFull }}</td>
            <td>
              <a class="button" :href="episode.subtitle.url" target="_blank">
                <b-icon icon="download"></b-icon>
              </a>
            </td>
          </tr>
        </template>
      </b-table>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FansubModule from '@/app/fansub/store';
import { mapState } from 'vuex';
import { AnimeWithEpisodesAndSubtitle } from '@/models';
import { SubtitleStatus } from '@/enums';
import { FinishedRecount, DateTimeFull } from '@/utils/filter';

@Component({
  filters: { FinishedRecount, DateTimeFull },
  computed: mapState('Fansub', ['fansub', 'animes']),
  beforeRouteLeave: (to, from, next) => {
    FansubModule.CleanFansub();
    next();
  },
})
export default class Fansub extends Vue {
  private async created() {
    if (this.$route.params.acronym !== null) {
      await FansubModule.LoadFansub(this.$route.params.acronym);
      await FansubModule.LoadAnimes(this.$route.params.acronym);
    }
  }
}
</script>

<style lang='scss' scoped>
.name {
  text-transform: capitalize;
}

.episodes {
  td {
    vertical-align: middle;
  }
}
</style>
