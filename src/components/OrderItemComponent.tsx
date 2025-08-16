import { ArrowDown2, ArrowUp2 } from 'iconsax-react-native'
import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { RowComponent, SectionComponent, SpaceComponent, TextComponent } from '.'
import myOrder from '../assests/images/myOrder.png'
import { colors } from '../constants/colors'
import { fontFamillies } from '../constants/fontFamilies'
import { sizes } from '../constants/sizes'

interface Props {
    code: string
}

const data = [
    {
        title: 'Order placed',
        description: 'Oct 19 2021',
        status: true
    },
    {
        title: 'Order confirmed',
        description: 'Oct 20 2021',
        status: true
    },
    {
        title: 'Order shipped',
        description: 'Oct 20 2021',
        status: true
    },
    {
        title: 'Out for delivery',
        description: 'pending',
        status: false
    },
    {
        title: 'Order delivered',
        description: 'pending',
        status: false
    },
]
const OrderItemComponent = (props: Props) => {
    const { code } = props
    const [isShow, setIsShow] = useState(false);

    return (
        <View style={{marginVertical: 6}}>
            <RowComponent justify='space-between' styles={{
                backgroundColor: colors.background,
                padding: 20,
            }}>
                <View style={{
                    backgroundColor: colors.primaryLight,
                    padding: 16,
                    borderRadius: 100,
                    marginRight: 16
                }}>
                    <Image source={myOrder} style={{
                        width: 40, height: 40, resizeMode: 'contain'
                    }} />
                </View>

                <RowComponent styles={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    flex: 1
                }}>
                    <TextComponent
                        text={code}
                        size={sizes.bigText}
                        font={fontFamillies.poppinsSemiBold}
                    />
                    <TextComponent
                        text='Placed on Octobar 19 2021'
                        size={sizes.text}
                        color={colors.text}
                        font={fontFamillies.poppinsMedium}
                    />
                    <RowComponent>
                        <RowComponent>
                            <TextComponent
                                text='Items: '
                                size={sizes.smallText}
                            />
                            <TextComponent
                                text='10'
                                size={sizes.smallText}
                                font={fontFamillies.poppinsSemiBold}
                            />
                        </RowComponent>
                        <SpaceComponent width={24} />
                        <RowComponent>
                            <TextComponent
                                text='Price: '
                                size={sizes.smallText}
                            />
                            <TextComponent
                                text='$16.90'
                                size={sizes.smallText}
                                font={fontFamillies.poppinsSemiBold}
                            />
                        </RowComponent>
                    </RowComponent>
                </RowComponent>

                <TouchableOpacity
                    onPress={() => setIsShow(!isShow)}
                    style={{
                        padding: 1,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        borderRadius: 100,
                    }}
                >
                    {
                        isShow 
                        ? <ArrowUp2 variant="Bold" size={20} color={colors.primary} />
                        : <ArrowDown2 variant="Bold" size={20} color={colors.primary} />
                    }
                </TouchableOpacity>
            </RowComponent>

            {
                isShow &&
                <>
                    <View style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: colors.border,
                    }} />

                    <SectionComponent styles={{
                        backgroundColor: colors.background,
                        padding: 20,
                    }}>

                        {
                            data.map((_, index) =>
                                <View key={index} style={{
                                    marginBottom: 8
                                }}>
                                    <RowComponent justify='space-between'>
                                        <View style={{
                                            height: 10,
                                            width: 10,
                                            borderRadius: 100,
                                            backgroundColor: _.status ? colors.primary : colors.border,
                                            marginRight: 10
                                        }} />
                                        <TextComponent
                                            flex={1}
                                            text={_.title}
                                            font={fontFamillies.poppinsSemiBold}
                                        />
                                        <TextComponent
                                            text={_.description}
                                            color={colors.text}
                                        />
                                    </RowComponent>
                                    {
                                        index > 0 &&
                                        <View style={{
                                            height: 26,
                                            width: 2,
                                            backgroundColor: _.status ? colors.primary : colors.border,
                                            position: 'absolute',
                                            top: -14,
                                            left: 4
                                        }} />
                                    }
                                </View>
                            )
                        }
                    </SectionComponent>
                </>
            }

        </View>
    )
}

export default OrderItemComponent