<template>
  <div class="tile-content">
    <router-link :to="{ name: 'anime', params: { slug: slug } }">
      <div class="overlay"></div>
      <figure class="image is-16by9">
        <img :src="cover" />
      </figure>
      <div class="name">
        <h3>{{ name }}</h3>
      </div>
      <div class="bookmark" v-if="isAuthenticated">
        <div v-if="isBookmarked" @click.prevent="unBookmark">
          <b-icon icon="star"></b-icon>
        </div>
        <div v-else @click.prevent="addBookmark">
          <b-icon icon="star-outline"></b-icon>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import UserModule, { IUserState } from '@/app/account/store';
import { AnimeCoverSize } from '@/enums';

@Component({
  computed: {
    ...mapState<IUserState, any>('User', {
      isAuthenticated: (state: IUserState) => !!state.account.token,
      bookmarks: 'bookmarks',
    }),
    isBookmarked(this: Tile) {
      return this.bookmarks.includes(this.slug);
    },
  },
})
export default class Tile extends Vue {
  @Prop() private name!: string;
  @Prop() private slug!: string;
  @Prop() private image!: URL;
  private bookmarks!: string[];

  private defaultCover() {
    return require('@/assets/default-cover.jpg');
  }

  get cover() {
    if (this.image == null) {
      return this.defaultCover();
    }

    return `${this.image.toString()}${AnimeCoverSize.Tiny}.jpg`;
  }

  private async addBookmark() {
    UserModule.AddBookmark(this.slug);
  }

  private async unBookmark() {
    UserModule.RemoveBookmark(this.slug);
  }
}
</script>

<style lang="scss" scoped>
.tile-content {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: auto;
  overflow: hidden;

  .overlay {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    z-index: 1;
    transition: all 0.4s ease-in-out 0s;
  }

  figure {
    border-radius: 5px;
    overflow: hidden;

    img {
      object-fit: cover;
    }
  }

  .name {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 80%;
    left: 50%;
    opacity: 0;
    z-index: 2;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out 0s;

    h3 {
      color: #fff;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
  }

  .bookmark {
    position: absolute;
    bottom: -10px;
    right: 5px;
    opacity: 0;
    z-index: 3;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out 0s;
    color: orange;
  }

  :hover .overlay {
    opacity: 1;
  }

  :hover .name {
    top: 50%;
    left: 50%;
    opacity: 1;
  }

  :hover .bookmark {
    bottom: -5px;
    right: 5px;
    opacity: 1;
  }
}
</style>
