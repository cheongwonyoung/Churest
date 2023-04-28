import Image from 'next/image';
import birdImg from '@/public/assets/bird_1_img.png';
import Carousel from '../common/Carousel';

export default function MyBird() {
  const cardType = 'mybird';
  return (
    <>
      <div className="blue-clay container center">
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
            width: 400px;
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
