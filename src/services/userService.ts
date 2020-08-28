import { User } from '@/models';
import Axios from 'axios';

export class UserService {
    public static async Get(): Promise<User> {
        return (await Axios.get('user/self')).data;
    }

    // TODO: Update method to accept UserDTO
    public static async Update(avatar: File): Promise<User> {
        const data = new FormData();
        data.append('Avatar', avatar);
        await Axios.put('/User/self', data);

        return (await Axios.get('User/self')).data;
    }
}
