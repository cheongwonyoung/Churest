import { BirdHouse1 } from '../3DFiles/BirdHouse/BirdHouse1';
import { BirdHouse2 } from '../3DFiles/BirdHouse/BirdHouse2';
import { BirdHouse3 } from '../3DFiles/BirdHouse/BirdHouse3';
import { Bird1 } from '../3DFiles/Birds/Bird1';
import { Bird2 } from '../3DFiles/Birds/Bird2';
import { Bird3 } from '../3DFiles/Birds/Bird3';
import { Bird4 } from '../3DFiles/Birds/Bird4';
import { Bird5 } from '../3DFiles/Birds/Bird5';
import { Bird6 } from '../3DFiles/Birds/Bird6';
import { Bird7 } from '../3DFiles/Birds/Bird7';
import { House1 } from '../3DFiles/House/House_1';
import { House2 } from '../3DFiles/House/House_2';
import { House3 } from '../3DFiles/House/House_3';
import { House4 } from '../3DFiles/House/House_4';
import { House5 } from '../3DFiles/House/House_5';
import { House6 } from '../3DFiles/House/House_6';

export function BirdHouses(id: number) {
  switch (id) {
    case 1:
      return <BirdHouse2 />;
    case 2:
      return <BirdHouse3 />;
    case 3:
      return <BirdHouse1 />;
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
    case 6:
      return <House6 />;
  }
}

export function Birds(id: number) {
  switch (id) {
    case 1:
      return <Bird1 scale={0.5} />;
    case 2:
      return <Bird2 scale={0.5} />;
    case 3:
      return <Bird3 scale={0.5} />;
    case 4:
      return <Bird4 scale={0.5} />;
    case 5:
      return <Bird5 scale={0.5} />;
    case 6:
      return <Bird6 scale={0.5} />;
    case 7:
      return <Bird7 scale={0.5} />;
  }
}
