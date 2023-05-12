import { RigidBody } from '@react-three/rapier';
import { Birds } from './Options';

type Props = {
  id: number;
};
export default function Bird({ id }: Props) {
  return (
    <RigidBody
      position={[3, 8, 0]}
      colliders="trimesh"
      canSleep={false}
      enabledRotations={[false, false, false]}
    >
      {/* {Birds(data?.data.birdId)} */}
    </RigidBody>
  );
}
