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
  // 태그된 추억 퍼가기
  const clickTakeTree = (boardId: number) => {
    console.log(
      '퍼가기 버튼 누름, boardId 같이 넘겨서 본인 숲으로 가야함' + boardId
    );
    // redirect ?
  };
  console.log('ㅅㅂ', info);
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
                      : ''
                  }
                >
                  {/* 마이페이지에서 추억 리스트 조회 */}
                  {cardType == 'mypage' ? (
                    <div className="mypage-box flip-card">
                      <div className="card center">
                        <div className="front gray-clay center-clay">
                          <Image
                            src={images.my_tree_img}
                            alt=""
                            width={150}
                            height={150}
                          />
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
                              <div>{item.treeInfo.file}</div>
                              <div className="title">{item.treeInfo.name}</div>
                              <div>스플릿{treeDesc}</div>
                              {/* <div>{item.treeInfo.description}</div> */}
                            </div>
                          ) : (
                            <div>나무를 더 성장시켜보셈 !</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : cardType == 'myTagged' ? (
                    // 태그된 추억 조회
                    <div className="mypage-box">
                      <Image
                        src={images.my_tree_img}
                        alt=""
                        width={150}
                        height={150}
                      />
                      <div className="text-content">
                        <p className="title">{item.title}</p>
                        <p className="date">
                          {moment(item.createdTime).format('YYYY년 MM월 DD일')}
                        </p>
                      </div>
                      <button
                        className="green-btn"
                        onClick={() => clickTakeTree(item.boardId)}
                      >
                        퍼가기
                      </button>
                    </div>
                  ) : (
                    // 나의 새 조회
                    <div className="mypage-box flip-card ">
                      <div className="card center">
                        <div className="front">
                          <div className="gray-clay center-clay">
                            <Image
                              src={images['bird_' + item.bird?.birdId + '_img']}
                              alt=""
                              width={150}
                              height={150}
                            />
                          </div>
                        </div>

                        <div className="back">뒷면이양</div>
                      </div>
                      <div className="text-content">
                        <BirdNickname
                          nickname={item.nickname}
                          memberBirdId={item.memberBirdId}
                          refetch={refetch}
                        ></BirdNickname>
                      </div>
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
          }
          p {
            font-size: 15px;
            text-align: center;
          }
          .title {
            color: black;
          }
          .date {
            font-size: 13px;
            color: gray;
          }
          .mypage-box {
            display: flex;
            flex-direction: column;
            width: 100%;
             {
              /* height: 300px; */
            }
            justify-content: center;
            align-items: center;
          }
          .text-content {
            margin-top: 25px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          button {
            margin: 10px;
            height: 30px;
          }

          .flip-card {
            width: 200px;
            height: 200px;
            position: relative;
            perspective: 1100px;
            margin: 2rem;
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
            width: 220px;
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
