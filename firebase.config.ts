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
import { arrayUnion, doc, getDoc, getFirestore, updateDoc } from '@react-native-firebase/firestore';
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
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

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
      updateToken(token)
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
      await updateDoc(
        doc(db, 'users', user?.uid as string),
        {
          tokens: arrayUnion(token)
        }
      );
    }
  }
};

/**
 * Lắng nghe notification khi app foreground
 */
const listenForegroundMessages = async () => {
  onMessage(messaging, async remoteMessage => {
    console.log('📩 Foreground notification:', remoteMessage);
    // Alert.alert(
    //   remoteMessage.notification?.title ?? 'Thông báo',
    //   remoteMessage.notification?.body ?? '',
    // );
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is listenForegroundMessages 👋'
    });
    
  });
};

/**
 * Khi user click thông báo lúc app đang background
 */
const listenNotificationOpenedApp = async () => {
  onNotificationOpenedApp(messaging, remoteMessage => {
    console.log('📩 Opened from background:', remoteMessage.notification);
  });
};

/**
 * Khi user click thông báo lúc app đang quit
 */
const checkInitialNotification = async () => {
  const remoteMessage = await getInitialNotification(messaging);
  if (remoteMessage) {
    console.log('📩 Opened from quit:', remoteMessage.notification);
  }
};

/**
 * Xử lý thông báo background (Android)
 */
setBackgroundMessageHandler(messaging, async remoteMessage => {
  console.log('📩 Background notification:', remoteMessage);
});

export {
  auth,
  createUserWithEmailAndPassword,
  db,
  getFCMToken,
  onAuthStateChanged,
  requestUserPermission,
  listenForegroundMessages,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
  listenNotificationOpenedApp,
  checkInitialNotification
};
