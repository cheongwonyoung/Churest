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
        return <CreateArticle treeId={step} />;
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
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 50px 65px 0px 25px;
          }
        `}
      </style>
    </div>
  );
}
