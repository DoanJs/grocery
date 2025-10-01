import notifee, { AndroidImportance } from '@notifee/react-native';

// Hàm hiển thị thông báo
export async function onDisplayNotification() {
  // Tạo channel cho Android
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Hiển thị thông báo
  await notifee.displayNotification({
    title: 'Xin chào 👋',
    body: 'Đây là thông báo đầu tiên từ Notifee!',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
