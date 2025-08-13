import React, { useState } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import {
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
        <Shadow
          distance={5}
          startColor={`${colors.primaryLight}d8`}
          endColor={`${colors.primary}10`}
          offset={[0, 4]}
          style={{
            width: '100%',
            marginBottom: 16,
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.primaryDark, colors.primary]}
            style={{ borderRadius: 5 }}
          >
            <ButtonComponent
              color="transparent"
              onPress={() => {}}
              text="Save settings"
              textStyles={{
                color: colors.background,
                fontFamily: fontFamillies.poppinsMedium,
                fontSize: sizes.bigText,
                marginLeft: 20,
              }}
              styles={{
                flexDirection: 'row',
                justifyContent: 'center',
                borderRadius: 5,
              }}
            />
          </LinearGradient>
        </Shadow>
      </SectionComponent>
    </Container>
  );
};

export default NotificationsScreen;
