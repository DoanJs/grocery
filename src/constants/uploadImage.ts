import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

export const uploadImage = async () => {
    // Chọn ảnh
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.didCancel || !result.assets?.length) return;

    const uri = result.assets[0].uri as string;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    try {
        // 2. Tạo reference đến nơi lưu trữ
        const reference = storage().ref(`images/${filename}`);

        // 3. Upload ảnh (putFile)
        await reference.putFile(uri);

        // 4. Lấy link download
        const url = await reference.getDownloadURL();

        console.log('✅ Uploaded successfully:', url);
        return {
            uri, url
        }

    } catch (error) {
        console.error('❌ Upload failed:', error);
    }
};
