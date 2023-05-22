import AvatarItem from './AvatarItem';

type Props = {
  handlePickedAvatar(i: any): void;
  pickedAvatar: string;
};

export default function AvatarList({
  handlePickedAvatar,
  pickedAvatar,
}: Props) {
  const AvatarList = [
    'avatar_1_img',
    'avatar_2_img',
    'avatar_3_img',
    'avatar_4_img',
    'avatar_5_img',
    'avatar_6_img',
  ];

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
          gap: 20px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}
