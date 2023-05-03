import { instance } from '.';

// 나의 방명록 목록
export const getLetterList = (memberId: number) => {
  return instance.get(`/guest-book?memberId=${memberId}`);
};

// 편지 작성하기
export const writeLetter = (writeInfo: {
  content: string;
  fromMemberId: number;
  toMemberId: number;
}) => {
  return instance.post(`/guest-book`, writeInfo);
};

// 편지 수정하기
export const modifyLetter = (modifyInfo: {
  content: string;
  fromMemberId: number;
  toMemberId: number;
}) => {
  return instance.put(`/guest-book`, modifyInfo);
};

// 편지 삭제하기
// export const deleteLetter = (deleteInfo: {
//   fromMemberId: number;
//   toMemberId: number;
// }) => {
//   return instance.delete(`/guest-book`, deleteInfo);
// };
