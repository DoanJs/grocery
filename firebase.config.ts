import notifee, { AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from '@react-native-firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from '@react-native-firebase/firestore';
import {
  AuthorizationStatus,
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  requestPermission,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  SignInResponse,
} from '@react-native-google-signin/google-signin';
import { PermissionsAndroid, Platform } from 'react-native';

const auth = getAuth();
const db = getFirestore();
const app = getApp();
const messaging = getMessaging(app);

GoogleSignin.configure({
  webClientId:
    '225425706491-qd8o8iftv938l2c9onale56v0p4crm7c.apps.googleusercontent.com',
});

const signInWithGoogle = async () => {
  // B1: clear session cũ
  // await GoogleSignin.signOut();
  // await GoogleSignin.revokeAccess();
  // await signOut(auth);

  // // B2: đảm bảo Google Play Services ok
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  // Step 1 - Google sign in (OAuth)
  const userInfo: SignInResponse = await GoogleSignin.signIn();

  // Step 2 - Create a Google credential with the token
  const googleCredential = GoogleAuthProvider.credential(
    userInfo.data?.idToken,
  );

  // Step 3 - Sign-in the user to Firebase with the credential
  return signInWithCredential(auth, googleCredential);
};

/**
 * Xin quyền nhận thông báo (Android 13+ và iOS)
 */
const requestUserPermission = async () => {
  if (Platform.OS === 'ios') {
    const authStatus = await requestPermission(messaging);
    return (
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL
    );
  }

  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return true;
};

/**
 * Lấy FCM Token của thiết bị
 */
const getFCMToken = async () => {
  const fcmtoken = await AsyncStorage.getItem('fcmtoken');

  if (!fcmtoken) {
    const token = await getToken(messaging);
    if (token) {
      await AsyncStorage.setItem('fcmtoken', token);
      updateToken(token);
    }
    return token;
  }
};

/**
 * Update FCM Token của thiết bị vào user
 */
const updateToken = async (token: string) => {
  const user = auth.currentUser;

  const docSnap = await getDoc(doc(db, 'users', user?.uid as string));
  if (docSnap.exists()) {
    const data = docSnap.data();

    if (!data?.tokens || !data?.tokens.includes(token)) {
      await updateDoc(doc(db, 'users', user?.uid as string), {
        tokens: arrayUnion(token),
      });
    }
  }
};

/**
 * Lắng nghe notification khi app foreground
 */
const listenForegroundMessages = async () => {
  onMessage(messaging, async remoteMessage => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    // Hiển thị thông báo
    await notifee.displayNotification({
      title: 'Thông báo',
      body: remoteMessage.notification?.body ?? '',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  });
};

/**
 * Khi user click thông báo lúc app đang background
 */
const listenNotificationOpenedApp = async () => {
  onNotificationOpenedApp(messaging, async remoteMessage => {
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    //   importance: AndroidImportance.HIGH,
    // });
    // // Hiển thị thông báo
    // await notifee.displayNotification({
    //   title: 'Background',
    //   body: remoteMessage.notification?.body ?? '',
    //   android: {
    //     channelId,
    //     pressAction: {
    //       id: 'default',
    //     },
    //   },
    // });
    console.log('background');
  });
};

/**
 * Khi user click thông báo lúc app đang quit
 */
const checkInitialNotification = async () => {
  const remoteMessage = await getInitialNotification(messaging);
  if (remoteMessage) {
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    //   importance: AndroidImportance.HIGH,
    // });
    // // Hiển thị thông báo
    // await notifee.displayNotification({
    //   title: 'Kill',
    //   body: remoteMessage.notification?.body ?? '',
    //   android: {
    //     channelId,
    //     pressAction: {
    //       id: 'default',
    //     },
    //   },
    // });
    console.log('Kill');
  }
};

/**
 * Xử lý thông báo background (Android)
 */
setBackgroundMessageHandler(messaging, async remoteMessage => {
  console.log('📩 Background notification:', remoteMessage);
  // const channelId = await notifee.createChannel({
  //   id: 'default',
  //   name: 'Default Channel',
  //   importance: AndroidImportance.HIGH,
  // });
  // // Hiển thị thông báo
  // await notifee.displayNotification({
  //   title: 'background && Kill',
  //   body: remoteMessage.notification?.body ?? '',
  //   android: {
  //     channelId,
  //     pressAction: {
  //       id: 'default',
  //     },
  //   },
  // });
});

export {
  auth,
  checkInitialNotification,
  createUserWithEmailAndPassword,
  db,
  getFCMToken,
  listenForegroundMessages,
  listenNotificationOpenedApp,
  onAuthStateChanged,
  requestUserPermission,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
};
