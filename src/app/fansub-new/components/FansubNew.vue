<template>
  <section class="hero is-fullheight is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-6 is-offset-3">
            <h1 class="title">Create a fansub</h1>
            <form class="box" @submit.prevent="create">
              <label class="label">Name</label>
              <p class="control">
                <input v-model="fansub.fullName" @keyup="checkFullName" class="input" type="text" placeholder="Sugoi Hikikomori no Fansub" />
              </p>
              <p v-show="isFullNameVisible && isFullNameAvailable" class="help is-success">This name is available</p>
              <p v-show="isFullNameVisible && !isFullNameAvailable" class="help is-danger">This name is not available</p>
              <label class="label">Acronym</label>
              <p class="control">
                <input v-model="fansub.acronym" @keyup="checkAcronym" class="input" type="text" placeholder="SHknF" />
              </p>
              <p v-show="isAcronymVisible && isAcronymAvailable" class="help is-success">This acronym is available</p>
              <p v-show="isAcronymVisible && !isAcronymAvailable" class="help is-danger">This acronym is not available</p>
              <hr />
              <div class="columns">
                <div class="column is-half">
                  <label class="label">Main language of subtitles</label>
                  <b-field>
                    <b-select v-model="fansub.mainLanguage" placeholder="Language" icon="translate">
                      <option v-for="language in languages" :key="language" :value="language">{{ language }}</option>
                    </b-select>
                  </b-field>
                </div>
                <div class="column is-half">
                  <label class="label">New members accepted by</label>
                  <b-field>
                    <b-select v-model="fansub.membershipOption" placeholder="Join" icon="account-multiple-plus">
                      <option v-for="option in membershipOptions" :key="option" :value="option">{{ option }}</option>
                    </b-select>
                  </b-field>
                </div>
              </div>
              <label class="label">Webpage</label>
              <p class="control">
                <input v-model="fansub.webpage" class="input" type="text" placeholder="www.shknf.com" />
              </p>
              <hr />
              <p class="control">
                <button class="button is-default">Cancel</button>
                <button class="button is-primary is-pulled-right">Create</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';
import { NewFansub } from '@/models';
import { FansubService } from '@/services'
import { FansubMainLanguage, FansubMembershipOption } from '@/enums';
import Axios from 'axios';

@Component({
  computed: {
    ...mapState('FansubNew', ['']),
    ...mapGetters('User', ['isAuthenticated']),
  }
})
export default class FansubNew extends Vue {
  private fansub = {
    fullName: '',
    acronym: '',
    mainLanguage: FansubMainLanguage.English,
    membershipOption: FansubMembershipOption.Private,
    webpage: '',
  } as NewFansub;

  private isAuthenticated!: boolean;
  private languages = FansubMainLanguage;
  private membershipOptions = FansubMembershipOption;

  private isFullNameVisible = false;
  private isFullNameAvailable = false;

  private isAcronymVisible = false;
  private isAcronymAvailable = false;

  private async create() {
    await FansubService.Create(this.fansub)
    .then(() => {
      this.$router.push({ name: 'fansub-view', params: { acronym: this.fansub.acronym } });
    });
  }

  private async checkFullName() {
    const fullName = this.fansub.fullName.trim();

    if (fullName === '') {
      //TODO: Update error message with value cannot be empty string
      this.isFullNameAvailable = false;
      this.isFullNameVisible = true;
      return;
    }

    this.isFullNameAvailable = await FansubService.IsFullNameAvailable(fullName);
    this.isFullNameVisible = true;
  }

  private async checkAcronym() {
    const acronym = this.fansub.acronym.trim();

    if (acronym === '') {
      //TODO: Update error message with value cannot be empty string
      this.isAcronymAvailable = false;
      this.isAcronymVisible = true;
      return;
    }

    this.isAcronymAvailable = await FansubService.IsAcronymAvailable(acronym)
    this.isAcronymVisible = true;
  }

}
</script>

<style lang='scss' scoped>
.control {
  margin-bottom: 0.5em;
}
</style>