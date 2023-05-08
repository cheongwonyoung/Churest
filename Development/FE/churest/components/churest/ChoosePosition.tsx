import { spots } from '@/utils/spots';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useState } from 'react';
import { PlantNo } from '../3DFiles/PlantNo';
import { PlantOk } from '../3DFiles/PlantOk';

export default function ChoosePosition() {
  const [points, setpoints] = useState(spots);
  return (
    <>
      {Object.entries(points).map((point: any) => {
        return (
          <RigidBody type="fixed">
            {point[1].ok ? (
              <PlantOk
                name={point[0]}
                position={[point[1].x, -6.48, point[1].z]}
              />
            ) : (
              <PlantNo
                name={point[0]}
                position={[point[1].x, -6.48, point[1].z]}
              />
            )}
          </RigidBody>
        );
      })}
    </>
  );
}
