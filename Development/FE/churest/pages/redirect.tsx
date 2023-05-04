import { API_login } from '@/apis/login';
import { loginAtom } from '@/atoms/login';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function Redirect() {
  const router = useRouter();
  const code = router.query.code;

  const [myInfo, setMyInfo] = useRecoilState(loginAtom);

  const { refetch } = useQuery('login', () => API_login(code), {
    onSuccess(data) {
      // 미가입자일 때
      if (data.data.nickname == '' || data.data.nickname == null) {
        setMyInfo({
          ...myInfo,
          id: data.data.memberId,
          accessToken: data.data.accessToken,
        });
        console.log('당신은 미가입자');
        router.push('signup');
      }
      // 가입자일 때
      else {
        setMyInfo({
          ...myInfo,
          id: data.data.memberId,
          accessToken: data.data.accessToken,
          nickname: data.data.nickname,
        });
        console.log('당신은 가입자');
        console.log('당신은 가입자');
        router.push('/');
      }
      console.log('당신은 미가입자도 가입자도 아니야');
      console.log(data);
    },
    onError(err) {
      console.log('ㅋㅋㅋㅋ', err);
    },
    enabled: false,
  });
  useEffect(() => {
    if (typeof code === 'string') refetch();
  }, [code, refetch]);
  return <div>로그인하는중학교 ㅋ</div>;
}
