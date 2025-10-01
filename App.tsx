import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { auth, getFCMToken, onAuthStateChanged, requestUserPermission } from './firebase.config';
import AuthNavigator from './src/router/AuthNavigator';
import MainNavigator from './src/router/MainNavigator';
import SplashScreen from './src/screens/SplashScreen';

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
      // listenForegroundMessages();
      // listenNotificationOpenedApp();
      // checkInitialNotification();
    }

    initMessaging();
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
