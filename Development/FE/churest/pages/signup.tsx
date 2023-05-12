import { useState } from 'react';
// import StepFaceResult from '../components/signUp/StepFaceResult';
import { signUp } from '@/apis/login';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import router from 'next/router';
import StepAvatar from '@/components/signup/StepAvatar';
import StepNickname from '@/components/signup/StepNickname';
import StepBird from '@/components/signup/StepBird';
import StepBirdname from '@/components/signup/StepBirdname';
import Swal from 'sweetalert2';
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
    const nameStr = e.target.value.substr(0, 6);
    setNickname(nameStr);
  };

  // 새 정보
  const [pickedBird, setPickedBird] = useState('');
  const handlePickedBird = (e: any) => {
    setPickedBird(e.target.id);
  };

  // 새 닉네임 정보
  const [birdname, setBirdname] = useState('');
  const getBirdname = (e: any) => {
    const nameStr = e.target.value.substr(0, 6);
    setBirdname(nameStr);
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
            getNickname={getNickname}
            pickedAvatar={pickedAvatar}
            plusPage={plusPage}
            nickname={nickname}
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
            getBirdname={getBirdname}
            birdname={birdname}
            handlePickedBird={handlePickedBird}
            pickedBird={pickedBird}
            plusPage={plusPage}
            signUpSubmit={signUpSubmit}
          />
        );
    }
  };

  const token: string = useRecoilValue(loginAtom).accessToken;
  const memberId: Number | null = useRecoilValue(loginAtom).id;

  const showAlert = (text: string) => {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: text,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const signUpSubmit = () => {
    console.log('서브밋 시작');

    const avatarId = pickedAvatar.replace(/[^0-9]/g, '');
    const birdId = pickedBird.replace(/[^0-9]/g, '');
    console.log('변환 완' + avatarId + ' ' + birdId);
    console.log(pickedAvatar + ' ' + pickedBird);

    let joinInfo = {
      avatarId: Number(avatarId),
      birdId: Number(birdId),
      birdNickname: birdname,
      memberId: memberId,
      nickname: nickname,
    };
    goSignUp.mutate(joinInfo);
  };

  const [userInfo, setUserInfo] = useRecoilState(loginAtom);

  const goSignUp = useMutation((joinInfo: any) => signUp(joinInfo), {
    onSuccess(data) {
      console.log('회원가입성공');
      console.log(data.data);
      setUserInfo({
        ...userInfo,
        avatarId: data.data.avatarId,
        nickname: data.data.nickname,
      });
      console.log(userInfo);
      router.push('/');
    },
  });

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
