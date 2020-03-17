<template>
  <main class="container">

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState('FansubList', ['']),
})
export default class FansubList extends Vue {
  
}
</script>

<style lang='scss' scoped>

</style>