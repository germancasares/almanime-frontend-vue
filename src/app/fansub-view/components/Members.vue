<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-parent has-image is-2 image is-square" v-for="member in members" :key="member.name">
        <Tile 
          :name="member.name"
          :image="member.avatarUrl"
          :route="{ name: 'user', params: { name: member.name } }"
          imageRes="is-square"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { FansubUser } from '../../../models';
import { Tile } from '@/components';

@Component({
  components: { Tile },
  computed: mapState('FansubView', ['members']),
})
export default class Members extends Vue {
  private members!: FansubUser[];
}
</script>

<style lang='scss' scoped>
.container {
  @include themed() {
    color: findColorInvert(t($background));
  }
}
</style>