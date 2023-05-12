import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { images } from '@/public/assets/images';
import { getMyChurest } from '@/apis/churest';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { loginAtom } from '@/atoms/login';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { wateringTree } from '@/apis/churest';
import CardComp from './CardComp.jsx';
import RoundCarousel from './RoundCarousel';

import Swal from 'sweetalert2';

type Props = {
  boardId: number;
};
export default function MemoryView({ boardId }: Props) {
  let memberId = useRecoilValue(loginAtom).id;
  const gcsLink =
    'https://storage.googleapis.com/churest-bucket/project_image/';

  // fileList를 아래 양식에 맞게 변환해야함
  const cards = [
    {
      key: uuidv4(),
      content: <CardComp imagen={images['bird_5_img']} />,
    },
    {
      key: uuidv4(),
      content: <CardComp imagen={images['bird_2_img']} />,
    },
    {
      key: uuidv4(),
      content: <CardComp imagen={images['bird_4_img']} />,
    },
    {
      key: uuidv4(),
      content: <CardComp imagen={images['bird_3_img']} />,
    },
  ];

  const [tree, setTree] = useState<any>([]);
  const [tagList, setTagList] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);
  // const {data} =
  useQuery('myTree', () => getMyChurest(Number(memberId), Number(boardId)), {
    onSuccess(data) {
      console.log(boardId + '번 책 열기 성공');
      console.log(data.data);
      setTree(data?.data);
      setTagList(data?.data.tagList);
      setFileList(data?.data.fileList);

      fileList.forEach((el: String) => {
        const srcStr = gcsLink + el;
        const item = {
          key: uuidv4(),
          content: <CardComp imagen={srcStr} />,
        };
        cards.push(item);
      });
    },
  });

  const clickWatering = () => {
    // console.log(boardId + '물줄게');
    watering.mutate({ boardId, memberId });
  };

  const watering = useMutation(
    (info: { boardId: number; memberId: number }) =>
      wateringTree(info.boardId, info.memberId),
    {
      onSuccess: () => {
        // console.log('물주기성공');
        showAlert('물 주기 성공');
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

  const tagItems = tagList.map((item: any, idx: number) => {
    return (
      <>
        <Image
          src={images['avatar_' + item + '_img']}
          alt=""
          width={33}
          height={48}
          style={{ margin: '5px' }}
        ></Image>
      </>
    );
  });

  return (
    <>
      <div className="container">
        <div className="child book-grid">
          <div className="top">
            <div className="center">
              <div style={{ width: '60px', height: '50px' }}>
                <Image
                  src={images['cloudy_img']}
                  alt=""
                  priority
                  width={58}
                  height={50}
                  // fill
                  // style={{ objectFit: 'fit' }}
                ></Image>
              </div>
            </div>
            <div className="center title">{tree.title}</div>
            <div className="center" style={{ color: 'gray' }}>
              {tree.createdTime}
            </div>
          </div>
          <div className="center" style={{ margin: '30px 100px 30px 50px' }}>
            {tagItems}
          </div>
          <div className="center carousel" style={{ margin: '0 50px 0 100px' }}>
            <RoundCarousel
              cards={cards}
              height="400px"
              width="100%"
              margin="0 auto"
              offset={2}
              showArrows={false}
            ></RoundCarousel>
          </div>
          <div className="center content">{tree.content}</div>
          <div></div>
          <div className="center" onClick={clickWatering}>
            <div className="watering-card content">
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
        .book-grid {
          width: 1000px;
          height: 600px;
          display: grid;
          grid-template-columns: 500px 500px;
          grid-template-rows: 150px 260px;
        }
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 100px 0 50px;
          padding: 15px;
          border-radius: 45px;
        }
        .top {
          margin: 30px 50px 30px 100px;
        }
        .title {
          font-size: larger;
          margin-bottom: 5px;
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
