import { atom } from 'recoil';

interface createArticle {
  isModal: boolean;
  spot: number;
}

interface openAlarm {
  isModal: boolean;
}

interface postBox {
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
  },
});

export const openTagAtom = atom<openAlarm>({
  key: 'openTag',
  default: {
    isModal: false,
  },
});

export const openMyPageAtom = atom<openAlarm>({
  key: 'openMyPage',
  default: {
    isModal: false,
  },
});

export const openSearchAtom = atom<openAlarm>({
  key: 'openSearch',
  default: {
    isModal: false,
  },
});

export const letterBoxAtom = atom<postBox>({
  key: 'letterBox',
  default: {
    isModal: false,
  },
});
