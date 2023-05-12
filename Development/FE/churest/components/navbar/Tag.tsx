import Carousel from '../common/Carousel';
import { getTaggedTree } from '@/apis/navbar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { openTagAtom } from '@/atoms/modal';
import ModalBlackBg from '../common/ModalBlackBg';
type Props = {
  memberId: number;
};

export default function Tag({ memberId }: Props) {
  const cardType = 'mypage';
  // 나의 태그 목록
  const [tagList, setMyTags] = useState([{}]);
  const [isTagOpen, setIsTagOpen] = useRecoilState(openTagAtom);
  const closeModal = () => {
    setIsTagOpen({ isModal: false });
  };
  const clickTakeTree = () => {
    console.log('퍼가기 버튼 누름, boardId 같이 넘겨서 본인 숲으로 가야함');
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
      {/* {isTagOpen.isModal && <ModalBlackBg closeModal={closeModal} />} */}
      <div className="blue-clay modal-container">
        <div className="modal-title">태그 모아보기</div>
        <div className="mine center">
          {tagList.length == 0 ? (
            <div style={{ color: 'gray' }}>태그된 추억이 아직 없습니다.</div>
          ) : (
            <div>
              <Carousel cardType={cardType} info={tagList}></Carousel>
            </div>
          )}
        </div>
        <button className="green-btn" onClick={clickTakeTree}>
          퍼가기
        </button>
      </div>
      <style jsx>
        {`
          .mine {
            width: 200px;
            height: 320px;
          }
          .tree-img {
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
