import { getLetterList } from '@/apis/letterbox';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';
import LetterSlide from './LetterSlide';

export default function LetterBox() {
  const memberId: number = useRecoilValue(loginAtom).id;
  // 나의 우편함 편지 목록
  const [letterList, setLetterList] = useState([{}]);
  useQuery('myLetters', () => getLetterList(Number(memberId)), {
    onSuccess(data) {
      setLetterList([...data.data]);
    },
    onError: (error) => {
      console.log('에러다');
      console.log(error);
    },
    staleTime: 60 * 1000,
  });

  return (
    <>
      <LetterSlide letters={letterList}></LetterSlide>
      <style jsx>{``}</style>
    </>
  );
}
