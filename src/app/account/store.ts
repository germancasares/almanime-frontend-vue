import { DateTime } from 'luxon';
import { VuexModule, Module, getModule, Action, Mutation, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import Axios from 'axios';
import { Login, Register } from '@/models/account';
import JwtDecode from 'jwt-decode';
import Helper, { ICookie } from '@/utils/helper';

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
  private static setToken(token: string) {
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  private static removeToken() {
    Axios.defaults.headers.common.Authorization = null;
  }

  public account: IAccountState = {
    username: '',
    token: '',
    expiration: DateTime.utc(),
  };
  public avatarUrl: URL = new URL(process.env.VUE_APP_EMPTYURL);
  public bookmarks: string[] = [];

  // #region User

  @MutationAction({ mutate: ['avatarUrl', 'bookmarks'] })
  public async LoadUser() {
    const user = (await Axios.get('user/self')).data;

    const avatarUrl = user.avatarUrl == null ?
      process.env.VUE_APP_EMPTYURL :
      `${user.avatarUrl}${new Date().getTime()}`;

    return {
      avatarUrl,
      bookmarks: user.bookmarks,
    };
  }

  @MutationAction({ mutate: ['avatarUrl'] })
  public async UpdateAvatar(avatar: File) {
    const data = new FormData();
    data.append('Avatar', avatar);
    await Axios.put('/User/self', data);

    const avatarUrl = (await Axios.get('User/self')).data.avatarUrl;

    return {
      avatarUrl: new URL(`${avatarUrl}?${new Date().getTime()}`),
    };
  }

  @Action({ commit: 'ADDBOOKMARK', rawError: true})
  public async AddBookmark(slug: string) {
    await Axios.post(`anime/slug/${slug}/bookmark`);

    return slug;
  }

  @Action({ commit: 'REMOVEBOOKMARK', rawError: true})
  public async RemoveBookmark(slug: string) {
    await Axios.delete(`anime/slug/${slug}/bookmark`);

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
    UserModule.setToken(state.token);

    return {
      account: state,
    };
  }

  @MutationAction({ mutate: ['account'] })
  public async Logout() {
    Helper.Cookie.Delete(Helper.Cookie.ACCOUNTSTATECOOKIE);
    UserModule.removeToken();

    return {
      account: {
        username: '',
        token: '',
        expiration: DateTime.utc(),
      },
    };
  }

  @Action({ commit: 'AUTHENTICATE', rawError: true})
  public async Authenticate(login: Login) {
    return (await Axios.post('account/login', login)).data;
  }

  @Action({ commit: 'AUTHENTICATE', rawError: true})
  public async Register(register: Register) {
    return (await Axios.post('account/register', register)).data;
  }

  @Mutation
  public AUTHENTICATE(token: string) {
    UserModule.setToken(token);
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
