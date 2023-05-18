import Image from 'next/image';
import { images } from '@/public/assets/images';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tutorialAtom } from '@/atoms/modal';
import Swal from 'sweetalert2';

export default function Tutorial() {
  const [isTutorialOpen, setIsTutorialOpen] = useRecoilState(tutorialAtom);
  const [page, setPage] = useState(0);

  // const tutorialList = [
  //   {title: "츄레스트", content:"츄레스트에 온 걸 환영해! 츄레스트의 기능에 대해 설명해줄게!", src:""},
  //   {title: "추억 심기", content:"나의 츄레스트에 심고 싶은 나무와 위치를 선택하고 추억을 기록해봐!", src:""},
  //   {title: "추억 나무 키우기", content:"내가 심은 추억 나무를 조회하고 물을 주면 어느 순간 나무로 성장해!", src:"sprout_img"},
  //   {title: "구경하기", content:"이동키로 츄레스트를 돌아다니며 구경할 수 있어! spacebar를 눌러서 확인해봐!", src:""},
  //   {title: "방명록", content:"우체통에 방명록을 남길 수 있어!", src:""},
  //   // {title: "상점", content:"상점에서는 새, 새 집, 집을 구매하고 교체할 수 있어"},
  //   // {title: "광장", content:"광장에선 다른 사람들과 단체 채팅을 할 수 있고\n 나무 기부 현황을 확인할 수 있지!"},
  //   // {title: "친구 검색", content:"친구 검색을 통해 친구의 츄레스트에 놀러갈 수 있어!"},
  //   // {title: "알림함", content:"알림함에서 내가 태그된 기록과 성장한 나무를 확인할 수 있지!"},
  //   // {title: "태그 모아보기", content:"내가 태그된 기록은 여기서 항상 볼 수 있어!"},
  //   // {title: "마이페이지", content:"내 정보와 추억을 모아볼 수 있지!"},
  //   // {title: "츄월드", content:"츄월드에선 또 다른 츄레스트를 가진 사용자들을 랜덤으로 볼 수 있어!"},
  //   {title: "CHUREST", content:"추억을 기록해서 울창한 숲을 만들어봐!"},
  // ];

  const clickCloseButton = () => {
    setIsTutorialOpen({ isModal: false });
  };

  return (
    <>
      <div className="blue-clay container">
        {/* <div className="title">마이 츄레스트</div> */}

        <div className="img">
          <Image src={images['tutorial_img']} width={600} height={500} alt="" />
        </div>

        <button className="green-btn" onClick={clickCloseButton}>
          닫기
        </button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 700px;
          height: 580px;
        }
        .title {
          position: relative;
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          font-size: 70px;
          letter-spacing: -0.02em;
          color: #3343ff;
          text-shadow: -1px 0px rgba(35, 34, 91, 0.6),
            0px 1px rgba(35, 34, 91, 0.6), 1px 0px rgba(35, 34, 91, 0.6),
            0px -1px rgba(35, 34, 91, 0.6);
        }
        .content {
          display: flex;
          font-size: 20px;
          justify-content: center;
          align-items: center;
          margin: 5% 0;
        }
        .img {
          display: flex;
          justify-content: center;
          align-items: center;
           {
            /* animation: flying 1s infinite alternate; */
          }
          margin-bottom: 10px;
        }
        .bird-img {
          position: absolute;
          margin-bottom: 5%;
          animation: flying 1s infinite alternate;
        }
        .confirm {
          poisition: static;
        }
        @keyframes flying {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(0, 8px);
          }
        }
      `}</style>
    </>
  );
}
