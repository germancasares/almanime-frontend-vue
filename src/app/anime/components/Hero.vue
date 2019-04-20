<template>
  <section>
    <div class="hero is-medium">
      <figure class="image">
        <img id="hero" :src="image">
        <div class="overlay">
          <div></div>
        </div>
      </figure>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Season } from '@/enums';

@Component({
  filters: {
    checkDefault(realImage: URL, season: Season) {
      return realImage || require(`@/assets/seasons/${season}.jpg`);
    },
  },
})
export default class Hero extends Vue {
  @Prop() private image!: URL;
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
