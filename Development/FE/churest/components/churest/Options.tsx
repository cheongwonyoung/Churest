import dynamic from 'next/dynamic';

const BirdHouse1 = dynamic(() =>
  import('../3DFiles/BirdHouse/BirdHouse1').then((cp) => cp.BirdHouse1)
);
const BirdHouse2 = dynamic(() =>
  import('../3DFiles/BirdHouse/BirdHouse2').then((cp) => cp.BirdHouse2)
);
const BirdHouse3 = dynamic(() =>
  import('../3DFiles/BirdHouse/BirdHouse3').then((cp) => cp.BirdHouse3)
);

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

const House1 = dynamic(() =>
  import('../3DFiles/House/House_1').then((cp) => cp.House1)
);
const House2 = dynamic(() =>
  import('../3DFiles/House/House_2').then((cp) => cp.House2)
);
const House3 = dynamic(() =>
  import('../3DFiles/House/House_3').then((cp) => cp.House3)
);
const House4 = dynamic(() =>
  import('../3DFiles/House/House_4').then((cp) => cp.House4)
);
const House5 = dynamic(() =>
  import('../3DFiles/House/House_5').then((cp) => cp.House5)
);
const House6 = dynamic(() =>
  import('../3DFiles/House/House_6').then((cp) => cp.House6)
);

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

const Bird1 = dynamic(() =>
  import('../3DFiles/Birds/Bird1').then((cp) => cp.Bird1)
);
const Bird2 = dynamic(() =>
  import('../3DFiles/Birds/Bird2').then((cp) => cp.Bird2)
);
const Bird3 = dynamic(() =>
  import('../3DFiles/Birds/Bird3').then((cp) => cp.Bird3)
);
const Bird4 = dynamic(() =>
  import('../3DFiles/Birds/Bird4').then((cp) => cp.Bird4)
);
const Bird5 = dynamic(() =>
  import('../3DFiles/Birds/Bird5').then((cp) => cp.Bird5)
);
const Bird6 = dynamic(() =>
  import('../3DFiles/Birds/Bird6').then((cp) => cp.Bird6)
);
const Bird7 = dynamic(() =>
  import('../3DFiles/Birds/Bird7').then((cp) => cp.Bird7)
);

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

const Tree1 = dynamic(() =>
  import('../3DFiles/Trees/Tree1').then((cp) => cp.Tree1)
);
const Tree2 = dynamic(() =>
  import('../3DFiles/Trees/Tree2').then((cp) => cp.Tree2)
);
const Tree3 = dynamic(() =>
  import('../3DFiles/Trees/Tree3').then((cp) => cp.Tree3)
);
const Tree4 = dynamic(() =>
  import('../3DFiles/Trees/Tree4').then((cp) => cp.Tree4)
);
const Tree5 = dynamic(() =>
  import('../3DFiles/Trees/Tree5').then((cp) => cp.Tree5)
);
const Tree6 = dynamic(() =>
  import('../3DFiles/Trees/Tree6').then((cp) => cp.Tree6)
);
const Tree7 = dynamic(() =>
  import('../3DFiles/Trees/Tree7').then((cp) => cp.Tree7)
);
const Tree8 = dynamic(() =>
  import('../3DFiles/Trees/Tree8').then((cp) => cp.Tree8)
);
const Tree9 = dynamic(() =>
  import('../3DFiles/Trees/Tree9').then((cp) => cp.Tree9)
);

const Seed = dynamic(() =>
  import('../3DFiles/Trees/Seed').then((cp) => cp.Seed)
);
const Sprout = dynamic(() =>
  import('../3DFiles/Trees/Sprout').then((cp) => cp.Sprout)
);
const Branch = dynamic(() =>
  import('../3DFiles/Trees/Branch').then((cp) => cp.Branch)
);

export function Trees(treeInfo: {
  boardId: number;
  spot: number;
  score: number;
  treeId: number;
}) {
  if (treeInfo.score == 0) {
    return <Seed scale={3} />;
  } else if (treeInfo.score < 6) {
    return <Sprout scale={3} />;
  } else if (treeInfo.score < 16) {
    return <Branch />;
  } else {
    switch (treeInfo.treeId) {
      case 1:
        return <Tree1 />;
      case 2:
        return <Tree2 />;
      case 3:
        return <Tree3 />;
      case 4:
        return <Tree4 />;
      case 5:
        return <Tree5 />;
      case 6:
        return <Tree6 />;
      case 7:
        return <Tree7 />;
      case 8:
        return <Tree8 />;
      case 9:
        return <Tree9 />;
    }
  }
}
