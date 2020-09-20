<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          <img
            :src="`https://bulma.io/images/bulma-logo${isDarkTheme ? '-light' : ''}.png`"
            alt="Almanime: subtitles for all"
            width="112"
            height="28"
          />
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

          <div class="navbar-item theme-switch" v-on:click="updateTheme">
            <b-icon :icon="isDarkTheme ? 'white-balance-sunny' : 'weather-night'"></b-icon>
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
                <router-link :to="{ name: 'register' }" class="button">Register</router-link>
              </p>
              <p class="control">
                <router-link :to="{ name: 'login' }" class="button">Login</router-link>
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
import { app as AppModule } from '@/app/store';

import Avatar from 'vue-avatar';

@Component({
  components: { Avatar },
  computed: {
    ...mapState('User', ['avatarUrl']),
    ...mapState('App', ['isDarkTheme']),
    ...mapGetters('User', ['username', 'isAuthenticated', 'hasAvatar']),
  },
})
export default class Header extends Vue {
  private isDarkTheme!: boolean;

  private logout() {
    UserModule.Logout();

    if (this.$router.currentRoute.name !== 'home') {
      this.$router.push({ name: 'home' });
    }
  }

  private updateTheme() {
    AppModule.UpdateTheme(!this.isDarkTheme);
  }
}
</script>

<style lang='scss' scoped>
.navbar {
  @include themed() {
    background-color: t($background-header);
  }
}

.navbar-item {
  padding: 0.5rem 1rem;
  @include themed() {
    color: findColorInvert(t($background-header));
  }
}

.navbar-start :hover {
  @include themed() {
    background-color: t($background-header);
    color: t($primary);
  }
}

.navbar-item.has-dropdown.is-active {
  @include themed() {
    background-color: t($background-header);
  }
}

.navbar-link {
  min-width: 131px;
  text-transform: capitalize;

  @include themed() {
    color: findColorInvert(t($background-header));
  }
}

.navbar-item.has-dropdown:hover .navbar-link {
  @include themed() {
    background-color: t($background-header);
  }
}

.navbar-dropdown {
  @include themed() {
    background-color: t($background-header);
    border-top-color: t($title);
  }

  .navbar-divider {
    @include themed() {
      background-color: t($title);
    }
  }
}

.theme-switch {
  padding: 0;
  padding-right: 0.25rem;
}

.avatar {
  padding-right: 0.5rem;
  padding-left: 0;
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
