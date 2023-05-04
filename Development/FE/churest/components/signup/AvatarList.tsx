import AvatarItem from './AvatarItem';

type Props = {
  handlePickedAvatar(i: any): void;
  pickedAvatar: string;
};

export default function AvatarList({
  handlePickedAvatar,
  pickedAvatar,
}: Props) {
  const AvatarList = ['1', '2', '3', '4', '5', '6'];

  return (
    <>
      <div className="container">
        {AvatarList.map((item) => (
          <AvatarItem
            Avatar={item}
            key={item}
            handlePickedAvatar={handlePickedAvatar}
            pickedAvatar={pickedAvatar}
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
