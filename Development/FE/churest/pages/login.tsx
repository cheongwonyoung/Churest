import RotatingEarth from '@/components/login/RotatingEarth';
import { ImBubble } from 'react-icons/im';
export default function login() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_API_KAKAO_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_API_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="login">
      <RotatingEarth />
      <div className="btnbox" onClick={loginKakao}>
        <ImBubble />
        <span className="label">카카오 로그인</span>
      </div>

      <style jsx>
        {`
          .login {
            height: 100vh;
            position: relative;
          }
          .btnbox {
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
            transition: 1s;
            transition-timing-function: linear;
          }
          .btnbox:hover {
            box-shadow: 10px 10px 10px;
          }
          .lgnbtn {
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
