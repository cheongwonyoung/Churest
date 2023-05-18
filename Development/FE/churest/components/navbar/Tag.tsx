import Carousel from '../common/Carousel';
import { getTaggedTree } from '@/apis/navbar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { openTagAtom } from '@/atoms/modal';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { images } from '@/public/assets/images';
import Image from 'next/image';
import moment from 'moment';
import ModalBlackBg from '../common/ModalBlackBg';
import { createArticleAtom } from '@/atoms/modal';
import { loginAtom } from '@/atoms/login';
import { useRouter } from 'next/router';
import { myTreeAtom } from '@/atoms/modal';
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
  const userInfo = useRecoilValue(loginAtom);
  const { data, refetch } = useQuery(
    'mytags',
    () => getTaggedTree(Number(memberId)),
    {
      onSuccess(data) {
        setMyTags([...data.data]);
      },
      onError: (error) => {},
      staleTime: 60 * 1000,
    }
  );

  const [isSelect, setIsSelect] = useRecoilState(createArticleAtom);
  const router = useRouter();

  // 태그된 추억 퍼가기
  const clickTakeTree = (boardId: number) => {
    setIsSelect((prev) => {
      return { ...prev, isSelect: true, isTagged: true, boardId };
    });
    closeModal();
    router.push(`/churest/${userInfo.id}`);
  };

  const setIsMyTreeOpen = useSetRecoilState(myTreeAtom);
  const showTreeModal = (boardId: number) => {
    setIsMyTreeOpen({
      isModal: true,
      boardId: boardId,
    });
  };

  return (
    <>
      {/* {isTagOpen.isModal && <ModalBlackBg closeModal={closeModal} />} */}
      <div className="blue-clay modal-container">
        <div className="modal-title">
          <Image src={images.tag_navbar_img} width={35} height={35} alt="" />{' '}
          태그 모아보기
        </div>
        <div className="center">
          {data && data!.data.length == 0 ? (
            <div className="gray-text">태그된 추억이 아직 없습니다.</div>
          ) : (
            <div style={{ width: '300px' }}>
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
                  data!.data.reverse().map((item: any, idx: number) => {
                    return (
                      <SwiperSlide
                        key={idx}
                        className="gray-clay"
                        style={{ width: '300px', height: '360px' }}
                      >
                        <div
                          className="tag-box"
                          onClick={() => showTreeModal(item.boardId)}
                        >
                          <Image
                            src={images[`tree_${item.treeId}_img`]}
                            alt=""
                            width={180}
                            height={200}
                          />
                          <div className="text-content">
                            <p className="title center">{item.title}</p>
                            <p className="gray-text center">
                              {moment(item.createdTime).format(
                                'YYYY년 MM월 DD일'
                              )}
                            </p>
                          </div>
                          <button
                            className="green-btn take-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              clickTakeTree(item.boardId);
                            }}
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
          .gray-text {
            color: gray;
          }
          .title {
            text-align: center;
            font-weight: 600;
            font-size: 23px;
            padding-bottom: 10px;
          }
          .tree-img {
            margin: 0 auto;
          }
          .tag-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            cursor: pointer;
          }
          .tag-box:hover {
            transform: scale(1.05);
            transition: transform 0.3s;
            cursor: pointer;
          }
          .take-btn {
            margin-top: 17px;
          }
        `}
      </style>
    </>
  );
}
