import {
  ArrowRight2,
  Box,
  Camera,
  Card,
  Heart,
  Location,
  Logout,
  Notification,
  TransactionMinus,
  User,
} from 'iconsax-react-native';
import React from 'react';
import { Image, View } from 'react-native';
import avatar from '../../assests/images/avatar.png';
import {
  Container,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
const data = [
  {
    icon: <User color={colors.green} size={20} />,
    title: 'About me',
    screen:'AboutMeScreen'
  },
  {
    icon: <Box color={colors.green} size={20} />,
    title: 'My Orders',
    screen: 'MyOrderScreen'
  },
  {
    icon: <Heart color={colors.green} size={20} />,
    title: 'My Favorites',
    screen:''
  },
  {
    icon: <Location color={colors.green} size={20} />,
    title: 'My Address',
    screen: 'AddressScreen'
  },
  {
    icon: <Card color={colors.green} size={20} />,
    title: 'Credit Cards',
    screen:''
  },
  {
    icon: <TransactionMinus color={colors.green} size={20} />,
    title: 'Transactions',
    screen:''
  },
  {
    icon: <Notification color={colors.green} size={20} />,
    title: 'Notifications',
    screen:'NotificationsScreen'
  },
  {
    icon: <Logout color={colors.green} size={20} />,
    title: 'Sign out',
    screen:''
  },
];

const ProfileScreen = ({navigation}: any) => {
  return (
    <Container bg={colors.background}>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: '60%',
            zIndex: 1,
          }}
        >
          <View
            style={{
              marginBottom: 10,
              position: 'relative',
            }}
          >
            <Image
              source={avatar}
              style={{
                resizeMode: 'contain',
                borderRadius: 100,
              }}
            />
            <View
              style={{
                backgroundColor: colors.green,
                padding: 4,
                position: 'absolute',
                borderRadius: 100,
                bottom: 0,
                right: 10,
              }}
            >
              <Camera size={16} color={colors.background} variant="Bold" />
            </View>
          </View>
          <TextComponent
            text="Olivia Austin"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.bigText}
          />
          <TextComponent text="oliviaaustin@gmail.com" color={colors.text} />
        </View>
      </SectionComponent>

      <SectionComponent
        styles={{
          paddingTop: 100,
          backgroundColor: colors.background1,
          flex: 1,
          marginBottom: 0,
          paddingHorizontal:32
        }}
      >
        {data.map((_, index) => (
          <RowComponent
            key={index}
            justify="space-between"
            styles={{
              alignItems: 'center',
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate(_.screen)}
          >
            {_.icon}
            <SpaceComponent width={16}/>
            <TextComponent
              text={_.title}
              font={fontFamillies.poppinsSemiBold}
              flex={1}
            />
            <ArrowRight2 color={colors.text} size={20} />
          </RowComponent>
        ))}
      </SectionComponent>
    </Container>
  );
};

export default ProfileScreen;
