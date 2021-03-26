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

              <b-dropdown aria-role="list" ref="search" :triggers="[]">
                <template #trigger>
                  <p class="control search">
                    <input class="input" type="text" placeholder="Search for..." v-model="searchQuery" v-on:input="search"/>
                  </p>
                </template>
                
                <b-dropdown-item
                  v-for="result in searchResults"
                  :key="result.slug"
                  :value="result.slug" aria-role="listitem">
                  <router-link :to="{ name: 'anime', params: { slug: result.slug } }">
                    {{ result.name }}
                  </router-link>
                </b-dropdown-item>
              </b-dropdown>
        
              <p class="control">
                <a class="button" v-on:click="search">
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
import { ElasticService } from '@/services';
import { debounce } from 'debounce';

import Avatar from 'vue-avatar';
import { AnimeIndex } from '@/models';

@Component({
  components: { Avatar },
  computed: {
    ...mapState('User', ['avatarUrl']),
    ...mapState('App', ['isDarkTheme']),
    ...mapGetters('User', ['username', 'isAuthenticated', 'hasAvatar']),
  },
})
export default class Header extends Vue {
  public readonly $refs!: Vue['$refs'] & {
    search: {
      toggle: () => void,
      isActive: boolean,
    },
  };

  private isDarkTheme!: boolean;
  private searchQuery = '';
  private searchResults: AnimeIndex[] = [];
  private searchDebounced = debounce(this.search, 200);

  private logout() {
    UserModule.Logout();

    if (this.$router.currentRoute.name !== 'home') {
      this.$router.push({ name: 'home' });
    }
  }

  private updateTheme() {
    AppModule.UpdateTheme(!this.isDarkTheme);
  }

  private async search() {
    if (this.searchQuery.trim() === '') {
      this.$refs.search.isActive = false;
      return;
    }

    this.searchResults = await ElasticService.Anime(this.searchQuery);

    if (this.$route.name === 'anime') {
      const currentSlug = this.$route.params.slug;
      this.searchResults = this.searchResults.filter((result) => result.slug !== currentSlug);
    }

    if (this.searchResults.length === 0) {
      this.$refs.search.isActive = false;
      return;
    }

    this.$refs.search.isActive = true;
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

.search {
  margin-right: -1px;

  .input {
    @include themed() {
      background-color: t($background-header-bis);
      color: findColorInvert(t($background-header-bis));
    }
    border-radius: 0px;

    &::placeholder {
      @include themed() {
        color: findColorInvert(t($background-header-bis));
      }
    }
  }
}

</style>
