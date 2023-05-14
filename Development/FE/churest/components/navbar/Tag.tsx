import Carousel from '../common/Carousel';
import { getTaggedTree } from '@/apis/navbar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { openTagAtom } from '@/atoms/modal';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { images } from '@/public/assets/images';
import Image from 'next/image';
import moment from 'moment';
import ModalBlackBg from '../common/ModalBlackBg';
type Props = {
  memberId: number;
};

export default function Tag({ memberId }: Props) {
  const cardType = 'myTagged';
  // 나의 태그 목록
  const [tagList, setMyTags] = useState([{}]);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const closeModal = () => {
    setIsTagOpen({ isModal: false });
  };

  const { data, refetch } = useQuery(
    'mytags',
    () => getTaggedTree(Number(memberId)),
    {
      onSuccess(data) {
        console.log('너 뭐야 !:!?!?ㅖ ');
        console.log(...data.data);
        setMyTags([...data.data]);
      },
      onError: (error) => {
        console.log('에러다');
        console.log(error);
      },
      staleTime: 60 * 1000,
    }
  );
  // 태그된 추억 퍼가기
  const clickTakeTree = (boardId: number) => {
    console.log(
      '퍼가기 버튼 누름, boardId 같이 넘겨서 본인 숲으로 가야함' + boardId
    );
    // redirect ?
  };
  return (
    <>
      {/* {isTagOpen.isModal && <ModalBlackBg closeModal={closeModal} />} */}
      <div className="blue-clay modal-container">
        <div className="modal-title">태그 모아보기</div>
        <div className="mine center">
          {data && data!.data.length == 0 ? (
            <div style={{ color: 'gray' }}>태그된 추억이 아직 없습니다.</div>
          ) : (
            <div style={{ width: '100%' }}>
              {/* <Carousel cardType={cardType} info={tagList}></Carousel> */}
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
                {data &&
                  data!.data.map((item: any, idx: number) => {
                    return (
                      <SwiperSlide
                        key={idx}
                        className="
                        inside-circle"
                        style={{ width: '100px', height: '300px' }}
                      >
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
                              {moment(item.createdTime).format(
                                'YYYY년 MM월 DD일'
                              )}
                            </p>
                          </div>
                          <button
                            className="green-btn"
                            onClick={() => clickTakeTree(item.boardId)}
                          >
                            퍼가기
                          </button>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .mine {
            width: 200px;
            height: 320px;
          }
          .tree-img {
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
