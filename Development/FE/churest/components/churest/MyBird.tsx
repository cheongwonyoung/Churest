import Carousel from '../common/Carousel';
import Image from 'next/image';
import { images } from '@/public/assets/images';
import { getMyBirdsList } from '@/apis/mypage';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { loginAtom } from '@/atoms/login';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import BirdNickname from '../churest/BirdNickname';

export default function MyBird() {
  const cardType = 'mybird';
  const router = useRouter();
  const memberId: number = Number(router.query.id);

  // 나의 새 목록
  // const [birdList, setMyBirds] = useState([{}]);
  const { data, isLoading, isError, refetch } = useQuery(
    'mybirds',
    () => getMyBirdsList(Number(memberId)),
    {
      onSuccess() {
        // setMyBirds([...data.data]);
        // console.log(data.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="blue-clay container center">
        <div>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
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
            style={{ width: '600px', height: '400px' }}
          >
            {data?.data &&
              data?.data.map((item: any, idx: number) => {
                return (
                  <SwiperSlide
                    key={idx}
                    className="bird-swiper center"
                    style={{ width: '200px' }}
                  >
                    <div className="flip-card">
                      <div className="card center">
                        <div className="front">
                          <div className="gray-clay center-clay">
                            <Image
                              src={images['bird_' + item.bird.birdId + '_img']}
                              alt=""
                              width={200}
                              height={230}
                            />
                          </div>
                        </div>
                        <div className="back">
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
            width: 600px;
            height: 450px;
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
        `}
      </style>
    </>
  );
}
