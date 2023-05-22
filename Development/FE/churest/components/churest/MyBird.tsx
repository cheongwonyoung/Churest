import Image from 'next/image';
import { images } from '@/public/assets/images';
import { getMyBirdsList } from '@/apis/mypage';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import BirdNickname from '../churest/BirdNickname';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';

export default function MyBird() {
  const cardType = 'mybird';
  const router = useRouter();
  const memberId: number = Number(router.query.id);
  const token = useRecoilValue(loginAtom).accessToken;

  // 나의 새 목록
  // const [birdList, setMyBirds] = useState([{}]);
  const [len, setLength] = useState(1);
  const { data, isLoading, isError, refetch } = useQuery(
    'mybirds',
    () => getMyBirdsList(token, Number(memberId)),
    {
      onSuccess() {
        let num = data?.data.length;
        setLength(num / 2);
      },
      onError: (error) => {},
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="blue-clay container">
        <div className="modal-title">My Bird</div>
        <div>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            initialSlide={len}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={true}
            style={{ width: '600px' }}
          >
            {data &&
              data?.data.map((item: any, idx: number) => {
                return (
                  <SwiperSlide
                    key={idx}
                    className="bird-swiper center"
                    style={{ width: '200px', height: '380px' }}
                  >
                    <div className="bird-flip-card">
                      <div className="bird-card  center">
                        <div className="bird-front ">
                          <div className="gray-clay center">
                            <Image
                              src={images['bird_' + item.bird.birdId + '_img']}
                              alt=""
                              width={200}
                              height={230}
                            />
                          </div>
                        </div>
                        <div className="bird-back gray-clay content">
                          <p className="bird-title ">{item.bird.name}</p>
                          <p className="bird-description">
                            {item.bird.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        <BirdNickname
                          nickname={item.nickname}
                          memberBirdId={item.memberBirdId}
                          refetch={refetch}
                        ></BirdNickname>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            width: 660px;
            height: 470px;
          }
          .bird-title {
            font-weight: bold;
            font-size: 25px;
            text-align: center;
            margin-bottom: 20px;
          }
          .bird-description {
            font-size: 17px;
          }
          .content {
            padding: 20px;
          }

          /* 카드 뒤집기 효과 */
          .bird-flip-card {
            /* width: 200px; */
            height: 280px;
            position: relative;
            perspective: 1100px;
          }

          .bird-card {
            width: 100%;
            height: 100%;
            position: relative;
            transition: 0.4s;
            transform-style: preserve-3d;
          }

          .bird-front,
          .bird-back {
            width: 200px;
            height: 220px;
            position: absolute;
            backface-visibility: hidden;
            margin: auto;
          }

          .bird-back {
            transform: rotateY(180deg);
          }

          .bird-flip-card:hover .bird-card {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </>
  );
}
