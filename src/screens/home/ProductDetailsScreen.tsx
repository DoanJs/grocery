import { ArrowLeft, Heart, ShoppingBag } from 'iconsax-react-native'
import React, { useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import lemonDetail from '../../assests/images/lemonDetail.png'
import { ButtonComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { colors } from '../../constants/colors'
import { fontFamillies } from '../../constants/fontFamilies'
import { sizes } from '../../constants/sizes'

const ProductDetailsScreen = ({ navigation }: any) => {
  const [isShowText, setIsShowText] = useState(false);
  const [quantity, setQuantity] = useState(0);
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1
      }}
    >
      <ArrowLeft
        size={26}
        color={colors.text2}
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          zIndex: 2,
        }}
      />
      <Image
        source={lemonDetail}
        style={{
          width: sizes.width,
        }}
      />

      <SectionComponent styles={{
        flex: 1,
        backgroundColor: colors.background1,
        paddingVertical: 20
      }} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <RowComponent justify='space-between'>
            <TextComponent
              text="$2.22"
              font={fontFamillies.poppinsSemiBold}
              size={sizes.thinTitle}
            />
            <Heart size={20} color={colors.text} />
          </RowComponent>
          <TextComponent
            text="Organic Lemons"
            font={fontFamillies.poppinsSemiBold}
            size={sizes.smallTitle}
          />
          <TextComponent
            text='1.50 lbs'
            font={fontFamillies.poppinsMedium}
            color={colors.text}
          />
          <RowComponent styles={{
            alignItems: 'baseline',
          }}>
            <TextComponent
              text='4.5'
              font={fontFamillies.poppinsMedium}
            />
            <RowComponent styles={{
              marginHorizontal: 6
            }}>
              <AntDesign name='star' size={20} color={colors.orange} />
              <AntDesign name='star' size={20} color={colors.orange} />
              <AntDesign name='star' size={20} color={colors.orange} />
              <AntDesign name='star' size={20} color={colors.orange} />
              <AntDesign name='star' size={20} color={colors.orange} />
            </RowComponent>
            <TouchableOpacity onPress={() => navigation.navigate('ReviewsScreen')}>
              <TextComponent
                text='(89 reviews)'
                color={colors.text}
                font={fontFamillies.poppinsMedium}
              />
            </TouchableOpacity>
          </RowComponent>

          <View>
            <TextComponent
              text='Organic Mountain works as a seller for many organic growers of organic lemons. Organic lemons are easy to spot in your produce aisle. They are just like regular lemons, but they will usually have a few more scars on the outside of the lemon skin. Organic lemons are considered to be the world&apos; finest lemon for juicing'
              color={colors.text}
              numberOfLine={isShowText ? undefined : 4}
            />
            {

              !isShowText && <TouchableOpacity
                onPress={() => setIsShowText(true)}>
                <TextComponent
                  text={isShowText ? 'hide' : 'more'}
                  font={fontFamillies.poppinsBold}
                  styles={{
                    backgroundColor: colors.background1,
                    paddingLeft: 10,
                    position: 'absolute',
                    bottom: 0,
                    left: '30%',
                    width: '100%',
                  }}
                />
              </TouchableOpacity>
            }
          </View>

          <SpaceComponent height={16} />

          <RowComponent justify='space-between' styles={{
            backgroundColor: colors.background,
            paddingHorizontal: 16
          }}>
            <TextComponent text='Quantity'
              font={fontFamillies.poppinsMedium} color={colors.text}
            />
            <RowComponent>
              <Entypo size={18} name='minus'
                style={{
                  paddingRight: 16
                }} color={colors.primary}
                onPress={() => quantity <= 0 ? 0 : setQuantity(quantity - 1)}
              />
              <TextComponent text={`${quantity}`} styles={{
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderLeftColor: colors.border,
                borderRightColor: colors.border,
                paddingHorizontal: 16,
                paddingVertical: 16
              }} font={fontFamillies.poppinsMedium} size={sizes.thinTitle} />
              <Entypo size={18} name='plus'
                style={{
                  paddingLeft: 16
                }} color={colors.primary}

                onPress={() => setQuantity(quantity + 1)}
              />
            </RowComponent>
          </RowComponent>
        </ScrollView>
      </SectionComponent>

      <View style={{
        backgroundColor: colors.background1,
        position: 'absolute',
        bottom: 10,
        right: 0,
        left: 0
      }}>
        <SectionComponent>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primaryDark, colors.primary]} style={{ borderRadius: 5 }}>
            <ButtonComponent text='Add to cart' onPress={() => { }}
              color='transparent'
              styles={{
                flexDirection: 'row',
              }}
              textStyles={{
                color: colors.background,
                fontFamily: fontFamillies.poppinsMedium,
                fontSize: sizes.bigText,
                flex: 1,
                textAlign: 'center',
              }}
              suffix={<ShoppingBag size={24} color={colors.background} />}
            />
          </LinearGradient>

        </SectionComponent>

      </View>
    </View>
  )
}

export default ProductDetailsScreen