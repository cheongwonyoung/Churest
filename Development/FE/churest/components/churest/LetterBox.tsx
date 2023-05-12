import { getLetterList } from '@/apis/letterbox';
import { letterBoxAtom } from '@/atoms/modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { loginAtom } from '@/atoms/login';
import Swal from 'sweetalert2';
import LetterSlide from './LetterSlide';
import LetterCreate from './LetterCreate';

export default function LetterBox() {
  const router = useRouter();
  const churestId = Number(router.query.id);
  const memberId: number = useRecoilValue(loginAtom).id;

  // 나의 우편함 편지 목록
  const [showInputModal, setInputModal] = useState(false);
  const { data, refetch } = useQuery(
    'myLetters',
    () => getLetterList(Number(churestId)),
    {
      onSuccess(data) {
        console.log('편지목록');
        console.log(...data.data);
        console.log('편지갯수는');
        console.log(data.data.length);
        if (data.data.length == 0) {
          showAlert('편지가 아직 없어요');
          if (memberId == churestId) {
            closeModal();
          } else {
            setInputModal(true);
          }
        }
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
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
      {data?.data && data?.data.length == 0 ? (
        <LetterCreate closeModal={closeModal} refetch={refetch}></LetterCreate>
      ) : (
        <LetterSlide
          letters={data.data}
          refetch={refetch}
          closeModal={closeModal}
        ></LetterSlide>
      )}
      <style jsx>{``}</style>
    </>
  );
}
