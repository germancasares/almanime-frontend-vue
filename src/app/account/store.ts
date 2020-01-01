import { DateTime } from 'luxon';
import { VuexModule, Module, getModule, Action, Mutation, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import Axios from 'axios';
import { Login, Register } from '@/models/account';
import JwtDecode from 'jwt-decode';
import { remove as removeCookie } from 'es-cookie';

export interface IAccountState {
  username: string;
  token: string;
  expiration: DateTime;
  avatarUrl: URL;
}

interface TokenDto {
  username: string;
  exp: number;
}

@Module({
  name: 'Account',
  store,
  dynamic: true,
  namespaced: true,
})
class AccountModule extends VuexModule implements IAccountState {
  public avatarUrl: URL = new URL(process.env.VUE_APP_EMPTYURL);
  public username: string = '';
  public token: string = '';
  public expiration: DateTime = DateTime.utc();

  @Action({ commit: 'AUTHENTICATE', rawError: true})
  public async Authenticate(login: Login) {
    return (await Axios.post('account/login', login)).data;
  }

  @Action({ commit: 'AUTHENTICATE', rawError: true})
  public async Register(register: Register) {
    return (await Axios.post('account/register', register)).data;
  }

  @Action({ commit: 'UPDATEAVATAR', rawError: true})
  public async UploadAvatar(avatar: File) {
    var data = new FormData();
    data.append('Avatar', avatar);
    Axios.put('/User/self', data);

    return new URL((await Axios.get('User/self')).data.avatarUrl);
  }

  @Mutation
  public UPDATEAVATAR(url: URL) {
    this.avatarUrl = new URL(`${url.href}?${new Date().getTime()}`);
  }

  @Mutation
  public AUTHENTICATE(token: string) {
    AccountModule.setToken(token);
    this.token = token;

    const decodedToken = JwtDecode<TokenDto>(token);
    this.expiration = DateTime.fromSeconds(decodedToken.exp);
    this.username = decodedToken.username;
  }

  @MutationAction({ mutate: ['username', 'token', 'expiration', 'avatarUrl'] })
  public async LoadState(state: IAccountState) {
    AccountModule.setToken(state.token);

    return state;
  }

  @MutationAction({ mutate: ['avatarUrl'] })
  public async LoadAvatar() {
    const user = (await Axios.get('user/self')).data;

    return {
      avatarUrl: user.avatarUrl
    };
  }

  @MutationAction({ mutate: ['username', 'token', 'expiration', 'avatarUrl'] })
  public async Logout() {
    removeCookie('accountState');
    AccountModule.removeToken();

    return {
      username: '',
      token: '',
      expiration: DateTime.utc(),
      avatarUrl: new URL(process.env.VUE_APP_EMPTYURL),
    };
  }

  public static setToken(token: string) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  private static removeToken() {
    Axios.defaults.headers.common['Authorization'] = null;
  }

}

export default getModule(AccountModule);
