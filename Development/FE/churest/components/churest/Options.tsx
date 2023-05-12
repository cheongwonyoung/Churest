import { BirdHouse1 } from '../3DFiles/BirdHouse/BirdHouse1';
import { BirdHouse2 } from '../3DFiles/BirdHouse/BirdHouse2';
import { BirdHouse3 } from '../3DFiles/BirdHouse/BirdHouse3';
import { House1 } from '../3DFiles/House/House_1';
import { House2 } from '../3DFiles/House/House_2';
import { House3 } from '../3DFiles/House/House_3';
import { House4 } from '../3DFiles/House/House_4';
import { House5 } from '../3DFiles/House/House_5';

export function BirdHouses(id: number) {
  switch (id) {
    case 1:
      return <BirdHouse1 />;
    case 2:
      return <BirdHouse2 />;
    case 3:
      return <BirdHouse3 />;
  }
}

export function Houses(id: number) {
  switch (id) {
    case 1:
      return <House1 />;
    case 2:
      return <House2 />;
    case 3:
      return <House3 />;
    case 4:
      return <House4 />;
    case 5:
      return <House5 />;
  }
}
