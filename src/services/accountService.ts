import { Register, Login } from '@/models';
import Axios from 'axios';

export class AccountService {
  public static SetToken(token: string) {
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  public static RemoveToken() {
    Axios.defaults.headers.common.Authorization = null;
  }

  public static async IsEmailAvailable(email: string): Promise<boolean> {
    return await Axios.head(`account/email/${email}`).then(
      () => {
        return false;
      },
      () => {
        return true;
      },
    );
  }

  public static async IsUsernameAvailable(username: string): Promise<boolean> {
    return await Axios.head(`account/username/${username}`).then(
      () => {
        return false;
      },
      () => {
        return true;
      },
    );
  }

  public static async Register(register: Register): Promise<string> {
    return (await Axios.post('account/register', register)).data;
  }

  public static async Login(login: Login): Promise<string> {
    return (await Axios.post('account/login', login)).data;
  }
}