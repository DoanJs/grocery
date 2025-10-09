import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { arrayUnion, doc, updateDoc } from '@react-native-firebase/firestore';
import { db } from '../../firebase.config';

export function useFCMToken(user: FirebaseAuthTypes.User) {
  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    const requestPermission = async () => {
      await messaging().requestPermission();
      await notifee.requestPermission();
    };

    const getAndSaveToken = async () => {
      try {
        await requestPermission();
        const token = await messaging().getToken();
        if (!token) return;

        const storedToken = await AsyncStorage.getItem('fcmToken');
        if (storedToken !== token) {
          await updateDoc(doc(db, 'users', user.uid), {
            tokens: arrayUnion(token),
          });
          await AsyncStorage.setItem('fcmToken', token);
          console.log('🔥 Token mới:', token);
        }
      } catch (err) {
        console.log('❌ Lỗi get token:', err);
      }
    };

    const listenForegroundMessages = () => {
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log('📩 Thông báo foreground:', remoteMessage);

        // Hiển thị thông báo bằng Notifee
        await notifee.displayNotification({
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
          },
        });
      });
      return unsubscribe;
    };

    const checkInitialNotification = async () => {
      const initialMessage = await messaging().getInitialNotification();
      if (initialMessage) {
        console.log('🚀 App mở từ thông báo:', initialMessage.notification);
        // Ví dụ: điều hướng đến màn hình cụ thể
        // navigation.navigate('ChatScreen', { userId: ... });
      }
    };

    // Tạo channel Notifee nếu chưa có
    const createDefaultChannel = async () => {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    };

    // Thực thi
    createDefaultChannel();
    getAndSaveToken();
    checkInitialNotification();

    const unsubscribeForeground = listenForegroundMessages();

    // Lắng nghe token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
      if (!isMounted) return;
      console.log('♻️ Token refresh:', newToken);
      await updateDoc(doc(db, 'users', user.uid), {
        tokens: arrayUnion(newToken),
      });
      await AsyncStorage.setItem('fcmToken', newToken);
    });

    return () => {
      isMounted = false;
      unsubscribeForeground();
      unsubscribeTokenRefresh();
    };
  }, [user]);
}
