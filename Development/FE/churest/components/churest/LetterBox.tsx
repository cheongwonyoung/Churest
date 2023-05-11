import { getLetterList } from '@/apis/letterbox';
import { letterBoxAtom } from '@/atoms/modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { loginAtom } from '@/atoms/login';
import Swal from 'sweetalert2';
import LetterSlide from './LetterSlide';

export default function LetterBox() {
  const memberId: number = useRecoilValue(loginAtom).id;
  // 나의 우편함 편지 목록
  const { data, refetch } = useQuery(
    'myLetters',
    () => getLetterList(Number(memberId)),
    {
      onSuccess(data) {
        console.log('편지목록');
        console.log(...data.data);
        if (data.data.length == 0) {
          showAlert('받은 편지가 아직 없어요');
          closeModal();
        }
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
      staleTime: 60 * 1000,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  const [isLetterOpen, setIsLetterOpen] = useRecoilState(letterBoxAtom);
  const closeModal = () => {
    console.log(isLetterOpen);
    setIsLetterOpen({ isModal: false });
  };

  const showAlert = (text: string) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: text,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      {data?.data ? (
        <LetterSlide letters={data!.data}></LetterSlide>
      ) : (
        <div></div>
      )}
      <style jsx>{``}</style>
    </>
  );
}
