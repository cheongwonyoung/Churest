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
      <div className="">
        <div className="">
          <h1 className="center font-bold">원하는 캐릭터를 선택해주세요</h1>
          <div className="center">
            <AvatarList
              handlePickedAvatar={handlePickedAvatar}
              pickedAvatar={pickedAvatar}
            />
          </div>
          <div className="center">
            {pickedAvatar && (
              <NextBtn comment={'다음 스텝으로'} logic={plusPage} />
            )}
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
