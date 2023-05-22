import { RigidBody } from '@react-three/rapier';
import { G_map } from '../3DFiles/Square/G_map';
import { G_mapFloor } from '../3DFiles/Square/G_mapFloor';
import { G_bridge } from '../3DFiles/Square/G_bridge';
import { G_liver } from '../3DFiles/Square/G_liver';
import { G_animal1 } from '../3DFiles/Square/G_animal1';
import { G_animal2 } from '../3DFiles/Square/G_animal2';
import { G_animal3 } from '../3DFiles/Square/G_animal3';
import { G_animal4 } from '../3DFiles/Square/G_animal4';
import { G_around_bridge } from '../3DFiles/Square/G_around_bridge';
import { G_arrows } from '../3DFiles/Square/G_arrows';
import { G_big_tree_around } from '../3DFiles/Square/G_big_tree_around';
import { G_big_tree_bottom } from '../3DFiles/Square/G_big_tree_bottom';
import { G_boxes } from '../3DFiles/Square/G_boxes';
import { G_branches } from '../3DFiles/Square/G_branches';
import { G_buildingFirst } from '../3DFiles/Square/G_buildingFirst';
import { G_buildingGreen } from '../3DFiles/Square/G_buildingGreen';
import { G_buildingSecond } from '../3DFiles/Square/G_buildingSecond';
import { G_flower_red } from '../3DFiles/Square/G_flowerRed';
import { G_flower_blue } from '../3DFiles/Square/G_flowerBlue';
import { G_market } from '../3DFiles/Square/G_market';
import { G_mushroom_left_top } from '../3DFiles/Square/G_mushroom_left_top';
import { G_oaktong } from '../3DFiles/Square/G_oaktong';
import { G_rocks } from '../3DFiles/Square/G_rocks';
import { G_stones } from '../3DFiles/Square/G_stones';
import { G_table_chair } from '../3DFiles/Square/G_tableChair';
import { G_woomul } from '../3DFiles/Square/G_woomul';
import { G_tree_right_bottom } from '../3DFiles/Square/G_tree_right_bottom';
import { G_tree_left_bottom } from '../3DFiles/Square/G_tree_left_bottom';
import { G_tree_top_right } from '../3DFiles/Square/G_tree_right_top';

export default function SquareMap() {
  return (
    <>
      <RigidBody type="fixed" colliders="trimesh" name="map">
        <G_map />
      </RigidBody>
      <G_mapFloor />
      <RigidBody type="fixed" colliders="trimesh" name="map">
        <G_bridge />
      </RigidBody>
      <RigidBody sensor colliders="trimesh" type="fixed">
        <G_liver />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_animal1 />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_animal2 />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_animal3 />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_animal4 />
      </RigidBody>
      <G_around_bridge />
      <RigidBody type="fixed" colliders="trimesh">
        <G_arrows />
      </RigidBody>
      <G_big_tree_around />
      <RigidBody type="fixed" colliders="trimesh">
        <G_big_tree_bottom />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_boxes />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_branches />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_buildingFirst />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_buildingGreen />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_buildingSecond />
      </RigidBody>
      <G_flower_red />
      <G_flower_blue />
      <RigidBody type="fixed" colliders="trimesh">
        <G_market />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_mushroom_left_top />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_oaktong />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_rocks />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_stones />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_table_chair />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_tree_right_bottom />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_woomul />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_tree_left_bottom />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <G_tree_top_right />
      </RigidBody>
    </>
  );
}
