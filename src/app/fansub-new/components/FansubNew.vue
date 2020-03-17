<template>
  <main class="container">

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState('FansubNew', ['']),
})
export default class FansubNew extends Vue {
  
}
</script>

<style lang='scss' scoped>

</style>