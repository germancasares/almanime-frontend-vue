import { FansubRole } from '@/enums';

export interface FansubUser {
    name: string;
    avatarUrl: URL | null;
    role: FansubRole;
}
