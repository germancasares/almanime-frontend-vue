import { DateTime } from 'luxon';
import { VuexModule, Module, getModule, Action, Mutation, MutationAction } from 'vuex-module-decorators';
import store from '@/store';
import Axios from 'axios';
import { Login, Register } from '@/models/account';
import JwtDecode from 'jwt-decode';
import { remove as removeCookie } from "es-cookie";

export interface IAccountState {
  username: string;
  token: string;
  expiration: DateTime;
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
  username: string = '';
  token: string = '';
  expiration: DateTime = DateTime.utc();

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
    this.token = token;

    let decodedToken = JwtDecode<TokenDto>(token);
    this.expiration = DateTime.fromSeconds(decodedToken.exp);
    this.username = decodedToken.username;
  }

  @MutationAction({ mutate: ['username', 'token', 'expiration'] })
  public async LoadState(state: IAccountState) {
    return state;
  }

  @MutationAction({ mutate: ['username', 'token', 'expiration'] })
  public async Logout() {
    removeCookie('accountState');

    return {
      username: '',
      token: '',
      expiration: DateTime.utc()
    }
  }

}

export default getModule(AccountModule);