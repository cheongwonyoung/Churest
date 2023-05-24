import { spots } from '@/utils/spots';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useState } from 'react';
import { PlantNo } from '../3DFiles/PlantNo';
import { PlantOk } from '../3DFiles/PlantOk';
import { useRecoilState } from 'recoil';
import { createArticleAtom } from '@/atoms/modal';

type Props = {
  occupied: { boardId: number; spot: number; score: number }[];
};

export default function ChoosePosition({ occupied }: Props) {
  const [points, setpoints] = useState(spots);

  useEffect(() => {
    occupied?.map((spot) => {
      setpoints((prev) => {
        return {
          ...prev,
          [spot['spot']]: { ...prev[spot['spot']], ok: false },
        };
      });
    });
  });

  const [hover, setHover] = useState('');
  const [isSelect, setIsSelcet] = useRecoilState(createArticleAtom);

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
                  hover == point[0] ? -5.8 : -6.2,
                  point[1].z,
                ]}
                onClick={(e: any) => {
                  if (isSelect.isTagged) {
                    setIsSelcet((prev) => {
                      return {
                        ...prev,
                        isTagModal: true,
                        spot: Number(e.eventObject.name),
                      };
                    });
                  } else {
                    setIsSelcet((prev) => {
                      return {
                        ...prev,
                        isModal: true,
                        spot: Number(e.eventObject.name),
                      };
                    });
                  }
                }}
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
                position={[point[1].x, -6.2, point[1].z]}
              />
            )}
          </RigidBody>
        );
      })}
    </>
  );
}
