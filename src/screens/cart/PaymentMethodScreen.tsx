import { Apple, Calendar, Card, Lock1, Paypal, User } from 'iconsax-react-native'
import React, { useState } from 'react'
import { Image, ImageBackground, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import cardPhysical from '../../assests/images/cardPhysical.png'
import masterCard from '../../assests/images/masterCard.png'
import { BtnShadowLinearComponent, CheckedButtonComponent, Container, InputComponent, ProgressShippingComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { colors } from '../../constants/colors'
import { fontFamillies } from '../../constants/fontFamilies'
import { sizes } from '../../constants/sizes'
const data1 = [
    {
        title: '1',
        status: 'success',
        description: 'DELIVERY'
    },
    {
        title: '2',
        status: 'success',
        description: 'ADDRESS'
    },
    {
        title: '3',
        status: 'pending',
        description: 'PAYMENT'
    },
]
const data2 = [
    {
        icon: <Paypal size={30} color={colors.text} variant='Bold' />,
        title: '    Paypal    '
    },
    {
        icon: <Calendar size={30} color={colors.text} variant='Bold' />,
        title: 'Credit Card'
    },
    {
        icon: <Apple size={30} color={colors.text} variant='Bold' />,
        title: 'Apple pay'
    },
]
const PaymentMethodScreen = ({navigation}: any) => {
    const [infoCard, setInfoCard] = useState({
        nameCard: '',
        numberCard: '',
        exp: '',
        cvv: ''
    });
    const [isSaved, setIsSaved] = useState(false);
    return (
        <Container bg={colors.background} back title='Payment Method'>
            <View style={{
                backgroundColor: colors.background1,
                flex: 1,
                paddingVertical: 20
            }}>
                <SectionComponent styles={{
                    flex: 1
                }}>
                    <View style={{
                        paddingHorizontal: 30,
                        paddingVertical: 10
                    }}>
                        <RowComponent justify='space-around'>
                            {
                                data1.map((_, index) =>
                                    <ProgressShippingComponent key={index}
                                        index={index}
                                        status={_.status}
                                        title={_.title}
                                        description={_.description}
                                    />
                                )
                            }
                        </RowComponent>
                    </View>

                    <RowComponent justify='space-between' styles={{
                        marginVertical: 10
                    }}>
                        {
                            data2.map((_, index) =>
                                <Shadow
                                    key={index}
                                    distance={5}
                                    startColor={`${colors.border}d8`}
                                    endColor={`${colors.border}10`}
                                    offset={[0, 4]}
                                    style={{
                                        width: '100%',
                                        marginBottom: 16,
                                    }}
                                >
                                    <View style={{
                                        backgroundColor: colors.background,
                                        paddingVertical: 20,
                                        paddingHorizontal: 26,
                                        borderRadius: 5,
                                        alignItems: 'center',
                                    }}>
                                        {_.icon}
                                        <SpaceComponent height={10} />
                                        <TextComponent text={_.title} />
                                    </View>
                                </Shadow>)
                        }

                    </RowComponent>

                    <View
                        style={{
                            backgroundColor: colors.primary,
                            height: 200,
                            width: '100%',
                            borderRadius: 10,
                            marginBottom: 20
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

                    <InputComponent
                        styles={{
                            backgroundColor: colors.background,
                            paddingVertical: 16,
                            paddingHorizontal: 26,
                            borderRadius: 5,
                        }}
                        prefix={<User color={colors.text} size={26} />}
                        color={colors.background}
                        value={infoCard.nameCard}
                        allowClear
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
                        }}
                        prefix={<Card color={colors.text} size={26} />}
                        color={colors.background}
                        value={infoCard.numberCard}
                        allowClear
                        placeholder='Card number'
                        placeholderTextColor={colors.text}
                        textStyles={{
                            color: colors.text,
                        }}
                        onChange={val => setInfoCard({ ...infoCard, numberCard: val })}
                    />
                    <RowComponent justify='space-between'>
                        <InputComponent
                            styles={{
                                backgroundColor: colors.background,
                                paddingVertical: 16,
                                paddingHorizontal: 26,
                                borderRadius: 5,
                                flex: 1
                            }}
                            prefix={<Calendar color={colors.text} size={26} />}
                            color={colors.background}
                            value={infoCard.exp}
                            allowClear
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
                            prefix={<Lock1 color={colors.text} size={26} />}
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

                    <SectionComponent>
                        <SectionComponent>
                            <CheckedButtonComponent
                                title='Save this card'
                                value={isSaved}
                                onPress={(val: boolean) => setIsSaved(val)}
                            />
                        </SectionComponent>
                    </SectionComponent>
                </SectionComponent>

                <SectionComponent>
                    <BtnShadowLinearComponent
                        title='Make a payment'
                        onPress={() => navigation.navigate('OrderSuccessScreen')}
                    />
                </SectionComponent>
            </View>
        </Container>
    )
}

export default PaymentMethodScreen