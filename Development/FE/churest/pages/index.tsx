import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import RotatingEarth from '@/components/login/RotatingEarth';
import { ImBubble } from 'react-icons/im';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const REST_API_KEY = process.env.NEXT_PUBLIC_API_KAKAO_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_API_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const showAlert = (text: string) => {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  useEffect(() => {
    showAlert('좌측 상단의 알림 허용 버튼을 눌러주세요.');
  });
  return (
    <div className="login">
      <p className="login-text">Churest</p>
      <RotatingEarth />
      <div className="button-box" onClick={loginKakao}>
        <ImBubble />
        <span className="label">카카오 로그인</span>
      </div>

      <style jsx>
        {`
          .login {
            height: 100vh;
            position: relative;
            overflow: hidden;
            background-image: url('https://images.pexels.com/photos/627823/pexels-photo-627823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
            background-size: cover;
            cursor: pointer;
            text-align: center;
          }
          .login-text {
            position: absolute;
            left: -84px;
            top: 15%;
            font-weight: bold;
            text-align: center;
            font-size: 29vw;
            color: #4a498e;
          }
          .button-box {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 250px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fee500;
            transform: translate(-50%, -50%);
            border-radius: 12px;
            gap: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 3px 3px 3px;
            transition: all 0.3s;
          }
          .button-box:hover {
            box-shadow: 10px 10px 10px;
          }
          .login-btn {
            width: 20%;
          }
          .label {
            color: #000000 85%;
          }
        `}
      </style>
    </div>
  );
}
