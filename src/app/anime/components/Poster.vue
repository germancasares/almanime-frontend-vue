<template>
  <figure class="image is-clipped">
    <img :src="cover" />
  </figure>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AnimeCoverSize } from '@/enums';

@Component
export default class Poster extends Vue {
  @Prop() private image!: URL;

  private get cover() {
    return `${this.image}${AnimeCoverSize.Small}.jpg`;
  }
}
</script>

<style lang='scss' scoped>
figure {
  border-radius: 5px;
  width: 200px;
}
</style>
