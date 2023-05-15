import AvatarList from './AvatarList';
import NextBtn from './NextBtn';

type Props = {
  handlePickedAvatar(i: any): void;
  pickedAvatar: string;
  plusPage(): void;
};
export default function StepAvatart({
  handlePickedAvatar,
  pickedAvatar,
  plusPage,
}: Props) {
  return (
    <>
      <div className="avatar-container">
        <h1 className="center font-bold">원하는 캐릭터를 선택해주세요</h1>
        <div className="center">
          <AvatarList
            handlePickedAvatar={handlePickedAvatar}
            pickedAvatar={pickedAvatar}
          />
        </div>
        <div className="center">
          <NextBtn
            comment={'NEXT'}
            type={pickedAvatar ? 'show' : 'hidden'}
            logic={plusPage}
          />
        </div>
      </div>
      <style jsx>{`
        .avatar-container{
          padding-top: 30px;
          padding-bottom: 30px;
        } 
        `}</style>
    </>
  );
}
