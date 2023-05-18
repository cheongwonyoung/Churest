import { deleteLetter } from '@/apis/letterbox';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import { useMutation } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useState } from 'react';
import LetterCreate from './LetterCreate';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

type Props = {
  letters: any;
  refetch: any;
  closeModal: any;
};

export default function LetterSlide({ letters, refetch, closeModal }: Props) {
  const memberId: number = useRecoilValue(loginAtom).id;
  const churestId = useRouter().query.id;

  // 방명록 삭제
  const deleteArticleItem = useMutation(
    (deleteInfo: { fromMemberId: number; guestBookId: number }) =>
      deleteLetter(deleteInfo),
    {
      onSuccess: (data) => {
        // console.log('성공 in mutation success');
        // console.log(data);
        // refetch();
        // navigate("/방명록");
      },
      onError: (error) => {
        // console.log(error);
      },
    }
  );
  const goDeleteArticle = async (letter: any) => {
    deleteArticleItem.mutate({
      fromMemberId: letter.fromMember.memberId,
      guestBookId: letter.guestBookId,
    });
  };

  const clickDeleteLetter = (letter: any) => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#51da93',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        goDeleteArticle(letter);
        refetch();
      } else {
        // console.log('삭제 취소');
      }
    });
  };

  const [viewMode, setViewMode] = useState(true);
  const handleModal = () => {
    // closeModal();
    setViewMode(false);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
        transition={{
          duration: 2,
          type: 'spring',
          stiffness: 260,
          damping: 50,
        }}
      >
        {viewMode ? (
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={true}
            mousewheel={true}
            className="mySwiper"
            style={{ width: '30%' }}
          >
            {letters?.map((letter: any, idx: number) => {
              return (
                <SwiperSlide key={idx} style={{ width: '400px' }}>
                  <div key={idx} className="letter letter-clay">
                    <div className="input">{letter.content}</div>
                    <div>
                      {moment(letter.createdTime).format('YYYY년 MM월 DD일')}{' '}
                      보냄
                    </div>
                    {/* 작성자와 사용자 확인 여부 */}
                    {letter?.fromMember.memberId == memberId ? (
                      <div className="letter-buttons">
                        <button onClick={() => clickDeleteLetter(letter)}>
                          삭제
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <>
            <LetterCreate
              closeModal={closeModal}
              refetch={refetch}
            ></LetterCreate>
          </>
        )}
        {letters?.length != 0 && viewMode && Number(churestId) != memberId && (
          <div className="center">
            <div className="green-btn" style={{ margin: '10px' }}>
              <button onClick={handleModal} style={{ color: 'white' }}>
                작성하기
              </button>
            </div>
          </div>
        )}
      </motion.div>
      <style jsx>{`
        .letter {
          height: 500px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-size: cover;
          background-image: url('https://storage.googleapis.com/churest-bucket/project_image/letter_img.png');
        }
        .input {
          width: 225px;
          height: 350px;
          text-align: center;
          display: flex;
          flex-direction: column;
          font-size: 20px;
          font-weight: bold;
        }
        .letter-buttons {
          position: absolute;
          bottom: 40px;
          gap: 20px;
        }
        button {
          border: none;
          background-color: rgba(0, 0, 0, 0);
          width: 100%;
          height: 30px;
          font-size: 20px;
          text-align: center;
          border-radius: 5px;
          box-shadow: 0px 20px 40px rgba(199, 218, 255, 0.872),
            inset 0px -3px 10px rgba(220, 220, 220, 0.37);
        }
        button:hover {
          cursor: pointer;
          font-weight: bold;
        }
        .swiper-slide {
          width: 20%;
        }
      `}</style>
    </>
  );
}
