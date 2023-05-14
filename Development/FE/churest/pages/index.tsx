import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import RotatingEarth from '@/components/login/RotatingEarth';
import { ImBubble } from 'react-icons/im';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const REST_API_KEY = process.env.NEXT_PUBLIC_API_KAKAO_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_API_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="login" onClick={() => router.push('/login')}>
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
            background: conic-gradient(
              from 0deg at 50% 50%,
              rgba(254, 255, 190, 0) 0deg,
              rgba(253, 255, 138, 0.99) 170.63deg,
              rgba(254, 255, 190, 0) 360deg
            );
            cursor: pointer;
          }
          .login-text {
            position: absolute;
            left: -84px;
            top: 100px;
            font-weight: bold;
            text-align: center;
            font-size: 500px;
            color: #23225b;
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
