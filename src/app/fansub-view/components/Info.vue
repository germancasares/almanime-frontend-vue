<template>
  <div class="media-summary">
    <h5 class="is-size-5 is-5 has-text-weight-semibold">
      <span>Details:</span>
    </h5>
    <div>
      <ul>
        <li v-if="fansub.acronym">
          <strong class="has-text-primary has-text-weight-bold">Acronym: </strong>
          <span>{{ fansub.acronym }}</span>
        </li>
        <li>
          <strong class="has-text-primary has-text-weight-bold">Main Language: </strong>
          <span>{{ fansub.mainLanguage }}</span>
        </li>
        <li>
          <strong class="has-text-primary has-text-weight-bold">Invitations: </strong>
          <span>{{ fansub.membershipOption }}</span>
        </li>
        <li v-if="fansub.webpage">
          <strong class="has-text-primary has-text-weight-bold">Webpage: </strong>
          <a :href="fansub.webpage" target="_blank">
            {{ fansub.webpage | Domain }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Fansub } from '@/models';
import { DateFull, Domain } from '@/utils/filter';
import { mapState } from 'vuex';

@Component({
  filters: { DateFull, Domain },
  computed: mapState('FansubView', ['fansub']),
})
export default class Info extends Vue {
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