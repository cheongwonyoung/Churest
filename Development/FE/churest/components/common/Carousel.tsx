import React from 'react';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import moment from 'moment';
import Image from 'next/image';

SwiperCore.use([EffectCoverflow, Pagination]);

type Props = {
  cardType: string;
  info: any;
};

const Carousel = ({ cardType, info }: Props) => {
  let data = [...info];

  return (
    <>
      <div>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
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
          className="mySwiper"
        >
          {data.map((item: any, i: number) => {
            return (
              <SwiperSlide
                key={i}
                className={
                  cardType == 'mypage'
                    ? 'gray-clay center'
                    : 'inside-circle center'
                }
              >
                {cardType == 'mypage' ? (
                  <div className="">
                    <Image
                      src={
                        'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbird_1_img.2c4c4639.png&w=256&q=75'
                      }
                      width="100"
                      height="100"
                      alt=""
                    />
                    <p>{item.title}</p>
                    <p className="date center">
                      {moment(item.createdTime).format('YYYY년 MM월 DD일')}
                    </p>
                  </div>
                ) : (
                  <div style={{ margin: '0 auto' }}>
                    <Image
                      src={
                        'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbird_1_img.2c4c4639.png&w=256&q=75'
                      }
                      width="100"
                      height="100"
                      alt=""
                    />
                    <p>{item.nickname}</p>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <style jsx>
        {`
          img {
            display: block;
            margin: 0 auto;
            width: 60%;
          }
          p {
            text-align: center;
            line-height: 50px;
          }
          .date {
            margin-bottom: 50px;
          }
          .hide {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default Carousel;
