import { atom } from 'recoil';

interface createArticle {
  isModal: boolean;
  spot: number;
}

export const createArticleAtom = atom<createArticle>({
  key: 'createArticle',
  default: {
    isModal: false,
    spot: -1,
  },
});
