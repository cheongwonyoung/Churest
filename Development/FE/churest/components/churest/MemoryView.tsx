import Image from 'next/image';
import { images } from '@/public/assets/images';
import { getMyChurest } from '@/apis/churest';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function MemoryView() {
  let memberId = 1;
  let boardId = 1;

  type Tree = {title:string,content:string,createdTime:string,fileList:any,reward:boolean,treeInfo:any,weather:string,tagged:boolean};

  const [tree, setTree] = useState<any>([]);
  const [tagList, setTagList] = useState<any>([]);
  // const {data} =  
  useQuery('myTree', () => getMyChurest(Number(memberId), Number(boardId)), {
    onSuccess(data) {
      console.log('책 열기 성공');
      // console.log(data?.data);
      setTree(data?.data);
      setTagList(data?.data.tagList);
    },
  });
  // const tree = data?.data;

  // const TagList = data?.data.tagList;

  const tagItems = tagList.map((item:any, idx:number) => {
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
            <div className="center date">{tree.createdTime}</div>
          </div>
          <div className="center tag-list">{tagItems}</div>
          <div className="center picture">사진</div>
          <div className="center content">{tree.content}</div>
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
          padding: 30px;
          background: #fffbf2;
          // box-shadow: inset 0px 10px 30px #1b431a, inset 10px 10px 20px #000000;
          border-radius: 45px;
        }
        .top {
          margin: 30px 50px 30px 100px;
        }
        .title {
          font-size: larger;
          margin-bottom: 5px;
        }
        .picture {
          margin: 30px 50px 100px 100px;
        }
        .date {
          color: gray;
        }
        .tag-list {
          margin: 30px 100px 30px 50px;
        }
      `}</style>
    </>
  );
}
