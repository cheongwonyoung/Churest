import { useState } from 'react';
// import StepFaceResult from '../components/signUp/StepFaceResult';
import { signUp } from '@/apis/login';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import router from 'next/router';
import StepAvatar from '@/components/signup/StepAvatar';
import StepNickname from '@/components/signup/StepNickname';
import StepBird from '@/components/signup/StepBird';
import StepBirdname from '@/components/signup/StepBirdname';
import { loginAtom } from '@/atoms/login';

export default function SignUpPage() {
  // 회원가입 입력 단계
  const [page, setPage] = useState(0);
  const plusPage = () => {
    setPage((prev) => prev + 1);
  };

  // 아바타 정보
  const [pickedAvatar, setPickedAvatar] = useState('');
  const handlePickedAvatar = (e: any) => {
    setPickedAvatar(e.target.id);
  };

  // 닉네임 정보
  const [nickname, setNickname] = useState('');
  const getNickname = (e: any) => {
    setNickname(e.target.value);
  };

  // 새 정보
  const [pickedBird, setPickedBird] = useState('');
  const handlePickedBird = (e: any) => {
    setPickedBird(e.target.id);
  };

  // 새 닉네임 정보
  const [birdname, setBirdname] = useState('');
  const getBirdname = (e: any) => {
    setBirdname(e.target.value);
  };

  const stepPage = () => {
    switch (page) {
      case 0:
        return (
          <StepAvatar
            handlePickedAvatar={handlePickedAvatar}
            pickedAvatar={pickedAvatar}
            plusPage={plusPage}
          />
        );
      case 1:
        return (
          <StepNickname
            handlePickedAvatar={handlePickedAvatar}
            pickedAvatar={pickedAvatar}
            plusPage={plusPage}
          />
        );
      case 2:
        return (
          <StepBird
            handlePickedBird={handlePickedBird}
            pickedBird={pickedBird}
            plusPage={plusPage}
          />
        );
      case 3:
        return (
          <StepBirdname
            handlePickedBird={handlePickedBird}
            pickedBird={pickedBird}
            plusPage={plusPage}
            signUpSubmit={signUpSubmit}
          />
        );
    }
  };
  const token: string = useRecoilValue(loginAtom).accessToken;
  const memberId: Number = useRecoilValue(loginAtom).id;

  const signUpSubmit = () => {
    let joinInfo = {
      avatarId: Number(pickedAvatar),
      birdId: Number(pickedBird),
      nickname: nickname,
      birdNickname: birdname,
      memberId: memberId,
    };
    goSignUp.mutate({ joinInfo, token: token });
  };

  // const [userState, setUserState] = useRecoilState(userStatus);

  const goSignUp = useMutation(
    (inp: { joinInfo: any; token: string }) => signUp(inp.joinInfo, inp.token),
    {
      onSuccess(data) {
        // setUserState({
        //   ...userState,
        //   id: data.data.memberId,
        //   nickname: data.data.nickname,
        //   profile_img: data.data.file,
        // });
        console.log('회원가입성공');
        console.log(data.data);
        router.push('/churest');
      },
    }
  );

  return (
    <>
      <div className="col-grid">{stepPage()}</div>
      <style jsx>{`
        .col-grid {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center; /* 수직 정렬 */
          justify-content: center; /* 수평 정렬 */
        }
      `}</style>
    </>
  );
}
