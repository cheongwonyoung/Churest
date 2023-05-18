import { Vector3 } from '@react-three/fiber';
import { TFlower_1 } from '../3DFiles/Flowers/TFlower_1';
import { TFlower_2 } from '../3DFiles/Flowers/TFlower_2';
import { TFlower_3 } from '../3DFiles/Flowers/TFlower_3';
import { TFlower_4 } from '../3DFiles/Flowers/TFlower_4';

type Props = {
  position: Vector3;
  num: number;
};
export default function TileFlower({ position, num }: Props) {
  const flower = () => {
    switch (num) {
      case 1:
        return <TFlower_1 position={position} />;
      case 2:
        return <TFlower_2 position={position} />;
      case 3:
        return <TFlower_3 position={position} />;
      case 4:
        return <TFlower_4 position={position} />;
    }
  };
  return <>{flower()}</>;
}
