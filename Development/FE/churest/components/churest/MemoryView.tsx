import Image from 'next/image';

import { images } from '@/public/assets/images';
import { getMyChurest } from '@/apis/churest';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { loginAtom } from '@/atoms/login';
import { useMutation } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { wateringTree } from '@/apis/churest';
import { imageUrl } from '@/apis/index';
import { weathers } from '@/utils/weathers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import Swal from 'sweetalert2';
import router from 'next/router';
import { myTreeAtom } from '@/atoms/modal';
import moment from 'moment';
import { forestAtom } from '@/atoms/inp';

type Props = {
  boardId: number;
};
export default function MemoryView({ boardId }: Props) {
  let memberId = useRecoilValue(loginAtom).id;
  const token = useRecoilValue(loginAtom).accessToken;
  const [tagList, setTagList] = useState<any>([{}]);
  const { data, refetch: getArticle } = useQuery(
    ['myTree', boardId],
    () => getMyChurest(token, Number(memberId), Number(boardId)),
    {
      onSuccess(data) {
        if (data?.data.treeLogInfoList[0].score == 1) {
          showAlert('새싹으로 성장했습니다.');
          getForestInfo();
        } else if (data?.data.treeLogInfoList[0].score == 6) {
          showAlert("'" + data?.data.title + "'이 성장했습니다.");
          getForestInfo();
        }
        setTagList(data?.data.tagList);
      },
      onError(error) {},
    }
  );

  const clickWatering = () => {
    watering.mutate({ boardId, memberId });
  };

  const setTiming = useSetRecoilState(forestAtom);
  const getForestInfo = () => {
    setTiming((prev) => !prev);
  };

  const watering = useMutation(
    (info: { boardId: number; memberId: number }) =>
      wateringTree(token, info.boardId, info.memberId),
    {
      onSuccess: (wateringResult) => {
        getArticle();
        if (wateringResult?.data.reward == true) {
          showAlert("'" + data?.data.title + "'이 나무로 성장했습니다.");
          getForestInfo();
        } else if (
          data?.data.treeLogInfoList[0].score >= 3 &&
          data?.data.treeLogInfoList[0].score < 6
        ) {
          showAlert("'" + data?.data.title + "'이 성장했습니다.");
          getForestInfo();
        } else showAlert('물 주기 성공');
      },
    }
  );

  const showAlert = (text: string) => {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  // 태그된 친구의 숲으로 이동
  const setIsMyTreeOpen = useSetRecoilState(myTreeAtom);
  const closeModal = () => {
    setIsMyTreeOpen({ isModal: false, boardId: data?.data.boardId });
  };
  const movePage = (id: number) => {
    router.push('/churest/' + id);
    closeModal();
  };
  // 태그된 사람 목록
  const tagItems = tagList.map((item: any, idx: number) => {
    return (
      <>
        <div
          key={idx}
          className="tag-box center-tag"
          onClick={(e) => movePage(item.memberId)}
        >
          <div className="search-avatar">
            <Image
              src={images['avatar_' + item.avatarId + '_img']}
              alt=""
              width={45}
              height={85}
            />
          </div>
          <p>{item.nickname}</p>
        </div>
        <style jsx>
          {`
            .center-tag {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin: 10px;
              color: gray;
            }
            .tag-box {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .tag-box p {
              text-align: center;
            }
            .tag-box:hover {
              transform: scale(1.1);
              transition: transform 0.5s;
              cursor: pointer;
            }
            .search-avatar {
              width: 55px;
              height: 55px;
              display: flex;
              justify-content: center;
              border-radius: 50%;
              overflow: hidden;
              border: 1px solid lightgray;
            }
            .nickname {
              font-weight: bold;
            }
          `}
        </style>
      </>
    );
  });

  const weather: '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개' =
    data?.data.weather;

  const date = moment(data?.data.createdTime, 'YYYYMMDD').format(
    'YYYY년 MM월 DD일'
  );

  return (
    <>
      <div className="container">
        <div className="child book-grid">
          <div className="top">
            <div className="title-box">
              <div className="title">{data?.data.title}</div>
            </div>
            <div className="date-box">
              <p>{date}</p>
              <div className="title-box">
                <p>날씨</p>
                <Image
                  src={weathers[weather]}
                  alt=""
                  priority
                  width={58}
                  height={50}
                ></Image>
              </div>
            </div>
          </div>
          {data && data?.data.fileList.length != 0 ? (
            <>
              <div className="center" style={{ margin: '10px 70px 0px 20px' }}>
                {tagItems}
              </div>
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
                style={{ width: '30%', marginLeft: '200px' }}
              >
                {data &&
                  data?.data.fileList.map((item: String, idx: number) => {
                    return (
                      <>
                        <SwiperSlide
                          key={idx}
                          style={{
                            position: 'relative',
                            bottom: 0,
                            width: '220px',
                          }}
                        >
                          <Image
                            src={imageUrl + item}
                            fill
                            alt="image"
                            style={{ borderRadius: '5%' }}
                          ></Image>
                        </SwiperSlide>
                      </>
                    );
                  })}
              </Swiper>
              <div className="center content-left">{data?.data.content}</div>
              <div></div>
              <div className="watering-box">
                <div className="watering-card" onClick={clickWatering}>
                  <Image
                    className=""
                    src={images['watering_icon_img']}
                    width={75}
                    height={85}
                    alt="물주기"
                  ></Image>
                  <div className="watering-text">물 주기</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div></div>
              <div className="center content-right">{data?.data.content}</div>
              <div></div>
              <div className="center" style={{ margin: '0px 0px 65px 0px' }}>
                {tagItems}
              </div>
              <div className="watering-box">
                <div className="watering-card" onClick={clickWatering}>
                  <Image
                    className=""
                    src={images['watering_icon_img']}
                    width={75}
                    height={85}
                    alt="물주기"
                  ></Image>
                  <div className="watering-text">물 주기</div>
                </div>
              </div>
            </>
          )}
        </div>
        <Image
          src={images['memory_img']}
          width={1000}
          height={600}
          alt="추억보기"
        />
      </div>
      <style jsx>{`
        .container {
          position: relative;
           {
            /* z-index: 0; */
          }
        }
        .child {
          position: absolute;
           {
            /* z-index: 1; */
          }
        }
        p {
          font-size: 20px;
          font-weight: bold;
          margin-right: 20px;
        }
        .title {
          font-size: 20px;
        }
        .title-box {
          display: flex;
          align-items: center;
        }
        .date-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .book-grid {
          width: 1000px;
          height: 600px;
          display: grid;
          grid-template-columns: 500px 500px;
          grid-template-rows: 190px 280px 100px;
        }
        .content-left {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          margin: 0 100px 0 50px;
          padding-top: 40px;
        }
        .content-right {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          margin: 0 50px 0 100px;
          padding-top: 40px;
        }
        .top {
          margin: 80px 70px 0px 120px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .watering-box {
          display: flex;
          align-items: flex-end;
          justify-content: end;
          padding-right: 100px;
          padding-bottom: 50px;
        }
        .watering-card {
          cursor: pointer;
          width: fit-content;
          height: fit-content;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .watering-card:hover .watering-text {
          cursor: pointer;
          transition: 0.3s;
          opacity: 1;
        }
        .watering-text {
          cursor: pointer;
          position: absolute;
          opacity: 0;
          color: white;
          text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;
        }
      `}</style>
    </>
  );
}
