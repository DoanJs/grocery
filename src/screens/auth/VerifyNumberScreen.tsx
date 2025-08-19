import { ArrowDown2 } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import usaFlag from '../../assests/images/usaFlag.png';
import {
  BtnShadowLinearComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const VerifyNumberScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('2055550145');
  return (
    <Container bg={colors.background1} back title="Verify Number">
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
            text="Verify your number"
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

        <RowComponent
          styles={{
            backgroundColor: colors.background,
            height: 56,
            paddingHorizontal: 10,
          }}
        >
          <RowComponent
            styles={{
              paddingHorizontal: 10,
            }}
          >
            <Image source={usaFlag} />
            <TextComponent
              text="+1"
              size={sizes.bigText}
              font={fontFamillies.poppinsMedium}
              styles={{
                marginHorizontal: 4,
              }}
            />
            <ArrowDown2 size={16} color={colors.text} variant="Bold" />
          </RowComponent>

          <View
            style={{
              borderLeftWidth: 2,
              borderLeftColor: colors.border,
              height: '100%',
            }}
          />

          <InputComponent
            placeholder="Number phone"
            placeholderTextColor={colors.text}
            styles={{
              backgroundColor: colors.background,
              paddingVertical: 12,
              paddingHorizontal: 26,
              borderRadius: 5,
              marginBottom: 0,
              flex: 1,
            }}
            color={colors.background}
            value={phone}
            allowClear
            textStyles={{
              color: colors.text2,
              fontFamily: fontFamillies.poppinsMedium,
              fontSize: sizes.bigText,
            }}
            onChange={val => setPhone(val)}
          />
        </RowComponent>

        <SpaceComponent height={10} />

        <BtnShadowLinearComponent
          title='Next'
          onPress={() => navigation.navigate('OTPScreen')}
        />

        <TextComponent
          text="Resend confirmation code (1:23)"
          font={fontFamillies.poppinsLight}
          size={sizes.bigText}
          styles={{
            textAlign: 'center',
          }}
        />
      </SectionComponent>
    </Container>
  );
};

export default VerifyNumberScreen;
