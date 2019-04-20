<template>
  <div>
    <section id="title" class="is-size-3 has-text-weight-semibold has-text-grey-dark font-asap-consended">
      {{ title }}
    </section>
    <section class="synopsis">
      {{ synopsis }}
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Crux extends Vue {
  @Prop() private title!: string;
  @Prop() private synopsis!: string;
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
}
</style>
