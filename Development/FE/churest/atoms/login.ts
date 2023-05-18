import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface login {
  id: number;
  accessToken: string;
  refreshToken: string;
  avatarId: number;
  nickname: string;
  fcmToken: string;
}

export const loginAtom = atom<login>({
  key: 'login',
  default: {
    id: 0,
    accessToken: '',
    refreshToken: '',
    avatarId: 0,
    nickname: '',
    fcmToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});
