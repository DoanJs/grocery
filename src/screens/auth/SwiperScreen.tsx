import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Swiper from 'react-native-swiper'
import appleImg from '../../assests/images/apple.png'
import bigCartImg from '../../assests/images/bigCart.png'
import breadImg from '../../assests/images/bread.png'
import cookImg from '../../assests/images/cook.png'
import eggImg from '../../assests/images/egg.png'
import lemonImg from '../../assests/images/lemon.png'
import milkImg from '../../assests/images/milk.png'
import motobikeImg from '../../assests/images/motobike.png'
import orangeImg from '../../assests/images/orange.png'
import phoneImg from '../../assests/images/phone.png'
import shrimpImg from '../../assests/images/shrimp.png'
import vegetableImg from '../../assests/images/vegetable.png'
import {
    ButtonComponent, Container, RowComponent,
    SectionComponent, SpaceComponent, TextComponent
} from '../../components'
import { colors } from '../../constants/colors'
import { fontFamillies } from '../../constants/fontFamilies'
import { sizes } from '../../constants/sizes'

const data = [
    'Get Discounts On All Products',
    'Buy Premium Quality Fruits',
    'Buy Quality Dairy Products',
    'Welcome to',
    'Premium Food At Your Doorstep',
    'Buy Premium Quality Fruits',
    'Buy Quality Dairy Products',
    'Get Discounts On All Products',
    'Buy Grocery',
    'Fast Delivery',
    'Enjoy Quality Food',
]

const SwiperScreen = ({ navigation }: any) => {
    const [index, setIndex] = useState(0)

    return (
        <View style={{ flex: 1 }}>
            <Swiper
                loop={false}
                onIndexChanged={num => setIndex(num)}
                index={index}
                dotStyle={{ bottom: index < 8 ? 90 : 20 }}
                dotColor={colors.gray}
                activeDotStyle={{ bottom: index < 8 ? 90 : 20 }}
                activeDotColor={colors.primary}
            >
                <Image
                    style={localStyle.image}
                    source={appleImg}
                />
                <Image
                    style={localStyle.image}
                    source={lemonImg}
                />
                <Image
                    style={localStyle.image}
                    source={eggImg}
                />
                <Image
                    style={localStyle.image}
                    source={vegetableImg}
                />
                <Image
                    style={localStyle.image}
                    source={breadImg}
                />
                <Image
                    style={localStyle.image}
                    source={orangeImg}
                />
                <Image
                    style={localStyle.image}
                    source={milkImg}
                />
                <Image
                    style={localStyle.image}
                    source={shrimpImg}
                />
                <Image
                    style={localStyle.image}
                    source={phoneImg}
                />
                <Image
                    style={localStyle.image}
                    source={motobikeImg}
                />
                <Image
                    style={localStyle.image}
                    source={cookImg}
                />
            </Swiper>

            <View style={{
                position: 'absolute',
                right: 0, left: 0,
                top: index < 4 ? '10%' : index < 8 ? '60%' : '75%'
            }}>
                <SectionComponent>
                    <RowComponent
                        styles={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <TextComponent
                            text={data[index]}
                            styles={{
                                width: index === 4 ? '75%' : '70%',
                                textAlign: 'center',
                            }}
                            font={fontFamillies.poppinsBold}
                            size={sizes.bigTitle}

                        />
                        {
                            index === 3 && <Image source={bigCartImg} />
                        }
                        <SpaceComponent height={10} />
                        <TextComponent
                            text='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy'
                            styles={{
                                width: '85%',
                                textAlign: 'center'
                            }}
                            size={sizes.bigText}
                            color={colors.text}
                            font={fontFamillies.poppinsMedium}
                        />
                    </RowComponent>
                </SectionComponent>
            </View>

            <View style={{
                position: 'absolute', right: 0,
                left: 0, bottom: '3%'
            }}>
                <SectionComponent>

                    {
                        index < 8 ? <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primaryDark, colors.primary]} style={{ borderRadius: 5 }}>
                            <ButtonComponent
                                color='transparent'
                                onPress={() => navigation.navigate('SwiperNextScreen')}
                                text='Get started'
                                textStyles={{ color: colors.background }} />
                        </LinearGradient>
                            :
                            <RowComponent justify='space-between'>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AuthHomeScreen')}
                                >
                                    <TextComponent
                                        text='Skip'
                                        color={colors.primaryDark} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        index < 10
                                            ? setIndex(index + 1)
                                            : navigation.navigate('AuthHomeScreen');
                                    }}
                                >
                                    <TextComponent
                                        text='Next'
                                        color={colors.primaryDark} />
                                </TouchableOpacity>
                            </RowComponent>
                    }

                </SectionComponent>
            </View>
        </View>
    )
}

export default SwiperScreen
const localStyle = StyleSheet.create({
    image: {
        flex: 1,
        width: sizes.width,
        height: sizes.height,
        resizeMode: 'cover',
    },
});