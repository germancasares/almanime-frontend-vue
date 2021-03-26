<template>
  <div class="container fh">
    <section class="section">
      <h1 class="title">Current Season</h1>

      <b-steps
        v-model="activeStep"
        :has-navigation="false"
      >
        <b-step-item step="1" label="Anime" icon="movie-search" :clickable="true">
          <h1 class="title has-text-centered">Anime</h1>
          Lorem ipsum dolor sit amet.
        </b-step-item>

        <b-step-item step="2" label="Episode" icon="bookshelf" :clickable="true">
          <h1 class="title has-text-centered">Episode</h1>
          Lorem ipsum dolor sit amet.
        </b-step-item>

        <b-step-item step="3" label="Subtitle" icon="subtitles-outline" :clickable="true">
          <h1 class="title has-text-centered">Subtitle</h1>
          Lorem ipsum dolor sit amet.
        </b-step-item>
      </b-steps>

    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState('FansubView', ['fansub']),
})
export default class FansubView extends Vue {
  private activeStep = 0;
}
</script>

<style lang='scss' scoped>

.title  {
  @include themed() {
    color: t($title);
  }
}

</style>

<style lang='scss'>

.b-steps .steps .step-items .step-item {

  .step-title {
    @include themed() {
      color: t($title);
    }
  }

  &::before {
    @include themed() {
      background-image: linear-gradient(to left, rgb(219, 219, 219) 50%, t($primary) 50%)
    }
  }

  &.is-active {
    .step-marker {
      @include themed() {
        border-color: t($primary);
        background-color: t($background);
        color: t($primary);
      }
    }
  }

  &.is-previous .step-marker {
    @include themed() {
      background-color: t($primary);
    }
  }

  &:not(.is-active) .step-marker {
    @include themed() {
      color: t($background);
      border-color: t($background);
    }
  }
}

</style>
