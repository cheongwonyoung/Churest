import Link from 'next/link';
import { Error404 } from '@/components/3DFiles/Error404';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
export default function Custom404() {
  return (
    <div className="container">
      {/* <div> */}
      <Canvas shadows camera={{ position: [0, 0, 10] }}>
        <mesh receiveShadow castShadow>
          <Error404 rotation={[0, -Math.PI / 2, 0]} />
        </mesh>
        {/* <OrbitControls /> */}
        <orthographicCamera />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow={true}
          intensity={2}
        />
      </Canvas>

      <p className="content">페이지를 찾을 수 없습니다.</p>
      <p className="content-two">올바른 URL을 입력하였는지 확인하세요.</p>
      <Link href="/churest/0" style={{ textDecoration: 'none' }}>
        <div className="btn">
          <p className="btn-content">나의 숲으로 돌아가기</p>
        </div>
      </Link>
      {/* </div> */}
      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: radial-gradient(
              50% 50% at 50% 50%,
              #ffef98 0%,
              rgba(250, 255, 239, 0.74) 100%
            );
          }

          .content {
            font-size: 48px;
            font-weight: bold;
          }
          .content-two {
            font-size: 20px;
          }
          .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 180px;
            height: 20px;
            padding: 13px;
            background: linear-gradient(to top left, #f0ff94 0%, #1eb0e9 100%);
            box-shadow: 0px 20px 40px 0 #ccedfa;
            border-radius: 20px;
          }
          .btn-content {
            font-size: 20px;
            font-weight: bold;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
