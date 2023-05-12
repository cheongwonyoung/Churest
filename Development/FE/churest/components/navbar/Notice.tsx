import { images } from '@/public/assets/images';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { openAlarmAtom } from '@/atoms/modal';
import { getAlarm } from '@/apis/alarm';
import { useRouter } from 'next/router';

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
  const router = useRouter();

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

  const avatarId = 3;
  const boardId = 6;

  return (
    <>
      <div>
        <div className="blue-clay modal-container">
          <div className="modal-title">알림함</div>

          {data ? (
            data.data.map((notice: Notice, idx: number) => {
              return notice.toMember === notice.fromMember ? (
                // 나무 다 자랐을 때
                <div key={idx} className="notice-item">
                  {/* <div className="image">
                    <div className="notice-profile center">
                      <Image
                      src={images['avatar_' + ㅜ + '_img']}
                      alt=""
                      width={50}
                      height={75}
                    />
                    </div>
                  </div> */}
                  <div className="item">
                    <div className="notice-content">
                      <p>{notice.content}</p>
                    </div>
                    <div className="item-date">
                      {moment(notice.createdTime).format('YYYY년 MM월 DD일')}
                    </div>
                  </div>
                </div>
              ) : (
                // 추억에 태그 당했을 때
                <div
                  key={idx}
                  className="notice-item"
                  onClick={() => {
                    setIsAlarmOpen({ isModal: false });
                    router.push('/churest/' + notice.fromMember);
                  }}
                >
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
                      <p>{notice.content}</p>
                    </div>
                    <div className="item-date">
                      {moment(notice.createdTime).format('YYYY년 MM월 DD일')}
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
          .image {
            float: left;
            width: 20%;
            padding: 5% 0;
          }
          .notice-item {
            width: 360px;
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
          .notice-item:hover {
            transform: scale(1.1);
            transition: transform 0.5s;
            cursor: pointer;
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
