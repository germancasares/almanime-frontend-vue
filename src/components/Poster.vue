<template>
  <figure class="image is-clipped">
    <img :src="poster" />
  </figure>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AnimeCoverSize } from '@/enums';

@Component
export default class Poster extends Vue {
  @Prop() private image!: URL | undefined;

  private defaultPoster() {
    return require('@/assets/default-poster.jpg');
  }

  get poster() {
    return this.image === undefined ? this.defaultPoster() : this.image
  }
}
</script>

<style lang='scss' scoped>
figure {
  border-radius: 5px;
  width: 200px;
}
</style>
