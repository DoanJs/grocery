import notifee from '@notifee/react-native';

export const createAndroidChannel = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: 4, // HIGH → heads-up
  });
}

export const displayNotification = async (title: string, body: string) => {
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: 'default',
        importance: 4, // HIGH → heads-up
        smallIcon: 'ic_notification', // drawable icon
      },
      ios: {
        sound: 'default',
      },
    });
  }