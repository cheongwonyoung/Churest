import { Vector3 } from '@react-three/fiber';
import { TFlower_1 } from '../3DFiles/Flowers/TFlower_1';
import { TFlower_2 } from '../3DFiles/Flowers/TFlower_2';
import { TFlower_3 } from '../3DFiles/Flowers/TFlower_3';
import { TFlower_4 } from '../3DFiles/Flowers/TFlower_4';

type Props = {
  position: Vector3;
  id: number;
};
export default function TileFlower({ position, id }: Props) {
  const flower = () => {
    switch (id) {
      case 3:
      case 5:
        return <TFlower_1 position={position} />;
      case 1:
      case 4:
        return <TFlower_2 position={position} />;
      case 2:
      case 9:
        return <TFlower_3 position={position} />;
      case 6:
      case 7:
      case 8:
        return <TFlower_4 position={position} />;
    }
  };
  return <>{flower()}</>;
}
