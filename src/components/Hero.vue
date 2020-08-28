<template>
  <section>
    <div class="hero is-medium">
      <figure class="image">
        <img id="hero" :src="poster" />
        <div class="overlay">
          <div></div>
        </div>
      </figure>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Season, AnimePosterSize } from '@/enums';

@Component
export default class Hero extends Vue {
  @Prop() private background!: URL | null;
  @Prop() private season!: Season;

  private get poster() {
    if (this.background == null) {
      switch (this.season) {
        case Season.Winter:
          return require('@/assets/seasons/Winter.jpg');
        case Season.Spring:
          return require('@/assets/seasons/Spring.jpg');
        case Season.Summer:
          return require('@/assets/seasons/Summer.jpg');
        case Season.Fall:
          return require('@/assets/seasons/Fall.jpg');
      }
    }

    return `${this.background}${AnimePosterSize.Small}.jpg`;
  }
}
</script>

<style scoped lang='scss'>
#hero {
  object-fit: cover;
  width: 100%;
  height: 400px;
}

.overlay {
  width: 100%;
  position: absolute;
  bottom: 0;
  top: 0;

  div {
    position: relative;
    top: 50%;
    height: 50%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), $background);
  }
}
</style>
