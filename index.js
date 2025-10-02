/**
 * @format
 */
import notifee, { EventType } from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { Linking } from "react-native";
getApp()

notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.PRESS) {
    console.log('User pressed notification (foreground)');
    Linking.openURL('');
  }
});

// phải đặt ở đây, để luôn chạy kể cả khi app kill
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Background Event:', type, detail);

  if (type === EventType.PRESS) {
    console.log('User opened app from notification');
  }

  if (type === EventType.ACTION_PRESS) {
    console.log('User pressed action:', detail.pressAction.id);
  }

  if (type === EventType.DISMISSED) {
    console.log('Notification dismissed:', detail.notification?.id);
  }
});
AppRegistry.registerComponent(appName, () => App);
