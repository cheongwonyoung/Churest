import { atom } from 'recoil';

interface createArticle {
  isModal: boolean;
  spot: number;
  isSelect: boolean;
}

interface openAlarm {
  isModal: boolean;
}

interface postBox {
  isModal: boolean;
}

interface newBird {
  isModal: boolean;
  bird: any;
}

export const createArticleAtom = atom<createArticle>({
  key: 'createArticle',
  default: {
    isModal: false,
    spot: -1,
    isSelect: false,
  },
});
export const openShopAtom = atom<openAlarm>({
  key: 'openShop',
  default: {
    isModal: false,
  },
});
export const openAlarmAtom = atom<openAlarm>({
  key: 'openAlarm',
  default: {
    isModal: false,
  },
});

// 태그 모아보기 모달
export const openTagAtom = atom<openAlarm>({
  key: 'openTag',
  default: {
    isModal: false,
  },
});

// 마이페이지 모달
export const openMyPageAtom = atom<openAlarm>({
  key: 'openMyPage',
  default: {
    isModal: false,
  },
});

// 친구 검색 모달
export const openSearchAtom = atom<openAlarm>({
  key: 'openSearch',
  default: {
    isModal: false,
  },
});

// 우체통 모달
export const letterBoxAtom = atom<openAlarm>({
  key: 'letterBox',
  default: {
    isModal: false,
  },
});

// 나의 새 모달
export const myBirdAtom = atom<openAlarm>({
  key: 'openMyBird',
  default: {
    isModal: false,
  },
});

// 스페이스 바 모달
export const spaceModalAtom = atom({
  key: 'spaceModal',
  default: '',
});

export const newBirdAtom = atom<newBird>({
  key: 'newBird',
  default: {
    isModal: false,
    bird: {},
  },
});

// 광장 세계수 기부 모달
export const squareModalAtom = atom({
  key: 'squareModal',
  default: {
    isModal: false,
  },
});
