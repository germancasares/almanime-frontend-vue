<template>
  <div>
    <section id="title" class="is-size-3 has-text-weight-semibold has-text-grey-dark font-asap-consended">
      {{ title }}
    </section>
    <section class="synopsis">
      {{ synopsis }}
    </section>
    <section class="chapters">
      <b-table :data="episodeList">
        <template slot-scope="props" slot="header">
          <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
            {{ props.column.label }}
          </b-tooltip>
        </template>

        <template slot-scope="props">
          <b-table-column field="number" label="#" meta="Number">
            {{ props.row.number }}
          </b-table-column>

          <b-table-column field="name" label="Name">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="duration" label="Duration" meta="Duration in minutes">
            {{ props.row.duration }}
          </b-table-column>

          <b-table-column field="aired" label="Aired">
            {{ props.row.aired | DateFull }}
          </b-table-column>
        </template>

        <!-- <template slot-scope="props" slot="footer">
          <b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>
            {{ props.column.label }}
          </b-tooltip>
        </template> -->

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



      <!-- <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th><abbr title="Number">#</abbr></th>
            <th>Name</th>
            <th>Duration</th>
            <th>Aired</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><abbr title="Number">#</abbr></th>
            <th>Name</th>
            <th>Duration</th>
            <th>Aired</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="episode in episodeList" :key="episode.id">
            <th>{{ episode.number }}</th>
            <td>{{ episode.name }}</td>
            <td>{{ episode.duration }}</td>
            <td>{{ episode.aired | DateFull }}</td>
          </tr>
        </tbody>
      </table> -->
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Episode } from '@/models';
import { DateFull } from '@/utils/filter';

@Component({
  filters: { DateFull },
})
export default class Crux extends Vue {
  @Prop() private title!: string;
  @Prop() private synopsis!: string;
  @Prop() private episodes!: Episode[];

  private get episodeList() {
    return this.episodes;
  }
}
</script>

<style lang='scss' scoped>
div {
  padding-left: 40px;
  height: 100%;

  #title {
    display: flex;
    align-items: center;
    height: 140px;
    font-family: $font-asap-condensed;
  }

  .synopsis {
    padding-top: 20px;
  }

  .chapters {
    padding-top: 20px;
    .b-table {
      padding-left: 0;
      .th-wrap {
        padding-left: 0;
      }
    }
  }
}
</style>
