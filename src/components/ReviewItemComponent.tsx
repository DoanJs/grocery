import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { RowComponent, SectionComponent, SpaceComponent, TextComponent } from '.'
import { colors } from '../constants/colors'
import { fontFamillies } from '../constants/fontFamilies'
import { sizes } from '../constants/sizes'

interface Props {
    icon: ImageSourcePropType | undefined,
    name: string,
    time: string
    star: number
    text: string
}

const ReviewItemComponent = (props: Props) => {
    const { icon, name, time, star, text } = props
    return (
        <SectionComponent styles={{
            backgroundColor: colors.background,
            paddingVertical: 20
        }}>
            <RowComponent>
                <Image source={icon} />
                <SpaceComponent width={10} />
                <View>
                    <TextComponent
                        text={name}
                        font={fontFamillies.poppinsSemiBold}
                        size={sizes.bigText}
                    />
                    <TextComponent
                        text={time}
                        font={fontFamillies.poppinsMedium}
                        size={sizes.smallText}
                        color={colors.text}
                    />
                </View>
            </RowComponent>
            <SpaceComponent height={16} />
            <View style={{
                width: '100%',
                height: 1,
                backgroundColor: colors.border
            }} />
            <SpaceComponent height={16} />

            <RowComponent styles={{
                alignItems: 'baseline',
            }}>
                <TextComponent
                    text={`${star}`}
                    font={fontFamillies.poppinsMedium}
                />
                {
                    Array.from({ length: Math.floor(star) }).map((_, index) =>
                        <FontAwesome
                            name='star' size={20}
                            color={colors.star} key={index}
                            style={{
                                marginHorizontal: 2
                            }}
                        />)
                }
                {
                    star - Math.floor(star) > 0 &&
                    <FontAwesome
                        name='star-half-empty' size={20}
                        color={colors.star}
                        style={{
                            marginHorizontal: 2
                        }}
                    />
                }
            </RowComponent>
            <TextComponent
                text={text}
                color={colors.text}
            />
        </SectionComponent>
    )
}

export default ReviewItemComponent