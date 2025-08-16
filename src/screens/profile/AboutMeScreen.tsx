import { Call, Lock, Sms, User } from 'iconsax-react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import {
  ButtonComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import { View } from 'react-native';

const data = [
  {
    icon: <User size={24} color={colors.text} />,
    value: 'Russell Austin',
  },
  {
    icon: <Sms size={24} color={colors.text} />,
    value: 'russell.partner@gmail.com',
  },
  {
    icon: <Call size={24} color={colors.text} />,
    value: '+1  202  555  0142 ',
  },
];
const AboutMeScreen = () => {
  const [value, setValue] = useState<any>({
    'Current password': '',
    'New password': '',
    'Confirm password': '',
  });
  return (
    <Container bg={colors.background} back title="About me">
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
            paddingVertical: 20,
          }}
        >
          <TextComponent
            text="Personal Details"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.thinTitle}
          />

          {data.map((_, index) => (
            <RowComponent
              key={index}
              styles={{
                backgroundColor: colors.background,
                padding: 16,
                borderRadius: 5,
                marginVertical: 4,
              }}
            >
              {_.icon}
              <SpaceComponent width={10} />
              <TextComponent
                text={_.value}
                color={colors.text}
                font={fontFamillies.poppinsMedium}
                size={sizes.bigText}
              />
            </RowComponent>
          ))}

          <SpaceComponent height={20} />

          <TextComponent
            text="Change Password"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.thinTitle}
          />
          <SpaceComponent height={16} />

          {['Current password', 'New password', 'Confirm password'].map(
            (_, index) => (
              <InputComponent
                key={index}
                styles={{
                  backgroundColor: colors.background,
                  paddingVertical: 12,
                  paddingHorizontal: 26,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                prefix={<Lock size={20} color={colors.text} />}
                placeholder={_}
                placeholderTextColor={colors.text}
                color={colors.background}
                value={value[_]}
                isPassword={index === 1 ? true : false}
                onChange={val => setValue({ ...value, [_]: val })}
              />
            ),
          )}
        </SectionComponent>

        <SectionComponent>
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
      </View>
    </Container>
  );
};

export default AboutMeScreen;
