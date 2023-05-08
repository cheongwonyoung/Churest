import { getChuworld } from '@/apis/chuworld';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import ChuWorldItem from './ChuWorldItem';
import { useEffect } from 'react';
export default function ChuWorldList() {
  const memberId = useRecoilValue(loginAtom).id;
  const { data, isLoading, isError, error } = useQuery('chuworld', () =>
    getChuworld(memberId)
  );
  console.log(data);
  useEffect(() => {}, []);
  return <>{/* <ChuWorldItem props={data!.data} /> */}</>;
}
