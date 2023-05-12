import BirdItem from './BirdItem';

type Props = {
  handlePickedBird(i: any): void;
  pickedBird: string;
};

export default function BirdList({ handlePickedBird, pickedBird }: Props) {
  const BirdList = [
    'bird_1_img',
    'bird_2_img',
    'bird_3_img',
    'bird_4_img',
    'bird_5_img',
    'bird_6_img',
  ];
  return (
    <>
      <div className="container">
        {BirdList.map((item) => (
          <BirdItem
            Bird={item}
            key={item}
            handlePickedBird={handlePickedBird}
            pickedBird={pickedBird}
          />
        ))}
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
      `}</style>
    </>
  );
}
