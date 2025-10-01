import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { auth, checkInitialNotification, getFCMToken, listenForegroundMessages, listenNotificationOpenedApp, onAuthStateChanged, requestUserPermission } from './firebase.config';
import AuthNavigator from './src/router/AuthNavigator';
import MainNavigator from './src/router/MainNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { createAndroidChannel } from './src/constants/channelNotifee';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWellcome, setIsWellcome] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWellcome(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function initMessaging() {
      const granted = await requestUserPermission();
      if (granted) {
        await getFCMToken();
      }
      listenForegroundMessages();
      // listenNotificationOpenedApp();
      // checkInitialNotification();
    }

    initMessaging();
    createAndroidChannel()
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

      <Toast />
    </NavigationContainer>
  );
};

export default App;
