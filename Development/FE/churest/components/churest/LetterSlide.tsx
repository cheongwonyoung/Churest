import { deleteLetter } from '@/apis/letterbox';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import { useMutation } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper';
import moment from 'moment';

type Props = {
  letters: any;
};

export default function LetterSlide({ letters }: Props) {
  const memberId: number = useRecoilValue(loginAtom).id;

  // 방명록 삭제
  const deleteArticleItem = useMutation(
    (deleteInfo: { fromMemberId: number; GuestBookId: number }) =>
      deleteLetter(deleteInfo),
    {
      onSuccess: (data) => {
        console.log('성공 in mutation success');
        console.log(data);
        // refetch();
        // navigate("/방명록");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const goDeleteArticle = async (letter: any) => {
    deleteArticleItem.mutate({
      fromMemberId: letter.fromMember.memberId,
      GuestBookId: letter.guestBookId,
    });
  };

  const clickDeleteLetter = (letter: any) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      goDeleteArticle(letter);
      console.log('삭제 완료');
    } else {
      console.log('삭제 취소');
    }
  };

  return (
    <>
      <div>
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
        >
          {letters.map((letter: any, idx: number) => {
            return (
              <SwiperSlide key={idx} style={{ width: '400px' }}>
                <div key={idx} className="letter letter-clay">
                  <div className="input">
                    {letter.content}
                    {/* 작성자와 사용자 확인 여부 */}
                    내가 안썼음
                    {letter.fromMemberId == memberId ? (
                      <div className="letter-buttons">
                        <button onClick={() => clickDeleteLetter(letter)}>
                          삭제
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {moment(letter.createdTime).format('YYYY년 MM월 DD일')} 보냄
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
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
          bottom: 150px;
          left: 135px;
          justify-content: center;
          display: flex;
          gap: 20px;
        }
        button {
          border: none;
          background-color: rgba(0, 0, 0, 0);
          width: 80px;
          height: 30px;
          font-size: 20px;
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
