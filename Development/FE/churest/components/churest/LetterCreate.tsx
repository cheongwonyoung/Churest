import { writeLetter } from '@/apis/letterbox';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { loginAtom } from '@/atoms/login';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { movingAtom } from '@/atoms/inp';

type Props = { refetch: any; closeModal: any };

export default function Letter({ refetch, closeModal }: Props) {
  const fromMemberId = useRecoilValue(loginAtom).id;
  const router = useRouter();
  const toMemberId = Number(router.query.id);
  const [content, setContent] = useState('');
  const handleLetter = (e: any) => {
    setContent(e.target.value);
  };

  const clickCreateLetter = () => {
    createLetter.mutate({
      content: content,
      fromMemberId: fromMemberId,
      toMemberId: toMemberId,
    });
  };

  const createLetter = useMutation(
    (writeInfo: {
      content: string;
      fromMemberId: number;
      toMemberId: number;
    }) => writeLetter(writeInfo),
    {
      onSuccess: (data) => {
        // console.log('방명록 작성 성공');
        refetch();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '전송 완료',
          showConfirmButton: false,
          timer: 1000,
        });
        closeModal();
        // console.log(data.data);
        // navigate
      },
      onError: (error) => {
        // console.log('방명록 에러다');
        // console.log(error);
      },
    }
  );

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
        transition={{
          duration: 1,
          type: 'spring',
          stiffness: 200,
          damping: 50,
        }}
      >
        <div className="letter-clay letter">
          <div className="input">
            <textarea
              className="letter-box"
              placeholder="방명록을 남겨주세요!"
              maxLength={140}
              onChange={(e) => handleLetter(e)}
              style={{ resize: 'none' }}
            />
          </div>
        </div>
        <div className="center">
          <button className="green-btn" onClick={clickCreateLetter}>
            전송
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .letter {
          width: 400px;
          height: 500px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('https://storage.googleapis.com/churest-bucket/project_image/letter_img.png');
          background-size: cover;
        }
        .green-btn {
          cursor: pointer;
          color: white;
          width: 180px;
          height: 40px;
          border: none;
          background: linear-gradient(315deg, #f0ff94 0%, #1eb0e9 100%);
          border-radius: 12px;
          font-size: 20px;
          margin: 10px;
        }
        .green-btn:hover {
          color: black;
          font-weight: bold;
        }
        .input {
          width: 225px;
          height: 380px;
          margin-top: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          font-size: 20px;
          font-weight: bold;
          justify-content: space-between;
          align-items: center;
        }
        .letter-box {
          height: 300px;
          border: none;
          background-color: transparent;
          text-align: center;
          font-size: 20px;
          outline-color: none;
        }
        .letter-box:focus {
          outline: none;
        }
      `}</style>
    </>
  );
}
