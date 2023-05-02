import React from 'react';
import Image from 'next/image';
import birdImg from '@/public/assets/bird_1_img.png';
import treeImg from '@/public/assets/my_tree_img.png';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import moment from 'moment';

SwiperCore.use([EffectCoverflow, Pagination]);

type Props = {
  cardType: string;
  info: any;
};

const Carousel = ({ cardType, info }: Props) => {
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
          {info.map((item: any, idx: number) => {
            return (
              <SwiperSlide
                key={idx}
                className={
                  cardType == 'mypage'
                    ? 'gray-clay center my-tree'
                    : 'inside-circle center'
                }
              >
                {cardType == 'mypage' ? (
                  <div className="">
                    <Image src={treeImg} alt="" width={150} height={150} />
                    <p>{item.title}</p>
                    <p className="date center">
                      {moment(item.createdTime).format('YYYY년 MM월 DD일')}
                    </p>
                  </div>
                ) : (
                  <div style={{ margin: '0 auto' }}>
                    <Image src={birdImg} alt="" width={100} height={100} />
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
          .my-tree {
            width: 400px;
            height: 400px;
          }
        `}
      </style>
    </>
  );
};

export default Carousel;
