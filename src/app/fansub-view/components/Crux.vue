<template>
    <div class="crux">
        <section id="title" class="is-size-3 has-text-weight-semibold has-text-grey-dark">{{ fansub.fullName }}</section>
        <section>
          <b-tabs v-model="activeTab" position="is-centered" class="block" >
            <b-tab-item label="Newest" icon="decagram">
                <Newest></Newest>
            </b-tab-item>

            <b-tab-item label="All animes" icon="library-shelves">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </b-tab-item>

            <b-tab-item label="Members" icon="account-group">
              <Members></Members>
            </b-tab-item>

            <b-tab-item label="About" icon="information-variant">
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
          </b-tabs>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Newest from './Newest.vue'
import Members from './Members.vue';

@Component({
  components: { Newest, Members },
  computed: mapState('FansubView', ['fansub']),
})
export default class Crux extends Vue {
  private activeTab = 0;
}
</script>

<style lang='scss' scoped>
.crux {
  padding-left: 40px;
  height: 100%;

  #title {
    display: flex;
    align-items: center;
    height: 140px;
    font-family: $font-asap-condensed;
  }
}
</style>