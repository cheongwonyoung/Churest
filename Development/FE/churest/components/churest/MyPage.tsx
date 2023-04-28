import Image from 'next/image';
import birdImg from '@/public/assets/bird_1_img.png';
import Carousel from '../common/Carousel';

export default function MyPage() {
  const cardType = 'mypage';
  return (
    <>
      <div className="blue-clay container">
        <div>
          <div className="inside-circle center">
            <Image src={birdImg} alt="" width={100} />
          </div>
          <div className="center">흑비둘기최윹애</div>
        </div>
        <div className="mine">
          <Carousel cardType={cardType}></Carousel>
        </div>

        {/* <div className="gray-clay mine">
          <Image src={treeImg} alt="" width={200} />

          <p>행복했던 엠지들</p>
          <p>2023.02.21</p>
        </div> */}
      </div>

      <style jsx>
        {`
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            place-items: center;
            width: 800px;
            height: 400px;
          }
          .mine {
            display: grid;
            place-items: center;
            width: 300px;
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
