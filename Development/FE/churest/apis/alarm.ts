import { instance } from ".";

// 전체 알림 조회 
export const getAlarm = (token: string, memberId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  }; 
  return instance.get(`/notice?memberId=${memberId}`, config)  
} 

// 알림 읽음 처리 
export const checkedAlarm = (token: string, noticeId: number) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token, 
    }, 
  };  
  return instance.post(`/notice?noticeId=${noticeId}`, [], config) 
}