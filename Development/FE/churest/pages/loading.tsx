import { images } from '@/public/assets/images';
import Image from 'next/image';
import { Html } from '@react-three/drei';

export default function Loading() {
  return (
    <div className="loding-container">
      <div className="background">
        <Image src={images.earth_move} fill alt="" />;
      </div>
      <div className="loading-box">
        <div className="text">로딩중...</div>
        <div className="bird-box">
          <div className="bird">
            <Image src={images.loading} fill alt="" priority />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .loding-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
          }
          .background .img {
            position: relative;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .text {
            z-index: 100;
            font-size: 60px;
            background-color: rgba(223, 223, 223, 0.61);
            border-radius: 10px;
            font-weight: 700;
            text-align: center;
            color: rgb(0, 44, 61);
            margin-bottom: 40px;
            padding: 10px;
          }
          .loading-box {
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 30%;
            height: 30%;
          }

          .bird .img {
            position: relative;
            width: 30%;
            height: 30%;
            object-fit: cover;
          }
          .bird-box {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
}
