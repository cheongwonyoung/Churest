importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: 'AIzaSyCbOsE40Ogrn0eFQATDWjXla_0nPx3v64Y',
  authDomain: 'churest-83cc0.firebaseapp.com',
  projectId: 'churest-83cc0',
  storageBucket: 'churest-83cc0.appspot.com',
  messagingSenderId: '743767892126',
  appId: '1:743767892126:web:8e150a2e414a6d42039b8f',
  measurementId: 'G-5007C6N4FN',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});

