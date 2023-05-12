import { instance } from '.';

// 방명록 조회
export const getLetterList = (memberId: number) => {
  return instance.get(`/guest-book?memberId=${memberId}`);
};

// 방명록 작성
export const writeLetter = (writeInfo: {
  content: string;
  fromMemberId: number;
  toMemberId: number;
}) => {
  return instance.post(`/guest-book`, writeInfo);
};

// 방명록 삭제 
export const deleteLetter = (
  deleteInfo: {
    fromMemberId: number;
    guestBookId: number;
}) => {
  return instance.delete(`/guest-book`, { data: deleteInfo });
};
