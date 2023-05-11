import { images } from '@/public/assets/images';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { openAlarmAtom } from '@/atoms/modal';
import { getAlarm } from '@/apis/alarm';

type Props = {
  memberId: number;
};

type Notice = {
  noticeId: number;
  fromMember: number;
  toMember: number;
  content: string;
  isChecked: boolean;
  createdTime: string;
  fromMemberName: string;
};

export default function Notice({ memberId }: Props) {
  // 모달 관련
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const type = 'tagged';
  const closeModal = () => {
    setIsAlarmOpen({ isModal: false });
  };

  // 알림 GET
  const { data, refetch } = useQuery('getNotice', () => getAlarm(memberId));

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div>
        <div className="blue-clay modal-container">
          <div className="modal-title">알림함</div>
          {data ? (
            data.data.map((notice: Notice, idx: number) => {
              return (
                <div key={idx} className="notice-item">
                  <div className="image">
                    <div className="notice-profile center">
                      <Image
                        src={images['avatar_' + avatarId + '_img']}
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
              );
            })
          ) : (
            <div>알림이 없어용!</div>
          )}
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
