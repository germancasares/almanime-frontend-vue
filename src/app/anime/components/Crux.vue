<template>
  <div class="crux">
    <section class="title is-size-3 has-text-weight-semibold">{{ anime.name }}</section>
    <section class="synopsis">{{ anime.synopsis }}</section>
    <section class="chapters">
      <b-table :data="episodeList">
        <template slot-scope="props">
          <b-table-column field="number" label="#" meta="Number">
            <template slot="header" slot-scope="{ column }">
              <b-tooltip :label="column.meta" dashed>{{ column.label }}</b-tooltip>
            </template>
            {{ props.row.number }}
          </b-table-column>
          <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
          <b-table-column field="duration" label="Duration" meta="Duration in minutes">
            <template slot="header" slot-scope="{ column }">
              <b-tooltip :label="column.meta" dashed>{{ column.label }}</b-tooltip>
            </template>
            {{ props.row.duration }}
          </b-table-column>
          <b-table-column field="aired" label="Aired">{{ props.row.aired | DateFull }}</b-table-column>
        </template>

        <template slot="footer">
          <th class="is-hidden-mobile">
            <div class="th-wrap">#</div>
          </th>
          <th class="is-hidden-mobile">
            <div class="th-wrap">Name</div>
          </th>
          <th class="is-hidden-mobile">
            <div class="th-wrap">Duration</div>
          </th>
          <th class="is-hidden-mobile">
            <div class="th-wrap">Aired</div>
          </th>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Episode, AnimeWithEpisodes } from '@/models';
import { DateFull } from '@/utils/filter';

@Component({
  filters: { DateFull },
  computed: mapState('Anime', ['anime']),
})
export default class Crux extends Vue {
  private anime!: AnimeWithEpisodes;

  private get episodeList() {
    return this.anime.episodes;
  }
}
</script>

<style lang='scss' scoped>
.crux {
  padding-left: 40px;
  height: 100%;

  .title {
    display: flex;
    align-items: center;
    height: 140px;
    font-family: $font-asap-condensed;

    @include themed() {
      color: findColorInvert(t($background));
    }
  }

  .synopsis {
    padding-top: 20px;

    @include themed() {
      color: findColorInvert(t($background));
    }
  }

  .chapters {
    padding-top: 20px;
  }
}
</style>
