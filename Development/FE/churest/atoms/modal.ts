import { atom } from 'recoil';

interface createArticle {
  isModal: boolean;
  spot: number;
}

interface openAlarm {
  isModal: boolean; 
}
export const createArticleAtom = atom<createArticle>({
  key: 'createArticle',
  default: {
    isModal: false,
    spot: -1,
  },
});

export const openAlarmAtom = atom<openAlarm>({
  key: 'openAlarm',
  default: {
    isModal: false,
  }
})

export const openTagAtom = atom<openAlarm>({
  key: 'openTag', 
  default: {
    isModal: false, 
  }
})