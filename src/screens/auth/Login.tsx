import { ArrowLeft, Lock } from 'iconsax-react-native';
import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import Fontisto from 'react-native-vector-icons/Fontisto';
import welcomeBackPng from '../../assests/images/welcomeBack.png';
import { ButtonComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const Login = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    return (
        <ImageBackground
            source={welcomeBackPng} imageStyle={{ resizeMode: 'cover' }}
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
                        text='Welcome back !' font={fontFamillies.poppinsSemiBold}
                        size={sizes.title} />
                    <TextComponent
                        text='Sign in to your account'
                        color={colors.text}
                        size={sizes.bigText}
                        font={fontFamillies.poppinsRegular}
                    />

                    <SpaceComponent height={16} />

                    <InputComponent
                        styles={{
                            backgroundColor: colors.background,
                            paddingVertical: 12,
                            paddingHorizontal: 26,
                            borderRadius: 5
                        }}
                        allowClear
                        prefix={<Fontisto name='email' color={colors.text} size={26} />}
                        placeholder='Email Address'
                        placeholderTextColor={colors.text}
                        color={colors.background}
                        value={email}
                        onChange={(val) => setEmail(val)}
                    />
                    <InputComponent
                        styles={{
                            backgroundColor: colors.background,
                            paddingVertical: 12,
                            paddingHorizontal: 26,
                            borderRadius: 5
                        }}
                        prefix={<Lock color={colors.text} size={26} />}
                        color={colors.background}
                        value={password}
                        isPassword
                        textStyles={{
                            color: colors.text
                        }}
                        onChange={(val) => setPassword(val)}
                    />

                    <RowComponent justify='space-between'>
                        <RowComponent onPress={() => setRemember(!remember)}>
                            <View style={{
                                height: 18, width: 32,
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: remember ? colors.primary : colors.text,
                                flexDirection: 'row',
                                justifyContent: remember ? 'flex-end' : 'flex-start',
                            }}>
                                <View style={{
                                    width: 16, height: 16,
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor: remember ? colors.primary : colors.text,
                                    backgroundColor: remember ? colors.primary : 'transparent'
                                }} />
                            </View>
                            <SpaceComponent width={10} />
                            <TextComponent
                                text='Remember me'
                                color={colors.text}
                                font={fontFamillies.poppinsMedium}
                                size={sizes.bigText}
                            />
                        </RowComponent>
                        <TouchableOpacity>
                            <TextComponent
                                text='Forgot password'
                                color={colors.blue}
                                size={sizes.bigText}
                                font={fontFamillies.poppinsMedium}
                            />
                        </TouchableOpacity>
                    </RowComponent>

                    <SpaceComponent height={16} />

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
                                onPress={() => navigation.navigate('Main', )}
                                text='Login'
                                textStyles={{
                                    color: colors.background,
                                    fontFamily: fontFamillies.poppinsMedium,
                                    fontSize: sizes.bigText,
                                    marginLeft: 20
                                }}
                                styles={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                }}
                            />
                        </LinearGradient>
                    </Shadow>

                    <RowComponent justify='center'>
                        <TextComponent
                            text='Don’t have an account ?'
                            size={sizes.bigText}
                            font={fontFamillies.poppinsLight}
                            color={colors.text}
                        />
                        <SpaceComponent width={10} />
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <TextComponent
                                text='Sign up'
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
}

export default Login