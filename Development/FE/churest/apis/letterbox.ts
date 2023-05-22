import { instance } from '.';

// 방명록 조회
export const getLetterList = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  };  
  return instance.get(`/guest-book?memberId=${memberId}`, config); 
};

// 방명록 작성
export const writeLetter = (token: string, writeInfo: {
  content: string;
  fromMemberId: number;
  toMemberId: number;
}) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  };  
  return instance.post(`/guest-book`, writeInfo, config); 
};

// 방명록 삭제 
export const deleteLetter = (token: string, 
  deleteInfo: {
    fromMemberId: number;
    guestBookId: number; 
}) => {
  return instance.delete(`/guest-book`, { data: deleteInfo, headers : {  'Authorization': 'Bearer ' + token } }); 
};
