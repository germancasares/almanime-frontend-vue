<template>
  <div class="media-summary">
    <h5 class="is-size-5 is-5 has-text-weight-semibold">
      <span>Details:</span>
    </h5>
    <div>
      <ul>
        <li v-if="anime.episodes">
          <strong class="has-text-primary has-text-weight-bold">Episodes: </strong>
          <span>{{ anime.episodes }}</span>
        </li>
        <li>
          <strong class="has-text-primary has-text-weight-bold">Status: </strong>
          <span>{{ anime.status }}</span>
        </li>
        <li>
          <strong class="has-text-primary has-text-weight-bold">Aired: </strong>
          <span>{{ anime.startDate | DateFull }}</span>
        </li>
        <li>
          <strong class="has-text-primary has-text-weight-bold">Season: </strong>
          <span>{{ anime.season }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Anime } from '@/models';
import { DateFull } from '@/utils/filter';

@Component({
  filters: { DateFull },
})
export default class Info extends Vue {
  @Prop() private anime!: Anime;
}
</script>

<style lang='scss' scoped>
.media-summary {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid $primary;
  border-radius: 3px;

  h5 {
    display: flex;
    justify-content: center;
    position: relative;
    top: -37px;

    span {
      background-color: $background;
      padding: 0 10px;
      font-family: $font-asap-condensed;
    }
  }

  div {
    position: relative;
    margin-top: -35px;
  }
}
</style>
