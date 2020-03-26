import { DateTime } from 'luxon';
import { VuexModule, Module, getModule, Action, Mutation, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import JwtDecode from 'jwt-decode';
import Helper, { ICookie } from '@/utils/helper';
import { Login, Register } from '@/models';
import { AccountService, AnimeService, UserService } from '@/services';

// TODO: Change string[] to Set<string> once Vue gets to v3
// https://github.com/vuejs/vue/issues/2410#issuecomment-434990853
export interface IUserState {
  account: IAccountState;
  avatarUrl: URL;
  bookmarks: string[];
}

export interface IAccountState extends ICookie {
  username: string;
  token: string;
  expiration: DateTime;
}

@Module({
  name: 'User',
  store,
  dynamic: true,
  namespaced: true,
})
class UserModule extends VuexModule implements IUserState {
  public account: IAccountState = {
    username: '',
    token: '',
    expiration: DateTime.utc(),
  };
  public avatarUrl: URL = new URL(process.env.VUE_APP_EMPTYURL);
  public bookmarks: string[] = [];

  // #region Getters

  get hasAvatar() {
    return this.avatarUrl.href !== undefined && this.avatarUrl.href !== process.env.VUE_APP_EMPTYURL;
  }

  get username() {
    return this.account.username;
  }

  get isAuthenticated() {
    return !!this.account.token;
  }

  // #endregion

  // #region User

  @MutationAction({ mutate: ['avatarUrl', 'bookmarks'] })
  public async LoadUser() {
    const user = await UserService.Get();

    const avatarUrl = user.avatarUrl == null ?
      process.env.VUE_APP_EMPTYURL :
      `${user.avatarUrl}?${new Date().getTime()}`;

    return {
      avatarUrl: new URL(avatarUrl),
      bookmarks: user.bookmarks,
    };
  }

  @MutationAction({ mutate: ['avatarUrl'] })
  public async UpdateAvatar(avatar: File) {
    const avatarUrl = (await UserService.Update(avatar)).avatarUrl;

    return {
      avatarUrl: new URL(`${avatarUrl}?${new Date().getTime()}`),
    };
  }

  @Action({ commit: 'ADDBOOKMARK', rawError: true })
  public async AddBookmark(slug: string) {
    await AnimeService.CreateBoookmark(slug);

    return slug;
  }

  @Action({ commit: 'REMOVEBOOKMARK', rawError: true })
  public async RemoveBookmark(slug: string) {
    await AnimeService.DeleteBoookmark(slug);

    return slug;
  }

  @Mutation
  public ADDBOOKMARK(slug: string) {
    this.bookmarks.push(slug);
  }

  @Mutation
  public REMOVEBOOKMARK(slug: string) {
    this.bookmarks = this.bookmarks.filter((b) => b !== slug);
  }

  // #endregion

  // #region Account

  @MutationAction({ mutate: ['account'] })
  public async LoadState(state: IAccountState) {
    AccountService.SetToken(state.token);

    return {
      account: state,
    };
  }

  @MutationAction({ mutate: ['account'] })
  public async Logout() {
    Helper.Cookie.Delete(Helper.Cookie.ACCOUNTSTATECOOKIE);
    AccountService.RemoveToken();

    return {
      account: {
        username: '',
        token: '',
        expiration: DateTime.utc(),
      },
    };
  }

  @Action({ commit: 'AUTHENTICATE', rawError: true })
  public async Authenticate(login: Login) {
    return await AccountService.Login(login);
  }

  @Action({ commit: 'AUTHENTICATE', rawError: true })
  public async Register(register: Register) {
    return await AccountService.Register(register);
  }

  @Mutation
  public AUTHENTICATE(token: string) {
    AccountService.SetToken(token);
    this.account.token = token;

    const decodedToken = JwtDecode<TokenDto>(token);
    this.account.expiration = DateTime.fromSeconds(decodedToken.exp);
    this.account.username = decodedToken.username;
  }

  // #endregion
}

export default getModule(UserModule);

interface TokenDto {
  username: string;
  exp: number;
}
