import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface login {
  id: null | number;
  accessToken: null | string;
}

export const loginAtom = atom<login>({
  key: 'login',
  default: {
    id: null,
    accessToken: null,
  },
  effects_UNSTABLE: [persistAtom],
});
