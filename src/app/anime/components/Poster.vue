<template>
  <figure class="image is-clipped">
    <img :src="cover">
  </figure>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ImageCoverSize } from '@/enums';

@Component
export default class Poster extends Vue {
  @Prop() private image!: URL;

  get cover() {
    return `${this.image}${ImageCoverSize.Small}`;
  }
}
</script>

<style lang='scss' scoped>
figure {
  border-radius: 5px;
  width: 200px;
}
</style>
