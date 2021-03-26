<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-6 is-offset-3">
            <h1 class="title">Create a fansub</h1>
            <form class="box" @submit.prevent="create">
              <label class="label">Name</label>
              <p class="control">
                <input v-model="fansub.fullName" @keyup="checkFullNameDebounced" class="input" type="text" placeholder="Sugoi Hikikomori no Fansub" />
              </p>
              <p v-show="isFullNameVisible && isFullNameAvailable" class="help is-success">This name is available</p>
              <p v-show="isFullNameVisible && !isFullNameAvailable" class="help is-danger">This name is not available</p>
              <label class="label">Acronym</label>
              <p class="control">
                <input v-model="fansub.acronym" @keyup="checkAcronymDebounced" class="input" type="text" placeholder="SHknF" />
              </p>
              <p v-show="isAcronymVisible && isAcronymAvailable" class="help is-success">This acronym is available</p>
              <p v-show="isAcronymVisible && !isAcronymAvailable" class="help is-danger">This acronym is not available</p>
              <hr />
              <div class="columns">
                <div class="column is-half">
                  <label class="label">Main language of subtitles</label>
                  <div class="control has-icons-left">
                    <span class="select">
                      <select v-model="fansub.mainLanguage">
                        <option v-for="language in languages" :key="language" :value="language">{{ language }}</option>
                      </select>
                    </span>
                    <b-icon class="is-left" icon="translate"></b-icon>
                  </div>
                </div>
                <div class="column is-half">
                  <label class="label">New members accepted by</label>
                  <div class="control has-icons-left">
                    <span class="select">
                      <select v-model="fansub.membershipOption">
                        <option v-for="option in membershipOptions" :key="option" :value="option">{{ option }}</option>
                      </select>
                    </span>
                    <b-icon class="is-left" icon="account-multiple-plus"></b-icon>
                  </div>
                </div>
              </div>
              <label class="label">Webpage</label>
              <p class="control">
                <input v-model="fansub.webpage" class="input" type="text" placeholder="www.shknf.com" />
              </p>
              <hr />
              <p class="control">
                <button class="button is-default">Cancel</button>
                <button class="button is-pulled-right">Create</button>
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
import { FansubNew as Form } from '@/models';
import { FansubService } from '@/services';
import { FansubMainLanguage, FansubMembershipOption } from '@/enums';
import Axios from 'axios';
import { debounce } from 'debounce';

@Component({
  computed: {
    ...mapState('FansubNew', ['']),
    ...mapGetters('User', ['isAuthenticated']),
  },
})
export default class FansubNew extends Vue {
  private fansub = {
    fullName: '',
    acronym: '',
    mainLanguage: FansubMainLanguage.English,
    membershipOption: FansubMembershipOption.Private,
    webpage: '',
  } as Form;

  private isAuthenticated!: boolean;
  private languages = FansubMainLanguage;
  private membershipOptions = FansubMembershipOption;

  private isFullNameVisible = false;
  private isFullNameAvailable = false;

  private checkFullNameDebounced = debounce(this.checkFullName, 500);
  private isAcronymVisible = false;
  private isAcronymAvailable = false;

  private checkAcronymDebounced = debounce(this.checkAcronym, 500);
  private async create() {
    await FansubService.Create(this.fansub).then(() => {
      this.$router.push({
        name: 'fansub-view',
        params: { acronym: this.fansub.acronym },
      });
    });
  }

  private async checkFullName() {
    const fullName = this.fansub.fullName.trim();

    if (fullName === '') {
      // TODO: Update error message with value cannot be empty string
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
      // TODO: Update error message with value cannot be empty string
      this.isAcronymAvailable = false;
      this.isAcronymVisible = true;
      return;
    }

    this.isAcronymAvailable = await FansubService.IsAcronymAvailable(acronym);
    this.isAcronymVisible = true;
  }
}
</script>

<style lang='scss' scoped>
.hero {
  @include themed() {
    background-image: t($background-gradient);
  }
}

.control {
  margin-bottom: 0.5em;
}

.title {
  @include themed() {
    color: findColorInvert(t($background));
  }
}

.box {
  @include themed() {
    background-color: t($background);
  }

  .label {
    @include themed() {
      color: findColorInvert(t($background));
    }
  }
}

.input {
  @include themed() {
    background-color: t($background-header-bis);
    color: findColorInvert(t($background-header-bis));
  }

  &::placeholder {
    @include themed() {
      color: findColorInvert(t($background-header-bis));
    }
  }
}
</style>