import BirdItem from './BirdItem';

type Props = {
  handlePickedBird(i: any): void;
  pickedBird: string;
};

export default function BirdList({ handlePickedBird, pickedBird }: Props) {
  const BirdList = ['1', '2', '3', '4', '5', '6'];

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
