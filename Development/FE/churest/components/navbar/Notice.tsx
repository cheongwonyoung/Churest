// import { getNotices } from '@/apis/navbar';
import { images } from '@/public/assets/images';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import Image from 'next/image';
import ModalBlackBg from '../common/ModalBlackBg';
import { useRecoilState } from 'recoil';
import { openAlarmAtom } from '@/atoms/modal';

type Props = {
  memberId: number;
};

export default function Notice({ memberId }: Props) {
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const type = 'tagged';
  const [noticeList, setNoticeList] = useState<
    {
      avatarId: number;
      boardId: number;
      title: string;
      nickname: string;
      type: string; // 태그 또는 나무 성장
      // createdTime: ;
    }[]
  >([]);
  const closeModal = () => {
    setIsAlarmOpen({ isModal: false });
  };

  // 나의 알림 목록 GET
  // useQuery('notices', () => getNotices(Number(memberId)), {
  //   onSuccess(data) {
  //     setNoticeList([...data.data.notice]);
  //   },
  //   onError: (error) => {
  //     console.log('에러다');
  //     console.log(error);
  //   },
  //   staleTime: 60 * 1000,
  // });

  // useEffect(() => {
  //   // 마운트 될 때만 실행됨
  // }, []);

  return (
    <>
      <div>
        {/* {isAlarmOpen.isModal && <ModalBlackBg closeModal={closeModal} />} */}
        <div className="blue-clay modal-container">
          <div className="modal-title">알림함</div>
          {/* noticeList.map((notice)=>(어쩌저쩌)) */}

          <div className="notice-item">
            <div className="image">
              <div className="notice-profile center">
                <Image
                  src={images.avatar_1_img}
                  // src={images['avatar_' + avatarId + '_img']}
                  alt=""
                  width={50}
                  height={75}
                />
              </div>
            </div>
            <div className="item">
              <div className="notice-content">
                {type == 'tagged' ? (
                  <p>님이 추억에 회원님을 태그했습니다.</p>
                ) : (
                  <p>추억이 나무로 성장했습니다.</p>
                )}
              </div>
              <div className="item-date">
                2023.05.04
                {/* {moment(item.createdTime).format('YYYY년 MM월 DD일')} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .background {
            position: absolute;
            opacity: 25;
            width: 100%;
            height: 100%;
            background-color: black;
          }
          .image {
            float: left;
            width: 20%;
            padding: 5% 0;
          }
          .notice-item {
            width: 520px;
            background: linear-gradient(
                317.7deg,
                rgba(228, 228, 228, 0.104) 0%,
                rgba(255, 255, 255, 0.4) 105.18%
              ),
              #f7faff;
            background-blend-mode: soft-light, normal;
            box-shadow: -5px -5px 10px #fafbff,
              5px 5px 10px rgba(166, 171, 189, 0.29);
            border-radius: 10px;
          }
          .notice-profile {
            width: 80px;
            height: 80px;
            border-radius: 100px;
            // background: rgba(243, 247, 255, 0.62);
            // box-shadow: inset -5px -2px 4px #ffffff, inset 3px 3px 10px #bac3df;
            margin-left: 15%;
          }

          .item {
            float: right;
            width: 65%;
            padding: 5%;
          }
          .notice-content {
            font-weight: 500;
          }
          .item-date {
            margin-top: 10px;
            font-weight: medium;
            color: #c0c0c0;
          }
        `}
      </style>
    </>
  );
}
