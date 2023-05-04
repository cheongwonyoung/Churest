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
}) => {const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYWthNDkxQG5hdmVyLmNvbSIsImlhdCI6MTY4MzE4MzQ1MiwiZXhwIjoxNjg0OTgzNDUyfQ.ID5PqjeaRjM7EfNZ7ptOnmyHyFqIudPo-xVUa8Kisgk6HeIji9INCNbmvoqbxC_OX4Vhw2FxxqqnPvVM3ajGOw`,
    'X-AUTH-TOKEN': `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrYWthNDkxQG5hdmVyLmNvbSIsImlhdCI6MTY4MzE4MzQ1MiwiZXhwIjoxNjg0OTgzNDUyfQ.ID5PqjeaRjM7EfNZ7ptOnmyHyFqIudPo-xVUa8Kisgk6HeIji9INCNbmvoqbxC_OX4Vhw2FxxqqnPvVM3ajGOw`,
  }
}
  return instance.post(`/guest-book`, writeInfo,config);
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
