import React, { useState } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import {
  BtnShadowLinearComponent,
  ButtonComponent,
  Container,
  NotificationItemComponent,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const data = [
  {
    title: 'Allow Notifcations',
    key: 'allow',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym',
    value: true,
  },
  {
    title: 'Email Notifcations',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym',
    value: false,
    key: 'email',
  },
  {
    title: 'Order Notifcations',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym',
    value: false,
    key: 'order',
  },
  {
    title: 'General Notifcations',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed diam nonumym',
    value: true,
    key: 'general',
  },
];

const NotificationsScreen = ({ navigation }: any) => {
  const [notification, setNotification] = useState<any>({
    allow: true,
    email: false,
    order: false,
    general: true,
  });
  return (
    <Container bg={colors.background} back title="Notifications">
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 20,
          marginBottom: 0
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {data.map((_, index) => (
            <NotificationItemComponent
              key={index}
              title={_.title}
              description={_.description}
              value={notification[_.key]}
              onPress={val =>
                setNotification({ ...notification, [_.key]: val })
              }
            />
          ))}
        </View>

        <BtnShadowLinearComponent
          onPress={() => { }}
          title="Save settings"
        />
      </SectionComponent>
    </Container>
  );
};

export default NotificationsScreen;
