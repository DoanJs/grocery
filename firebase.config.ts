import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
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
  requestPermission
} from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  SignInResponse,
} from '@react-native-google-signin/google-signin';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Logo from './src/assets/images/logo.png';

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
  console.log(fcmtoken)
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


export async function saveMessage(remoteMessage: any) {
  const oldMessages = JSON.parse(await AsyncStorage.getItem('messages') || '[]');

  const message = {
    id: remoteMessage.messageId || String(Date.now()),
    sender: remoteMessage.sender || 'Người lạ',
    text: remoteMessage.text || '',
    avatar: remoteMessage.avatar,
    conversationId: remoteMessage.conversationId || 'default',
    timestamp: Date.now(),
  };

  const newMessages = [...oldMessages, message];
  await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
  return newMessages;
}


/**
 * Lắng nghe notification khi app foreground
 */
const listenForegroundMessages = async () => {
  onMessage(messaging, async remoteMessage => {
    const { title, body, id, type }: any = remoteMessage.data;
    const messages = await saveMessage(remoteMessage);
    // Lấy 5 tin nhắn cuối để hiển thị
    const lines = messages.slice(-5).map(msg => `${msg.sender}: ${msg.text}`);
    await notifee.cancelAllNotifications()
    // Hiển thị thông báo
    await notifee.displayNotification({
      id: String(Date.now()),
      // title: title ?? 'Thông báo',
      // body: body ?? '',
      title: `${messages.length} tin nhắn mới`,
      body: lines.join('\n'),
      data: remoteMessage.data ?? {},
      android: {
        channelId: 'default',
        smallIcon: 'ic_notification_transparent', // 👈 tên file bạn đã đặt
        color: '#FF0000', // 👈 đổi màu accent (màu nền của icon)
        importance: AndroidImportance.HIGH, // vẫn giữ
        largeIcon: Logo, // logo app, hiển thị to bên phải
        sound: 'default',
        pressAction: {
          id: 'default',
        },
        style: { type: AndroidStyle.INBOX, lines: lines },
      },
    });
  });
};
/**
 * Khi user click thông báo lúc app đang quit
 */
const checkInitialNotification = async () => {
  const remoteMessage = await getInitialNotification(messaging);
  if (remoteMessage) {
    const { data } = remoteMessage;
    if (data && data.type === 'review') {
      Linking.openURL(`grocery://product/review/${data.id}`);
    }
  }
};

export {
  auth,
  checkInitialNotification,
  createUserWithEmailAndPassword,
  db,
  getFCMToken,
  listenForegroundMessages, messaging, onAuthStateChanged,
  requestUserPermission,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut
};

