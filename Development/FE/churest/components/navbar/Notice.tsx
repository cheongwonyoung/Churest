// import { getNotices } from '@/apis/navbar';
import { images } from '@/public/assets/images';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import Image from 'next/image';

type Props = {
  memberId: number;
};

export default function Notice({ memberId }: Props) {
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
      <div className="blue-clay container">
        <div className="background"></div>
        <div className="title">알림함</div>

        {/* noticeList.map((notice)=>(어쩌저쩌)) */}

        <div className="notice">
          <div className="image">
            <div className="notice-profile center">
              <Image
                src={images.avatar_1_img}
                // src={images['avatar_' + avatarId + '_img']}
                alt=""
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="content">
            <div className="c-content">
              {type == 'tagged' ? (
                <p>님이 추억에 회원님을 태그했습니다.</p>
              ) : (
                <p>추억이 나무로 성장했습니다.</p>
              )}
            </div>
            <div className="c-date">
              2023.05.04
              {/* {moment(item.createdTime).format('YYYY년 MM월 DD일')} */}
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            width: 500px;
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
            overflow-y: auto;
            position: fixed;
            z-index: 50;
          }
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
          .notice-profile {
            width: 80px;
            height: 80px;
            border-radius: 100px;
            background: rgba(243, 247, 255, 0.62);
            // box-shadow: inset -5px -2px 4px #ffffff,
            //   inset 3px 3px 10px #bac3df;
            margin-left: 15%;
          }
          .notice {
            background: #f0f0f3;
            box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.4),
              5px 5px 10px rgba(174, 174, 192, 0.2),
              inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px #ffffff;
            border-radius: 40px;
            margin: 0 5%;
          }
          .title {
            line-height: 50px;
            font-size: 35px;
            font-weight: bold;
            margin-bottom: 25px;
          }
          .content {
            float: right;
            width: 65%;
            padding: 5%;
          }
          .c-content {
            font-weight: 600;
          }
          .c-date {
            margin-top: 10px;
            font-weight: medium;
            color: #c0c0c0;
          }
        `}
      </style>
    </>
  );
}
