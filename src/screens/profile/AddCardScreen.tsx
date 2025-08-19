import { Calendar2, Card, User } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import cardPhysical from '../../assests/images/cardPhysical.png';
import masterCard from '../../assests/images/masterCard.png';
import { BtnShadowLinearComponent, ButtonComponent, CheckedButtonComponent, Container, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';

const AddCardScreen = () => {
    const [infoCard, setInfoCard] = useState({
        nameCard: '',
        numberCard: '',
        exp: '',
        cvv: ''
    });
    const [saved, setSaved] = useState(false);
    return (
        <Container bg={colors.background} back title='Add Credit Card'>
            <View style={{
                backgroundColor: colors.background1,
                paddingVertical: 20,
                flex: 1
            }}>
                <SectionComponent styles={{
                    flex: 1
                }}>
                    <View
                        style={{
                            backgroundColor: colors.primary,
                            height: 200,
                            width: '100%',
                            borderRadius: 10,
                        }}>
                        <ImageBackground source={cardPhysical} imageStyle={{
                            height: 200,
                            width: '100%',
                        }}>
                            <SectionComponent>
                                <RowComponent justify='space-between' styles={{
                                    paddingRight: 24
                                }}>
                                    <View>
                                        <Image source={masterCard} style={{
                                            height: 80,
                                            width: 80,
                                            resizeMode: 'contain'
                                        }} />
                                        <TextComponent
                                            text={infoCard.numberCard !== '' ? infoCard.numberCard : 'XXXX XXXX XXXX 8790'}
                                            font={fontFamillies.poppinsMedium}
                                            size={sizes.thinTitle}
                                            color={colors.background}
                                        />
                                    </View>
                                    <View style={{
                                        height: 12,
                                        width: 12,
                                        backgroundColor: colors.red,
                                        transform: [{ rotate: '45deg' }]
                                    }} />
                                </RowComponent>

                                <SpaceComponent height={40} />

                                <RowComponent justify='space-between' styles={{
                                    paddingBottom: 20
                                }}>
                                    <View>
                                        <TextComponent
                                            text='CARD HOLDER'
                                            font={fontFamillies.poppinsMedium}
                                            size={sizes.smallText}
                                            color={colors.background}
                                        />
                                        <TextComponent text={infoCard.nameCard !== '' ? infoCard.nameCard : 'Russell austin'}
                                            font={fontFamillies.poppinsSemiBold}
                                            color={colors.background}
                                        />
                                    </View>
                                    <RowComponent styles={{
                                        alignItems: 'flex-start'
                                    }}>
                                        <View>
                                            <TextComponent text='EXPRIES'
                                                font={fontFamillies.poppinsMedium}
                                                size={sizes.smallText}
                                                color={colors.background}
                                            />
                                            <TextComponent text={infoCard.exp !== '' ? infoCard.exp : '01/22'}
                                                font={fontFamillies.poppinsSemiBold}
                                                color={colors.background}
                                            />
                                        </View>
                                        <SpaceComponent width={10} />
                                        <View style={{
                                            height: 12,
                                            width: 12,
                                            backgroundColor: colors.orange3,
                                            transform: [{ rotate: '45deg' }]
                                        }} />
                                    </RowComponent>
                                </RowComponent>
                            </SectionComponent>
                        </ImageBackground>
                    </View>

                    <SpaceComponent height={10} />

                    <InputComponent
                        styles={{
                            backgroundColor: colors.background,
                            paddingVertical: 16,
                            paddingHorizontal: 26,
                            borderRadius: 5,
                            marginBottom: 6
                        }}
                        prefix={<User color={colors.text} size={26} />}
                        color={colors.background}
                        value={infoCard.nameCard}
                        placeholder='Name on the card'
                        placeholderTextColor={colors.text}
                        textStyles={{
                            color: colors.text,
                        }}
                        onChange={val => setInfoCard({ ...infoCard, nameCard: val })}
                    />
                    <InputComponent
                        styles={{
                            backgroundColor: colors.background,
                            paddingVertical: 16,
                            paddingHorizontal: 26,
                            borderRadius: 5,
                            marginBottom: 6
                        }}
                        prefix={<Card color={colors.text} size={26} />}
                        color={colors.background}
                        value={infoCard.numberCard}
                        placeholder='Card number'
                        placeholderTextColor={colors.text}
                        textStyles={{
                            color: colors.text,
                        }}
                        onChange={val => setInfoCard({ ...infoCard, numberCard: val })}
                    />
                    <RowComponent justify='space-between' styles={{
                        alignItems: 'center'
                    }}>
                        <InputComponent
                            styles={{
                                backgroundColor: colors.background,
                                paddingVertical: 16,
                                paddingHorizontal: 26,
                                borderRadius: 5,
                                flex: 1
                            }}
                            prefix={<Calendar2 color={colors.text} size={26} />}
                            color={colors.background}
                            value={infoCard.exp}
                            placeholder='Month / Year'
                            placeholderTextColor={colors.text}
                            textStyles={{
                                color: colors.text,
                            }}
                            onChange={val => setInfoCard({ ...infoCard, exp: val })}
                        />
                        <SpaceComponent width={4} />
                        <InputComponent
                            styles={{
                                backgroundColor: colors.background,
                                paddingVertical: 16,
                                paddingHorizontal: 26,
                                borderRadius: 5,
                                flex: 1
                            }}
                            prefix={<Calendar2 color={colors.text} size={26} />}
                            color={colors.background}
                            value={infoCard.cvv}
                            placeholder='CVV'
                            isPassword
                            placeholderTextColor={colors.text}
                            textStyles={{
                                color: colors.text,
                            }}
                            onChange={val => setInfoCard({ ...infoCard, cvv: val })}
                        />
                    </RowComponent>

                    <CheckedButtonComponent
                        title='Save this card'
                        onPress={() => setSaved(!saved)}
                        value={saved}
                    />
                </SectionComponent>

                <SectionComponent>
                    <BtnShadowLinearComponent
                        onPress={() => { }}
                        title="Add credit card"
                    />
                </SectionComponent>
            </View>
        </Container>
    )
}

export default AddCardScreen