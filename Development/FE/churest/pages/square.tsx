import { loginAtom } from '@/atoms/login';
import { squareModalAtom } from '@/atoms/modal';
import { useRecoilValue, useRecoilState } from 'recoil';
import Churest3D from '@/components/churest/Churest3D';
import SquareBox from '@/components/square/SquareBox';
import { Canvas } from '@react-three/fiber';
import SquareNavbar from '@/components/square/SquareNavbar';

export default function Square() {

  const memberId = useRecoilValue(loginAtom).id;
  const [isDonateOpen, setIsDonateOpen] = useRecoilState(squareModalAtom);

  const clickDonate = () => {
    console.log("기부 현황 보기");
    setIsDonateOpen({isModal: true});
  }

  return (
    <>
      <div className="three-container"><button onClick={clickDonate}>세계수 눌러가지고 기부 현황 보기</button>
        <SquareNavbar />
        <Canvas>
          <Churest3D selectSpot={false} autoView={true} />
        </Canvas>
        
      </div>
      <SquareBox />
      <style jsx>{`
        .three-container {
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </>
  );
}
