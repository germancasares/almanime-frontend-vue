<template>
  <div class="container">sdadsadsadsadsadsadsadsadsadsadsadsa</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { FansubUser } from '../../../models';

@Component({
  computed: mapState('FansubView', ['members']),
})
export default class Members extends Vue {
  private members!: FansubUser[];
}
</script>

<style lang='scss' scoped>
</style>