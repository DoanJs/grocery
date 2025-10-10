import { getDownloadURL, getStorage, putFile, ref } from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { auth, signOut } from '../../../firebase.config';
import {
  BtnShadowLinearComponent,
  Container,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';

interface ImageType {
  uri: string | undefined
  progress: number
  url: string | null
  status: string
}
const LogOutScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');

  // upload mutiple image
  const [images, setImages] = useState<ImageType[]>([]); // [{uri, progress, url, status}]
  const [uploading, setUploading] = useState(false);

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
  const pickImages = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0, // ✅ cho phép chọn nhiều ảnh
    });

    if (result.didCancel || !result.assets?.length) return;

    const selected = result.assets.map(asset => ({
      uri: asset.uri,
      progress: 0,
      url: null,
      status: 'pending',
    }));
    setImages(selected);
  };

  const uploadAll = async () => {
    if (!images.length) return;
    setUploading(true);

    const storage = getStorage();

    // 🔹 Upload từng ảnh tuần tự (nếu muốn song song thì Promise.all)
    for (const [index, img] of images.entries()) {
      const fileName = img.uri?.substring(img.uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${fileName}`);

      setImages(prev =>
        prev.map((item, i) =>
          i === index ? { ...item, status: 'uploading', progress: 0 } : item
        )
      );

      try {
        const task = putFile(imageRef, img.uri as string);

        task.on('state_changed', snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImages(prev =>
            prev.map((item, i) =>
              i === index ? { ...item, progress: Math.round(progress) } : item
            )
          );
        });

        await task;

        const url = await getDownloadURL(imageRef);

        setImages(prev =>
          prev.map((item, i) =>
            i === index
              ? { ...item, url, progress: 100, status: 'done' }
              : item
          )
        );
      } catch (error) {
        console.error('❌ Upload failed:', error);
        setImages(prev =>
          prev.map((item, i) =>
            i === index ? { ...item, status: 'error' } : item
          )
        );
      }
    }

    setUploading(false);
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

      <SectionComponent>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button title="📸 Chọn ảnh" onPress={pickImages} />
          <Button
            title="⬆️ Upload tất cả"
            onPress={uploadAll}
            disabled={!images.length || uploading}
          />
        </View>

        <ScrollView style={{ marginTop: 20, width: '100%' }}>
          {images.map((img, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: img.uri }} style={styles.image} />
              <View style={styles.info}>
                {img.status === 'uploading' && (
                  <View style={styles.progressContainer}>
                    <ActivityIndicator size="small" color="#007bff" />
                    <Text style={styles.progressText}>{img.progress}%</Text>
                  </View>
                )}
                {img.status === 'done' && (
                  <>
                    <Text style={styles.successText}>✅ Hoàn tất</Text>
                    <Text
                      style={styles.linkText}
                      numberOfLines={1}
                      ellipsizeMode="middle">
                      {img.url}
                    </Text>
                  </>
                )}
                {img.status === 'error' && (
                  <Text style={{ color: 'red' }}>❌ Lỗi upload</Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </SectionComponent>
    </Container>
  );
};

export default LogOutScreen;
const styles = StyleSheet.create({
  // container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  // progressContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 8,
  // },
  // progressText: { marginLeft: 8, fontSize: 16 },
  downloadContainer: { marginTop: 16, alignItems: 'center' },
  // successText: { color: 'green', fontWeight: 'bold', marginBottom: 4 },
  // linkText: { fontSize: 12, color: '#007bff', textAlign: 'center' },
  imageUploaded: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  progressContainer: { flexDirection: 'row', alignItems: 'center' },
  progressText: { marginLeft: 8, fontSize: 14 },
  successText: { color: 'green', fontWeight: 'bold' },
  linkText: { fontSize: 10, color: '#007bff', marginTop: 4 },
});