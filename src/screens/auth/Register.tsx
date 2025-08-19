import { ArrowLeft, Lock } from 'iconsax-react-native';
import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import createAccountPng from '../../assests/images/createAccount.png';
import { BtnShadowLinearComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const Register = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    return (
        <ImageBackground
            source={createAccountPng} imageStyle={{ resizeMode: 'cover' }}
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
                        text='Create account' font={fontFamillies.poppinsSemiBold}
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
                        allowClear
                        prefix={<Feather name='phone' color={colors.text} size={26} />}
                        placeholder='Phone number'
                        placeholderTextColor={colors.text}
                        color={colors.background}
                        value={phone}
                        onChange={(val) => setPhone(val)}
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

                    <SpaceComponent height={16} />

                    <BtnShadowLinearComponent
                        title='Signup'
                        onPress={() => { }}
                    />

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
}

export default Register