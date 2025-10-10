import { getDownloadURL, getStorage, putFile, ref } from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { auth, signOut } from '../../../firebase.config';
import {
  BtnShadowLinearComponent,
  Container,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const LogOutScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  const handleLogout = async () => {
    setIsLoading(true);

    await signOut(auth);
    await GoogleSignin.signOut();
    await GoogleSignin.revokeAccess()
    setIsLoading(false);
  };

  const handleUpload = async () => {
    // 1. Chọn ảnh từ thư viện
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.didCancel || !result.assets?.length) return;

    const uri = result.assets[0].uri as string;
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    // 🔹 2. Lấy instance của storage
    const storage = getStorage();
    // 🔹 3. Tạo reference theo modular API
    const reference = ref(storage, `images/${fileName}`);

    setImageUri(uri)
    setIsLoading(true)
    setProgress(0)


    try {
      // 🔹 3. Upload file theo cú pháp mới -  putFile có thể lắng nghe sự kiện tiến trình upload
      const task = putFile(reference, uri);

      // Theo dõi tiến trình
      task.on('state_changed', snapshot => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percent));
      });

      await task; // Chờ upload hoàn tất

      // 🔹 4. Lấy URL download (cú pháp mới)
      const downloadURL = await getDownloadURL(reference);
      setDownloadURL(downloadURL);
      setIsLoading(false)
      console.log('✅ Uploaded successfully:', downloadURL);
    } catch (error) {
      console.error('❌ Upload failed:', error);
    }
  };
  return (
    <Container bg={colors.background} back title="Log Out">
      <SectionComponent>
        <BtnShadowLinearComponent
          isLoading={isLoading}
          title="Log Out"
          onPress={handleLogout}
        />
      </SectionComponent>
      <SectionComponent>
        <BtnShadowLinearComponent
          isLoading={isLoading}
          title="Upload File"
          onPress={handleUpload}
        />
      </SectionComponent>

      <SectionComponent>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="cover" />
        )}

        {isLoading && (
          <View style={styles.progressContainer}>
            <ActivityIndicator size="small" color="#007bff" />
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}

        {downloadURL && (
          <View style={styles.downloadContainer}>
            <Text style={styles.successText}>✅ Upload thành công!</Text>
            <Text style={styles.linkText}>{downloadURL}</Text>
            <Image source={{ uri: downloadURL }} style={styles.imageUploaded} resizeMode="cover" />
          </View>
        )}
      </SectionComponent>
    </Container>
  );
};

export default LogOutScreen;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressText: { marginLeft: 8, fontSize: 16 },
  downloadContainer: { marginTop: 16, alignItems: 'center' },
  successText: { color: 'green', fontWeight: 'bold', marginBottom: 4 },
  linkText: { fontSize: 12, color: '#007bff', textAlign: 'center' },
  imageUploaded: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
});