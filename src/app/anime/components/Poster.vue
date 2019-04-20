<template>
  <figure class="image is-clipped">
    <img :src="image">
  </figure>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Poster extends Vue {
  @Prop() private image!: URL;
}
</script>

<style lang='scss' scoped>
figure {
  border-radius: 5px;
  width: 200px;
}
</style>
