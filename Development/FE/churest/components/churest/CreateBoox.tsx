import { useState } from 'react';
import CreateArticle from './CreateArticle';
import Image from 'next/image';
import { images } from '@/public/assets/images';
import PickTree from './PickTree';

export default function CreateBoox() {
  const [step, setStep] = useState(0);

  const [page, setPage] = useState(1);

  const plusPage = () => {
    page < 9 && setPage((prev) => prev + 1);
  };

  const minusPage = () => {
    page > 1 && setPage((prev) => prev - 1);
  };

  const plusStep = () => {
    setStep(1);
  };
  const createStep = () => {
    switch (step) {
      case 0:
        return (
          <PickTree
            plusStep={plusStep}
            step={step}
            plusPage={plusPage}
            minusPage={minusPage}
            page={page}
          />
        );
      case 1:
        return <CreateArticle treeId={page} />;
    }
  };

  return (
    <div className="articleContainer">
      {createStep()}
      <Image src={images.memory_img} width={850} height={700} alt="" />
      <style jsx global>
        {`
          .articleContainer {
            position: relative;
          }
          .inputBox {
            position: absolute;
            z-index: 51;
            width: 100%;
            height: 100%;
            display: flex;
          }
          .left {
            width: 335px;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 50px 25px 0px 65px;
            gap: 20px;
          }
          .right {
            width: 335px;
            height: 560px;
            display: flex;
            flex-direction: column;
            padding: 50px 65px 0px 25px;
          }
          .submitBtn {
            margin-top: 36px;
            box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.4),
              5px 5px 10px rgba(174, 174, 192, 0.2),
              inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px#fff;
            width: 334px;
            height: 44px;
            border-radius: 10px;
            padding: 8px;
            background-color: rgb(255, 218, 118);
            border: none;
            font-size: 24px;
            font-weight: 700;
            cursor: pointer;
            color: rgb(104, 97, 64);
          }
        `}
      </style>
    </div>
  );
}
