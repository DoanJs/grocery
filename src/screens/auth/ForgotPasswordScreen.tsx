import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  BtnShadowLinearComponent,
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

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  return (
    <Container bg={colors.background1} back title="Password Recovery">
      <SectionComponent
        styles={{
          flex: 1,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '35%',
          }}
        >
          <TextComponent
            text="Forgot Password"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.title}
          />
          <TextComponent
            styles={{
              textAlign: 'center',
              width: '80%',
            }}
            text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy"
            font={fontFamillies.poppinsMedium}
            size={sizes.bigText}
            color={colors.text}
          />
        </View>

        <InputComponent
          placeholder="Email Address"
          placeholderTextColor={colors.text}
          styles={{
            backgroundColor: colors.background,
            paddingVertical: 12,
            paddingHorizontal: 26,
            borderRadius: 5,
            width: '100%',
          }}
          prefix={<Fontisto name="email" size={20} color={colors.text} />}
          color={colors.background}
          value={email}
          allowClear
          textStyles={{
            color: colors.text,
          }}
          onChange={val => setEmail(val)}
        />

        <RowComponent justify="center">
          <TextComponent
            text="Do not have email ? "
            font={fontFamillies.poppinsMedium}
            color={colors.text}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('VerifyNumberScreen')}
          >
            <TextComponent
              text="verify phone"
              font={fontFamillies.poppinsMedium}
              color={colors.link}
            />
          </TouchableOpacity>
        </RowComponent>

        <SpaceComponent height={10} />

        <BtnShadowLinearComponent
          title='Send link'
          onPress={() => navigation.navigate('OTPScreen')}
        />
        
      </SectionComponent>
    </Container>
  );
};

export default ForgotPasswordScreen;
