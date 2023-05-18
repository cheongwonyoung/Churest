import { loginAtom } from '@/atoms/login';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
type Props = {
  fcmToken: string;
};

export default function AlarmRoot({ fcmToken }: Props) {
  const setFcm = useSetRecoilState(loginAtom);
  setFcm((prev) => {
    return { ...prev, fcmToken: fcmToken };
  });

  return <div></div>;
}
