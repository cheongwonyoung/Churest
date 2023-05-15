import React from 'react';
import { images } from '@/public/assets/images';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import moment from 'moment';
import Image from 'next/image';
import BirdNickname from '../churest/BirdNickname';

SwiperCore.use([EffectCoverflow, Pagination]);

type Props = {
  cardType: string;
  info: any;
  refetch?: any;
};

export default function Carousel({ cardType, info, refetch }: Props) {
  const IMAGE_ROOT = process.env.NEXT_PUBLIC_IMAGE_ROOT;

  // 나무 설명 정보 받아오기
  let treeDesc: any;
  if (info) {
    console.log('트리성장완');
    if (info.treeInfo != null) {
      console.log('정보를줄게');
      const desc = info.treeInfo.replace(/\./g, '<br>');
      console.log(desc);
      treeDesc = (desc: string) => {
        return <>{desc}</>;
      };
    }
  }
  console.log('인포다인마', info);
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
          className="center"
        >
          {info &&
            info.map((item: any, idx: number) => {
              return (
                <SwiperSlide
                  key={idx}
                  className={
                    cardType == 'mypage'
                      ? 'center'
                      : cardType == 'myTagged'
                      ? 'inside-circle'
                      : 'bird-swiper center'
                  }
                  style={{ width: '100px', height: '300px' }}
                >
                  {/* 마이페이지에서 추억 리스트 조회 */}
                  {cardType == 'mypage' ? (
                    <div className="mypage-box flip-card">
                      <div className="card center">
                        <div className="front gray-clay center-clay">
                          {item.score <= 5 ? (
                            <Image
                              src={images.sprout_img}
                              alt=""
                              width={150}
                              height={150}
                            />
                          ) : item.score <= 15 ? (
                            <Image
                              src={images.branch_img}
                              alt=""
                              width={150}
                              height={150}
                            />
                          ) : (
                            <Image
                              src={images['tree_' + item.treeId + '_img']}
                              alt=""
                              width={150}
                              height={150}
                            />
                          )}

                          <div className="text-content">
                            <p className="title">{item.title}</p>
                            <p className="date">
                              {moment(item.createdTime).format(
                                'YYYY년 MM월 DD일'
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="back gray-clay center">
                          {item.treeInfo ? (
                            <div className="tree-info">
                              <div className="tree-title">
                                <Image
                                  src={IMAGE_ROOT + item.treeInfo.file}
                                  width={80}
                                  height={80}
                                  alt=""
                                />

                                <div className="title">
                                  {item.treeInfo.name}
                                </div>
                              </div>

                              <div>{item.treeInfo.description}</div>
                            </div>
                          ) : (
                            <div>나무가 아직 성장 중이에요</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
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
          }
          p {
            font-size: 15px;
            text-align: center;
          }

          .title {
            color: black;
            font-weight: bold;
            font-size: large;
          }
          .date {
            font-size: 13px;
            color: gray;
          }
          .mypage-box {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;
          }
          .text-content {
            margin-top: 25px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .text-content-two {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          button {
            margin: 10px;
            height: 30px;
          }

          .tree-title {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
          }
          .flip-card {
            height: 280px;
            position: relative;
            perspective: 1100px;
          }

          .card {
            margin: 50px;
            width: 100%;
            height: 100%;
            position: relative;
            transition: 0.4s;
            transform-style: preserve-3d;
          }

          .front,
          .back {
            width: 200px;
            height: 250px;
            position: absolute;
            backface-visibility: hidden;
            margin: auto;
          }

          .back {
            transform: rotateY(180deg);
          }

          .flip-card:hover .card {
            transform: rotateY(180deg);
          }
          .tree-info {
            text-align: center;
          }
          .center-clay {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}
