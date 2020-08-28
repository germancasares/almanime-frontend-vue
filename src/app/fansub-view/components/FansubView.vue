<template>
  <main>
    <Hero :season="season"></Hero>
    <section class="container">
      <div class="columns">
        <div class="column is-narrow is-paddingless">
          <Sidebar></Sidebar>
        </div>
        <div class="column is-paddingless">
          <Crux></Crux>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { DateTime } from 'luxon';
import Helper from '@/utils/helper';
import { AnimeWithEpisodesAndSubtitle } from '@/models';
import { SubtitleStatus, Season } from '@/enums';
import { FinishedRecount, DateTimeFull } from '@/utils/filter';
import { Hero } from '@/components';
import Sidebar from './Sidebar.vue';
import Crux from './Crux.vue';
import FansubViewModule from '@/app/fansub-view/store';

@Component({
  components: {
    Hero,
    Sidebar,
    Crux,
  },
  filters: { FinishedRecount, DateTimeFull },
  beforeRouteLeave: (to, from, next) => {
    FansubViewModule.CleanFansub();
    next();
  },
})
export default class FansubView extends Vue {
  public season: Season = Season.Winter;

  private async created() {
    this.season = Helper.GetSeason(DateTime.local());

    if (this.$route.params.acronym !== null) {
      const loadFansub = FansubViewModule.LoadFansub(this.$route.params.acronym);
      const loadCompletedAnimes = FansubViewModule.LoadCompletedAnimes(this.$route.params.acronym);
      const loadCompletedEpisodes = FansubViewModule.LoadCompletedEpisodes(this.$route.params.acronym);
      const loadMembers = FansubViewModule.LoadMembers(this.$route.params.acronym);

      await Promise.all([loadFansub, loadCompletedAnimes, loadCompletedEpisodes, loadMembers]);
    }
  }
}
</script>

<style lang='scss' scoped>
.columns {
  margin-top: 0;
}

.column {
  position: relative;
  top: -140px;
}
</style>
