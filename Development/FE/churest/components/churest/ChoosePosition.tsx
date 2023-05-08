import { spots } from '@/utils/spots';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useState } from 'react';
import { PlantNo } from '../3DFiles/PlantNo';
import { PlantOk } from '../3DFiles/PlantOk';
import { useSetRecoilState } from 'recoil';
import { createArticleAtom } from '@/atoms/modal';

export default function ChoosePosition() {
  const [points, setpoints] = useState(spots);

  const [hover, setHover] = useState('');
  const setIsSelcet = useSetRecoilState(createArticleAtom);

  return (
    <>
      {Object.entries(points).map((point: any) => {
        return (
          <RigidBody type="fixed" key={point[0]}>
            {point[1].ok ? (
              <PlantOk
                name={point[0]}
                position={[
                  point[1].x,
                  hover == point[0] ? -6 : -6.48,
                  point[1].z,
                ]}
                onClick={(e: any) =>
                  setIsSelcet({
                    isModal: true,
                    spot: Number(e.eventObject.name),
                  })
                }
                onPointerEnter={(e: any) => {
                  setHover(e.eventObject.name);
                }}
                onPointerOut={(e: any) => {
                  setHover('');
                }}
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
