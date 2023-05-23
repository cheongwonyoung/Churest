import Image from 'next/image';
import { images } from '@/public/assets/images';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tutorialAtom } from '@/atoms/modal';
import Swal from 'sweetalert2';

export default function Tutorial() {
  const [isTutorialOpen, setIsTutorialOpen] = useRecoilState(tutorialAtom);
  const [page, setPage] = useState(0);

  const clickCloseButton = () => {
    setIsTutorialOpen({ isModal: false });
  };

  return (
    <>
      <div className="blue-clay container">
        {/* <div className="title">마이 츄레스트</div> */}

        <div className="img">
          <Image
            src={images['tutorial_img']}
            width={600}
            height={500}
            alt=""
            priority
          />
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
