import Image from 'next/image';
import { images } from '@/public/assets/images';
import { getMyChurest } from '@/apis/churest';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function MemoryView() {
  let memberId = 1;
  let boardId = 1;

  const [tree, setTree] = useState();
  useQuery('myTree', () => getMyChurest(Number(memberId), Number(boardId)), {
    onSuccess(data) {
      console.log('책 열기 성공');
      console.log(data.data);
    },
  });

  const TagList = [1, 2, 3, 4, 5, 6];

  const tagItems = TagList.map((item) => {
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
              <div style={{ width: '50px', height: '50px' }}>
                <Image
                  src={images['cloudy_img']}
                  alt=""
                  priority
                  width={70}
                  height={70}
                  // fill
                  // style={{ objectFit: 'fit' }}
                ></Image>
              </div>
            </div>
            <div className="center">햄 엠</div>
            <div className="center">2023.00.00</div>
          </div>
          <div className="center tag-list">{tagItems}</div>
          <div className="center picture">사진</div>
          <div className="center content">내용</div>
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
          z-index: 1;
        }
        .child {
          position: absolute;
          z-index: 2;
        }
        .book-grid {
          width: 1000px;
          height: 600px;
          display: grid;
          grid-template-columns: 500px 500px;
          grid-template-rows: 150px 450px;
        }
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 30px 100px 100px 50px;
          background: #fffbf2;
          // box-shadow: inset 0px 10px 30px #1b431a, inset 10px 10px 20px #000000;
          border-radius: 45px;
        }
        .top {
          margin: 30px 50px 30px 100px;
        }
        .picture {
          margin: 30px 50px 100px 100px;
        }
        .tag-list {
          margin: 30px 100px 30px 50px;
        }
      `}</style>
    </>
  );
}
