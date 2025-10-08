import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import {
  auth,
  checkInitialNotification,
  getFCMToken,
  listenForegroundMessages,
  onAuthStateChanged,
  requestUserPermission,
} from './firebase.config';
import linking from './src/linking';
import AuthNavigator from './src/router/AuthNavigator';
import MainNavigator from './src/router/MainNavigator';
import SplashScreen from './src/screens/SplashScreen';
import notifee, { AndroidImportance } from '@notifee/react-native';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWellcome, setIsWellcome] = useState(false);

  // Khi app khởi chạy (ví dụ trong App.tsx)
  useEffect(() => {
    notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH, // 👈 cực kỳ quan trọng
      vibration: true,
      sound: 'default', // 👈 thêm dòng này để Android cho heads-up popup
    });
  }, []);

  useEffect(() => {
    const checkNotificationLaunch = async () => {
      const stored = await AsyncStorage.getItem('last_notification_data');
      if (stored) {
        const data = JSON.parse(stored);
        await AsyncStorage.removeItem('last_notification_data'); // clear sau khi đọc

        // ✅ Điều hướng tới trang chi tiết
        if (data && data.type === 'review') {
          setTimeout(() => {
            Linking.openURL(`grocery://product/review/${data.id}`);
          }, 500); // delay để đảm bảo NavigationContainer đã mount
        }
      }
    };

    checkNotificationLaunch();
  }, []);

  useEffect(() => {
    async function initMessaging() {
      const granted = await requestUserPermission();
      if (granted) {
        await getFCMToken();
      }
      listenForegroundMessages();
      checkInitialNotification();
    }

    initMessaging();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWellcome(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    });
  }, [isLoading]);

  return (
    <NavigationContainer linking={linking}>
      {isWellcome ? (
        <SplashScreen />
      ) : isLoading ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;
