import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface login {
  id: number;
  accessToken: string;
  refreshToken: string;
  avatarId: number;
  nickname: string;
}

export const loginAtom = atom<login>({
  key: 'login',
  default: {
    id: 0,
    accessToken: '',
    refreshToken: '',
    avatarId: 0,
    nickname: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const gardenAtom = atom<{ gogo(): void }>({
  key: 'aaaa',
  default: {
    gogo: () => {
      return;
    },
  },
});
