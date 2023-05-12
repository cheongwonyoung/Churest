import { instance } from ".";

// 전체 알림 조회 
export const getAlarm = (memberId: number) => {
  return instance.get(`/notice?memberId=${memberId}`) 
} 

// 알림 읽음 처리 
export const checkedAlarm = (noticeId: number) => {
  return instance.post(`/notice?noticeId=${noticeId}`)
}