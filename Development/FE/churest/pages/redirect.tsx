import { API_login } from '@/apis/login';
import { loginAtom } from '@/atoms/login';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

export default function Redirect() {
  const router = useRouter();
  const code = router.query.code;

  const setMyInfo = useSetRecoilState(loginAtom);

  const { refetch } = useQuery('login', () => API_login(code), {
    onSuccess(data) {
      setMyInfo({ id: data.data.memberId, accessToken: data.data.accessToken });
      router.push('/');
    },
    onError(err) {
      console.log(err);
    },
    enabled: false,
  });
  useEffect(() => {
    // if (typeof code === 'string') refetch();
  }, [code, refetch]);
  return <div>로그인하는중학교 ㅋ</div>;
}
