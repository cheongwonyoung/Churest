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

  return (
    <>
      <div classNameName="container">
        <div classNameName="child book-grid">
          <div classNameName="item item1 center">
            <div>
              <Image
                src={images.cloudy_img}
                alt=""
                width={50}
                height={50}
              ></Image>
            </div>
            0<div>햄 엠</div>
            <div>202306</div>
          </div>
          <div className="item item2 center">태그목록</div>
          <div className="item item2 center">사진</div>
          <div className="item item4 center content">내용</div>
        </div>
        <Image src={images.book_img} width={1000} height={600} alt="추억보기" />
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
          width: 100px;
          background: #fffbf2;
          box-shadow: inset 0px 10px 30px #1b431a, inset 10px 10px 20px #000000;
          border-radius: 45px;
        }
      `}</style>
    </>
  );
}
