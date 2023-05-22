import { atom } from 'recoil';

export const movingAtom = atom({
  key: 'moving',
  default: false,
});

export const forestAtom = atom({
  key: 'forest',
  default: false,
});
