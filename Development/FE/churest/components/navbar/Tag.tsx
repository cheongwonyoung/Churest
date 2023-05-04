import Carousel from '../common/Carousel';
import { getTaggedTree } from '@/apis/navbar';
import { useState } from 'react';
import { useQuery } from 'react-query';

type Props = {
    memberId: number;
};

export default function Tag({ memberId }: Props) {
    const cardType = 'mypage';
    // 나의 태그 목록
  const [tagList, setMyTags] = useState([{}]);

  const clickTakeTree = () => {
    console.log("퍼가기 버튼 누름, boardId 같이 넘겨서 본인 숲으로 가야함");
    // redirect ? 
  };


  useQuery('mytags', () => getTaggedTree(Number(memberId)), {
    onSuccess(data) {
      console.log(...data.data);
      setMyTags([...data.data]);
    },
    onError: (error) => {
      console.log('에러다');
      console.log(error);
    },
    staleTime: 60 * 1000,
  });
  
    return (
        <>
          <div className="blue-clay container">
            <div>태그 모아보기</div>
            <div className="mine">
              <Carousel cardType={cardType} info={tagList}></Carousel>
            </div>
            <button className="green-btn" onClick={clickTakeTree}>
                퍼가기
            </button>
          </div>
    
          <style jsx>
            {`
              .container {
                width: 400px;
                height: 400px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              .mine {
                width: 200px;
                height: 320px;
                padding: 10px 0 10px 0;
              }
              .tree-img {
                margin: 0 auto;
              }
            `}
          </style>
        </>
      );
  }