import React from 'react';
import { images } from '@/public/assets/images';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import moment from 'moment';
import Image from 'next/image';
import { myRewardModal } from '@/atoms/modal';
import { useSetRecoilState } from 'recoil';

SwiperCore.use([EffectCoverflow, Pagination]);

type Props = {
  cardType: string;
  info: any;
  refetch?: any;
};

export default function Carousel({ cardType, info, refetch }: Props) {
  const setMyRewardModal = useSetRecoilState(myRewardModal);
  const showReward = (treeInfo: {}) => {
    setMyRewardModal({ isModal: true, treeInfo: treeInfo });
  };

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
          style={{ height: '350px' }}
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
                  style={{ width: '270px' }}
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
                            <div>
                              <div
                                className="reward-btn"
                                onClick={(e) => showReward(item)}
                              >
                                <Image
                                  src={images['reward_icon_img']}
                                  alt=""
                                  width={130}
                                  height={130}
                                ></Image>
                              </div>
                            </div>
                          ) : (
                            // <TreeInfo item={item.treeInfo}></TreeInfo>
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

          .center-clay {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .reward-btn {
            animation: flying 1s infinite alternate;
          }
          .reward-btn:hover {
            animation: vibration 0.1s infinite;
          }
          @keyframes vibration {
            from {
              transform: rotate(1deg);
            }
            to {
              transform: rotate(-1deg);
            }
          }
        `}
      </style>
    </>
  );
}
