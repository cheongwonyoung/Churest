import { loginAtom } from '@/atoms/login';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
type Props = {
  fcmToken: string;
  message: {
    title: string;
    body: string;
  };
};

export default function AlarmRoot({ fcmToken, message }: Props) {
  const setFcm = useSetRecoilState(loginAtom);
  setFcm((prev) => {
    return { ...prev, fcmToken: fcmToken };
  });

  return (
    <div>
      <p>{message.title}</p>
      <p>{message.body}</p>
    </div>
  );
}
