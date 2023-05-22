import { atom } from 'recoil';

interface createArticle {
  isModal: boolean;
  spot: number;
  isSelect: boolean;
  isTagged: boolean;
  boardId: number;
  isTagModal: boolean;
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

interface myTree {
  isModal: boolean;
  boardId: number;
}
interface myReward {
  isModal: boolean;
  treeInfo: any;
}
interface storeName {
  name: string;
}
interface myPage {
  isModal: boolean;
  myPageId: number;
}

export const createArticleAtom = atom<createArticle>({
  key: 'createArticle',
  default: {
    isModal: false,
    spot: -1,
    isSelect: false,
    isTagged: false,
    boardId: -1,
    isTagModal: false,
  },
});
// 태그 옮겨심기 로직 + 모달
// export const takeArticleAtom = atom({
//   key: 'takeArticle',
//   default: {
//     isModal: false,
//   },
// });

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
export const openMyPageAtom = atom<myPage>({
  key: 'openMyPage',
  default: {
    isModal: false,
    myPageId: 0,
  },
});

// 친구 검색 모달
export const openSearchAtom = atom<openAlarm>({
  key: 'openSearch',
  default: {
    isModal: false,
  },
});

export const clickedName = atom<storeName>({
  key: 'clickedName',
  default: { name: '' },
});

// 우체통 모달
export const letterBoxAtom = atom<postBox>({
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

// 새 구입 모달
export const newBirdAtom = atom<newBird>({
  key: 'newBird',
  default: {
    isModal: false,
    bird: {},
  },
});

// 광장 세계수 기부 모달
export const donationModalAtom = atom({
  key: 'squareModal',
  default: {
    isModal: false,
  },
});

// 추억 조회 모달
export const myTreeAtom = atom<myTree>({
  key: 'myTree',
  default: {
    isModal: false,
    boardId: 0,
  },
});

// 성장 완료 모달
export const myRewardModal = atom<myReward>({
  key: 'myReward',
  default: {
    isModal: false,
    treeInfo: [{}],
  },
});
//  튜토리얼 모달
export const tutorialAtom = atom({
  key: 'tutorial',
  default: {
    isModal: false,
  },
});
export const gameFinishAtom = atom({
  key: 'game',
  default: {
    isModal: false,
    win: '',
  },
});
