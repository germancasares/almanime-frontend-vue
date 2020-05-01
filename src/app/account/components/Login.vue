<template>
  <section class="hero is-primary is-bold is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <h3 class="title">Login</h3>
          <p class="subtitle">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://i.imgur.com/jitaYgk.png" />
            </figure>
            <form @submit.prevent="login">
              <p class="help is-danger" v-bind:class="{ 'is-invisible': !isUnauthorized }">This credentials provided are incorrect</p>

              <div class="field">
                <div class="control">
                  <input class="input is-large" v-bind:class="{ 'is-danger': isUnauthorized }" v-model="loginForm.identifier" placeholder="Username or Email" autofocus required />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" v-bind:class="{ 'is-danger': isUnauthorized }" type="password" v-model="loginForm.password" placeholder="Your Password" required />
                </div>
              </div>

              <div class="field">
                <label class="checkbox">
                  <input type="checkbox" v-model="beRemembered" />Remember me
                </label>
              </div>

              <button class="button is-block is-info is-large is-fullwidth">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{ name: 'register' }">Register</router-link>&nbsp;·&nbsp;
            <a href="../">Forgot Password</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import UserModule, { IUserState, IAccountState } from '@/app/account/store';
import { Login as LoginForm } from '@/models/account';
import Helper from '@/utils/helper';

@Component({
  computed: mapState<IUserState, any>('User', {
    account: 'account',
  }),
})
export default class Login extends Vue {
  private loginForm = {
    identifier: '',
    password: '',
  } as LoginForm;

  private beRemembered = false;
  private isUnauthorized = false;

  private account!: IAccountState;

  private async login() {
    this.isUnauthorized = false;

    await UserModule.Authenticate(this.loginForm)
      .then(async (value) => {
        await UserModule.LoadUser();

        if (this.beRemembered) {
          Helper.Cookie.Create(Helper.Cookie.ACCOUNTSTATECOOKIE, this.account);
        }

        this.$router.push({ name: 'home' });
      })
      .catch((reason) => {
        this.isUnauthorized = true;
      });
  }
}
</script>

<style lang='scss' scoped>
.avatar {
  margin-top: -90px;
  height: 128px;

  img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 3px $grey-light, 0 0 0 1px $grey-light;
  }
}

.box {
  margin-top: 5rem;

  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.checkbox {
  input {
    margin-right: 0.5rem;
  }
}
</style>
