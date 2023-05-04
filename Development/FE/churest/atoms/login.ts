import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface login {
  // id: null | number;
  id: number;
  accessToken: string;
}

export const loginAtom = atom<login>({
  key: 'login',
  default: {
    id: 0,
    accessToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});
