import { useState } from 'react';
import CreateArticle from './CreateArticle';
import Image from 'next/image';
import { images } from '@/public/assets/images';
import PickTree from './PickTree';

export default function CreateBoox() {
  const [step, setStep] = useState(0);
  const createStep = () => {
    switch (step) {
      case 0:
        return <PickTree />;
      case 1:
        return <CreateArticle />;
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
            justify-content: center;
            align-items: center;
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
