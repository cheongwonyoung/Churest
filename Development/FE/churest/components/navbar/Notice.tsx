import { images } from '@/public/assets/images';
import { useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import moment from 'moment';
import Image from 'next/image';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { openAlarmAtom } from '@/atoms/modal';
import { getAlarm, checkedAlarm } from '@/apis/alarm';
import { useRouter } from 'next/router';
import { myTreeAtom } from '@/atoms/modal';
import { loginAtom } from '@/atoms/login';

type Props = {
  memberId: number;
};

type Notice = {
  noticeId: number;
  fromMember: number;
  toMember: number;
  board: number;
  avatar: number;
  treeId: number;
  content: string;
  isChecked: boolean;
  createdTime: string;
  fromMemberName: string;
};

export default function Notice({ memberId }: Props) {
  const router = useRouter();
  const token = useRecoilValue(loginAtom).accessToken;
  // 모달 관련
  const [isAlarmOpen, setIsAlarmOpen] = useRecoilState(openAlarmAtom);
  const type = 'tagged';
  const closeModal = () => {
    setIsAlarmOpen({ isModal: false });
  };
  const setIsMyTreeOpen = useSetRecoilState(myTreeAtom);

  // 알림 GET
  const { data, refetch } = useQuery('getNotice', () =>
    getAlarm(token, memberId)
  );

  useEffect(() => {
    refetch();
  }, []);

  // 읽은 알람 checked
  const isChecked = useMutation(
    (noticeId: number) => checkedAlarm(token, noticeId),
    {
      onSuccess: (data) => {
        refetch();
      },
    }
  );

  return (
    <>
      <div>
        <div className="blue-clay modal-container-scroll">
          <div className="modal-title">
            <Image
              src={images.alarm_navbar_img}
              width={35}
              height={35}
              alt=""
            />
            <div>알림함</div>
          </div>
          {data && data?.data.length === 0 && (
            <div style={{ textAlign: 'center' }}>알림이 없습니다.</div>
          )}
          {data ? (
            data.data.map((notice: Notice, idx: number) => {
              return notice.toMember === notice.fromMember ? (
                // 나무 다 자랐을 때
                <div
                  key={idx}
                  className="notice-item"
                  onClick={() => {
                    setIsAlarmOpen({ isModal: false });
                    // router.push('/churest/' + notice.fromMember);
                    setIsMyTreeOpen({
                      isModal: true,
                      boardId: notice.board,
                    });
                    isChecked.mutate(notice.noticeId);
                  }}
                >
                  <div className="image">
                    <div className="notice-profile center">
                      <Image
                        src={images['tree_' + notice.treeId + '_img']}
                        alt=""
                        width={50}
                        height={75}
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="notice-content">
                      <p>추억{notice.content}</p>
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
                    // router.push('/churest/' + notice.fromMember);
                    setIsMyTreeOpen({
                      isModal: true,
                      boardId: notice.board,
                    });
                    isChecked.mutate(notice.noticeId);
                  }}
                >
                  <div className="image">
                    <div className="notice-profile">
                      <Image
                        src={images['avatar_' + notice.avatar + '_img']}
                        alt=""
                        width={50}
                        height={75}
                      />
                    </div>
                  </div>

                  <div className="item">
                    <div className="notice-content">
                      <p>
                        {notice.fromMemberName}
                        {notice.content}
                      </p>
                    </div>
                    <div className="item-date">
                      {moment(notice.createdTime).format('YYYY년 MM월 DD일')}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div>알림이 없습니다.</div>
            </>
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
            width: 340px;
            background: linear-gradient(
                317.7deg,
                rgba(228, 228, 228, 0.104) 0%,
                rgba(255, 255, 255, 0.4) 105.18%
              ),
              #f7faff;
            background-blend-mode: soft-light, normal;
            box-shadow: -5px -5px 10px #f1f1f1,
              5px 5px 10px rgba(166, 171, 189, 0.29);
            border-radius: 10px;
            align-items: center;
          }
          .notice-item:hover {
            transform: scale(1.05);
            transition: transform 0.5s;
            cursor: pointer;
          }
          .notice-profile {
            width: 70px;
            height: 70px;
            border-radius: 100px;
            margin-left: 5%;
            display: flex;
            align-items: center;
            justify-content: center;
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
          .scroll-bar {
            width: 400px;
            overflow-y: scroll;
            text-align: center;
          }
          /* 스크롤바 설정*/
          .scroll-bar::-webkit-scrollbar {
            width: 6px;
          }

          /* 스크롤바 막대 설정*/
          .scroll-bar::-webkit-scrollbar-thumb {
            background: linear-gradient(#8ea4c3, rgba(88, 120, 250, 0.298));
            border-radius: 25px;
          }

          /* 스크롤바 뒷 배경 설정*/
          .scroll-bar::-webkit-scrollbar-track {
            background-color: #b1b1b11f;
          }
        `}
      </style>
    </>
  );
}
