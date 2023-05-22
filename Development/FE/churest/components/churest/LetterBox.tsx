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
  const memberId = useRecoilValue(loginAtom).id;
  // 나의 우편함 편지 목록
  const [showInputModal, setInputModal] = useState(false);
  const { data, refetch } = useQuery(
    'myLetters',
    () => getLetterList(churestId),
    {
      onSuccess(data) {},
      onError: (error) => {},
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  const [isLetterOpen, setIsLetterOpen] = useRecoilState(letterBoxAtom);
  const closeModal = () => {
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
      {data && data?.data.length === 0 && churestId !== memberId && (
        <LetterCreate closeModal={closeModal} refetch={refetch}></LetterCreate>
      )}
      {data && data?.data.length > 0 && (
        <LetterSlide
          letters={data!.data}
          refetch={refetch}
          closeModal={closeModal}
        ></LetterSlide>
      )}
      {data &&
        data?.data.length === 0 &&
        churestId === memberId &&
        (showAlert('편지가 아직 없어요'), closeModal())}
      <style jsx>{``}</style>
    </>
  );
}
