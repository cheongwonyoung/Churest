import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userToken = atom({
  key: 'userToken',
  default: {
    access_token: '',
    refresh_token: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const userStatus = atom({
  key: 'userStatus',
  default: {
    id: null,
    nickname: '',
    birdname: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const kakaoToken = atom({
  key: 'kakaoToken',
  default: {
    access_token: '',
  },
  effects_UNSTABLE: [persistAtom],
});
