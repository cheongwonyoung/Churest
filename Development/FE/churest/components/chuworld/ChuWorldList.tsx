import { getChuworld } from '@/apis/chuworld';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import ChuWorldItem from './ChuWorldItem';
import { useEffect } from 'react';
type MyInfo = {
  memberId: number;
  nickname: string;
  houseId: number;
};
export default function ChuWorldList(props: any) {
  console.log('props', props.props);
  return (
    <>
      {props?.props.map((myInfo: MyInfo) => (
        <div key={myInfo.memberId}>
          <p>{myInfo.memberId}</p>
        </div>
      ))}
    </>
  );
}
