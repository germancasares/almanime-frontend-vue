<template>
  <section>
    <div class="container">
      <div class="column is-narrow">
        <h3 class="title">Profile</h3>
      </div>
      <form @submit.prevent="save">
        <div class="avatar is-flex">
          <Avatar v-if="this.isAvatarEmpty" color="black" :size="200" :username="`${this.username}`"></Avatar>
          <Avatar v-else :size="200" :src="`${this.avatarImage}`"></Avatar>
        </div>
        <div class="file-upload is-flex">
          <b-field class="file">
            <b-upload v-model="avatar">
              <a class="button is-info">
                <Upload title="Upload" />
                <span>Click to upload</span>
              </a>
            </b-upload>
            <span class="file-name" v-if="avatar.size > 0">{{ avatar.name }}</span>
          </b-field>
        </div>
        <div class="save is-flex">
          <button class="button is-primary is-medium">Save</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Upload from "icons/Upload.vue";
import AccountModule, { IAccountState } from '@/app/account/store';
import { mapState } from "vuex";
import Helper from '@/utils/helper';

var Avatar = require("vue-avatar").Avatar;

@Component({
  components: { Avatar, Upload },
  computed: mapState("Account", {
    avatarUrl: (state: IAccountState) => state.avatarUrl,
    username: (state: IAccountState) => state.username,
    hasAvatar: (state: IAccountState) => state.avatarUrl.href !== process.env.VUE_APP_EMPTYURL,
  })
})
export default class Profile extends Vue {
  private avatar: File = new File([""], "");
  private avatarUrl!: URL;
  private username!: string;
  private hasAvatar!: boolean;
  private avatarPreview = "";

  @Watch("avatar")
  onAvatarChanged(file: File) {
    var reader = new FileReader();
    reader.onload = e => {
      this.avatarPreview = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  private async save() {
    await AccountModule.UploadAvatar(this.avatar);
  }

  get isAvatarEmpty() {
   return !this.hasAvatar && this.avatarPreview === "";
  }

  get avatarImage() {
    if (this.avatarPreview !== "") {
      return this.avatarPreview;
    }

    return this.avatarUrl;
  }
}
</script>

<style lang='scss' scoped>

.avatar  {
  justify-content: center
}

.file-upload {
  padding-top: 10px;
  justify-content: center;
}

.save {
  padding-top: 50px;
  padding-bottom: 100px;
  justify-content: flex-end;
}
</style>