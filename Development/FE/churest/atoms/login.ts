import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface login {
  // id: null | number;
  id: number;
  accessToken: string;
  nickname: string;
}

export const loginAtom = atom<login>({
  key: 'login',
  default: {
    id: 0,
    accessToken: '',
    nickname: '',
  },
  effects_UNSTABLE: [persistAtom],
});
