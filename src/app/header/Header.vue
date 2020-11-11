<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: 'Home' }" class="navbar-item">
          <img
            :src="`https://bulma.io/images/bulma-logo.png`"
            alt="Almanime: subtitles for all"
            width="112"
            height="28"
          >
        </router-link>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link :to="{ name: 'Home' }" class="navbar-item">
            Home
          </router-link>
          <a class="navbar-item">Anime</a>
          <router-link :to="{ name: 'Home' }" class="navbar-item">
            <!-- <router-link :to="{ name: 'fansub-list' }" class="navbar-item"> -->
            Fansub
          </router-link>
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
                <input class="input" type="text" placeholder="Search for...">
              </p>

              <p class="control">
                <a class="button">
                  <span class="icon">
                    <i class="mdi mdi-24px mdi-magnify" />
                  </span>
                </a>
              </p>
            </div>
          </div>

          <div class="navbar-item theme-switch" @click="updateTheme">
            <span class="icon">
              <i :class="`mdi mdi-24px mdi-${isDarkTheme ? 'white-balance-sunny' : 'weather-night'}`" />
            </span>
          </div>

          <div v-if="isAuthenticated" class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
              <div v-if="isAuthenticated" class="avatar">
                <Avatar v-if="hasAvatar" :size="30" :src="`${avatarUrl}`" />
                <Avatar
                  v-else color="black" :size="30"
                  :username="`${username}`"
                />
              </div>
              {{ username }}
            </div>

            <div class="navbar-dropdown is-right">
              <router-link :to="{ name: 'profile' }" class="navbar-item">
                Profile
              </router-link>
              <a class="navbar-item">Favourites</a>
              <a class="navbar-item">Settings</a>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">Logout</a>
            </div>
          </div>

          <div v-else class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <router-link :to="{ name: 'Home' }" class="button">
                  <!-- <router-link :to="{ name: 'register' }" class="button"> -->
                  Register
                </router-link>
              </p>
              <p class="control">
                <router-link :to="{ name: 'Home' }" class="button">
                  <!-- <router-link :to="{ name: 'login' }" class="button"> -->
                  Login
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Avatar from 'vue-avatar';
import { computed } from 'vue';

import { useStore } from '@/store';
import { AppActionType } from '@/app/appStore/actions';

export default {
  components: { Avatar },
  setup() {
    const store = useStore();
    const isDarkTheme = computed(() => store.state.app.isDarkTheme);
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const avatarUrl = computed(() => '');

    const updateTheme = () => {
      store.dispatch(AppActionType.UpdateTheme, !isDarkTheme.value);
    };

    return {
      isDarkTheme,
      updateTheme,
      avatarUrl,
      isAuthenticated,
    };
  },
};
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

  &:focus {
    @include themed() {
      color: findColorInvert(t($background-header));
      background-color: t($background-header);
    }
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
