import { loginAtom } from '@/atoms/login';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { updateFcm } from '@/apis/mypage';
import { useMutation } from 'react-query';

export default function AlarmRoot() {
  const setFcm = useSetRecoilState(loginAtom);
  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
    const firebaseConfig = {
      apiKey: 'AIzaSyCbOsE40Ogrn0eFQATDWjXla_0nPx3v64Y',
      authDomain: 'churest-83cc0.firebaseapp.com',
      projectId: 'churest-83cc0',
      storageBucket: 'churest-83cc0.appspot.com',
      messagingSenderId: '743767892126',
      appId: '1:743767892126:web:8e150a2e414a6d42039b8f',
      measurementId: 'G-5007C6N4FN',
    };

    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);

    // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
    getToken(messaging, {
      vapidKey:
        'BLz5WdFuqDWHeJ5PCHiTqK-RyDSCFNJDQwhqk0kQrV3NyVyHfbP3mWVIMoN__Txyz6QxF8VBYG6h4nBYO-gz0BQ',
    })
      .then((currentToken) => {
        if (currentToken) {
          // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
          console.log('토큰', currentToken);
          setFcm((prev) => {
            return { ...prev, fcmToken: currentToken };
          });
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });

    // 메세지가 수신되면 역시 콘솔에 출력합니다.
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      const noti: any = payload.notification;
      if (payload.notification) {
        Swal.fire({
          position: 'center',
          imageUrl:
            'https://storage.googleapis.com/churest-bucket/project_image/alarm_navbar_img.png',
          title: noti.title,
          text: noti.body,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  useEffect(() => {
    onMessageFCM();
  }, []);

  return <></>;
}
