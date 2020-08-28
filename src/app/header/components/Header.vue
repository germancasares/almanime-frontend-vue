<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Almanime: subtitles for all" width="112" height="28" />
        </router-link>

        <div class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link :to="{ name: 'home' }" class="navbar-item">Home</router-link>
          <a class="navbar-item">Anime</a>
          <router-link :to="{ name: 'fansub-list' }" class="navbar-item">Fansub</router-link>
          <a class="navbar-item">Users</a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field has-addons">
              <p class="control">
                <span class="select">
                  <select>
                    <option>Anime</option>
                    <option>Fansub</option>
                    <option>User</option>
                  </select>
                </span>
              </p>
              <p class="control">
                <input class="input" type="text" placeholder="Search for..." />
              </p>

              <p class="control">
                <a class="button">
                  <b-icon icon="magnify"></b-icon>
                </a>
              </p>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
            <div class="navbar-link">
              <div v-if="isAuthenticated" class="avatar">
                <Avatar v-if="hasAvatar" :size="30" :src="`${avatarUrl}`"></Avatar>
                <Avatar v-else color="black" :size="30" :username="`${username}`"></Avatar>
              </div>
              {{ username }}
            </div>

            <div class="navbar-dropdown is-right">
              <router-link :to="{ name: 'profile' }" class="navbar-item">Profile</router-link>
              <a class="navbar-item">Favourites</a>
              <a class="navbar-item">Settings</a>
              <hr class="navbar-divider" />
              <a class="navbar-item" v-on:click="logout">Logout</a>
            </div>
          </div>

          <div class="navbar-item" v-else>
            <div class="field is-grouped">
              <p class="control">
                <router-link :to="{ name: 'register' }" class="button is-primary">Register</router-link>
              </p>
              <p class="control">
                <router-link :to="{ name: 'login' }" class="button is-light">Login</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';
import UserModule, { IUserState } from '@/app/account/store';

import Avatar from 'vue-avatar';

@Component({
  components: { Avatar },
  computed: {
    ...mapState('User', ['avatarUrl']),
    ...mapGetters('User', ['username', 'isAuthenticated', 'hasAvatar']),
  },
})
export default class Header extends Vue {
  private logout() {
    UserModule.Logout();

    if (this.$router.currentRoute.name !== 'home') {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style lang='scss' scoped>
.navbar-item {
  padding: 0.5rem 1rem;
}

.navbar-link {
  min-width: 131px;
  text-transform: capitalize;
}

.avatar {
  padding-right: 0.5rem;
  padding-left: 0;
}
</style>
