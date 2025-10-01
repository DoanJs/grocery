import notifee, { EventType } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  auth,
  checkInitialNotification,
  getFCMToken,
  listenForegroundMessages,
  listenNotificationOpenedApp,
  onAuthStateChanged,
  requestUserPermission,
} from './firebase.config';
import AuthNavigator from './src/router/AuthNavigator';
import MainNavigator from './src/router/MainNavigator';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWellcome, setIsWellcome] = useState(false);

  useEffect(() => {
    async function initMessaging() {
      const granted = await requestUserPermission();
      if (granted) {
        await getFCMToken();
      }
      listenForegroundMessages();
      listenNotificationOpenedApp();
      checkInitialNotification();
    }

    initMessaging();
  }, []);

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      console.log('Foreground Event:', type, detail);

      if (type === EventType.PRESS) {
        console.log('User pressed notification (foreground)');
      }
    });

    return () => {
      unsubscribe(); // cleanup
    };
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
    <NavigationContainer>
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
