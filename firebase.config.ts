import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import { GoogleSignin, SignInResponse } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';

const auth = getAuth();
const db = getFirestore()

GoogleSignin.configure({
  webClientId: '225425706491-qd8o8iftv938l2c9onale56v0p4crm7c.apps.googleusercontent.com',
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
  const googleCredential = GoogleAuthProvider.credential(userInfo.data?.idToken);

  // Step 3 - Sign-in the user to Firebase with the credential
  return signInWithCredential(auth, googleCredential);
};

export {
  auth,db,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithGoogle
};

// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {
//   GoogleSignin,
//   SignInResponse,
// } from '@react-native-google-signin/google-signin';

// // Cấu hình Google Signin
// GoogleSignin.configure({
//   webClientId:
//     '225425706491-qd8o8iftv938l2c9onale56v0p4crm7c.apps.googleusercontent.com', // lấy trong Firebase console
// });

// // Google Sign-In
// const signInWithGoogle = async () => {
//   // Step 1: Google sign in
//   const userInfo: SignInResponse = await GoogleSignin.signIn();
//   if (!userInfo.data?.idToken) {
//     throw new Error('Google Sign-In failed: idToken is missing');
//   }

//   // Step 2: Credential cho Firebase
//   const googleCredential = auth.GoogleAuthProvider.credential(
//     userInfo.data.idToken,
//   );

//   // Step 3: Đăng nhập Firebase
//   return auth().signInWithCredential(googleCredential);
// };

// // Xuất ra dùng trong app
// export { auth, firestore, signInWithGoogle };
