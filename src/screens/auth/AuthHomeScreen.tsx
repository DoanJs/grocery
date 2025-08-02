import { ArrowLeft } from 'iconsax-react-native';
import React from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import googlePng from '../../assests/images/google.png';
import userPng from '../../assests/images/user.png';
import welcomeImg from '../../assests/images/welcome.png';
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const AuthHomeScreen = ({ navigation }: any) => (
  <ImageBackground
    source={welcomeImg} imageStyle={{ resizeMode: 'cover' }}
    style={{ flex: 1, alignItems: 'center' }}>

    <SectionComponent
      styles={{ backgroundColor: 'transparent', top: '6%' }}>
      <RowComponent styles={{ width: '100%' }}>
        <ArrowLeft
          size={28} color={colors.background}
          onPress={() => navigation.goBack()}
        />
        <TextComponent
          text='Welcome' color={colors.background}
          size={sizes.thinTitle} flex={1}
          font={fontFamillies.poppinsBold}
          styles={{
            textAlign: 'center'
          }} />
      </RowComponent>
    </SectionComponent>

    <View style={{
      backgroundColor: colors.background1,
      position: 'absolute',
      right: 0, left: 0, bottom: 0,
      paddingVertical: 20, borderRadius: 10
    }}>
      <SectionComponent>
        <TextComponent
          text='Welcome' font={fontFamillies.poppinsSemiBold}
          size={sizes.title} />
        <TextComponent
          text='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy'
          color={colors.text}
          styles={{
            width: '80%'
          }} />

        <SpaceComponent height={16} />

        <ButtonComponent
          text='Continue with google'
          onPress={() => { }}
          color={colors.background}
          preffix={<Image source={googlePng} style={{ marginHorizontal: 20 }} />}
          styles={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            borderRadius: 5,
            marginBottom: 10
          }}
          textStyles={{
            fontFamily: fontFamillies.poppinsMedium,
            fontSize: sizes.bigText, marginLeft: 16
          }} />

        <Shadow
          distance={5}
          startColor={`${colors.primaryLight}d8`} endColor={`${colors.primary}10`}
          offset={[0, 4]}
          style={{
            width: '100%',
            marginBottom: 16
          }}
        >
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primaryDark, colors.primary]} style={{ borderRadius: 5 }}>
            <ButtonComponent
              color='transparent'
              onPress={() => navigation.navigate('Register')}
              text='Create an account'
              textStyles={{
                color: colors.background, fontFamily: fontFamillies.poppinsMedium,
                fontSize: sizes.bigText,
                marginLeft: 20
              }}
              styles={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                borderRadius: 5,
              }}
              preffix={<Image source={userPng} style={{ marginHorizontal: 20 }} />}
            />
          </LinearGradient>
        </Shadow>

        <RowComponent justify='center'>
          <TextComponent
            text='Already have an account ?'
            size={sizes.bigText}
            font={fontFamillies.poppinsLight}
            color={colors.text}
          />
          <SpaceComponent width={10} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <TextComponent
              text='Login'
              color={colors.text2}
              size={sizes.bigText}
              font={fontFamillies.poppinsMedium}
            />
          </TouchableOpacity>
        </RowComponent>

      </SectionComponent>
    </View>
  </ImageBackground>

)

export default AuthHomeScreen