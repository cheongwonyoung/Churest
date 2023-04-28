import React from 'react';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([EffectCoverflow, Pagination]);
// if you want to use array
const slide_img = [
  'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbird_1_img.2c4c4639.png&w=256&q=75',
  'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbird_1_img.2c4c4639.png&w=256&q=75',
  'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbird_1_img.2c4c4639.png&w=256&q=75',
  'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbird_1_img.2c4c4639.png&w=256&q=75',
];

const Carousel = () => {
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
          {slide_img.map((img, i) => {
            return (
              <SwiperSlide key={i} className="gray-clay">
                <img src={img} alt="" />
                <p>행복했던 엠지들</p>
                <div className="date center">2023.02.21</div>
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
        `}
      </style>
    </>
  );
};

export default Carousel;
