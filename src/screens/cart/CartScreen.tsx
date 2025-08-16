import { ShoppingBag } from 'iconsax-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import broccoliItem from '../../assests/images/broccoliItem.png';
import grapesItem from '../../assests/images/grapesItem.png';
import avacodaItem from '../../assests/images/avacodaItem.png';
import pineappleItem from '../../assests/images/broccoliItem.png';
import {
  ButtonComponent,
  CartItemComponent,
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
const data1 = [
  {
    id: 6,
    title: 'Fresh Broccoli',
    description: '1.50 lbs',
    price: '$2.22 x 4',
    source: broccoliItem,
  },
  {
    id: 4,
    title: 'Black Grapes',
    description: '5.0 lbs',
    price: '$2.22 x 4',
    source: grapesItem,
  },
  {
    id: 2,
    title: 'Avacoda',
    description: '1.50 lbs',
    price: '$2.22 x 4',
    source: avacodaItem,
  },
  {
    id: 3,
    title: 'Pineapple',
    description: 'dozen',
    price: '$2.22 x 4',
    source: pineappleItem,
  },
];
// const data1: any = [];
const CartScreen = ({navigation}: any) => {
  return (
    <Container bg={colors.background} back title="Shopping Cart">
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
            paddingVertical: 20,
          }}
        >
          {data1.length > 0 ? (
            <GestureHandlerRootView>
              <ScrollView showsVerticalScrollIndicator={false}>
                {data1.map((_: any, index: number) => (
                  <CartItemComponent key={index} product={_} />
                ))}
              </ScrollView>
            </GestureHandlerRootView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <ShoppingBag size={80} color={colors.primary} />
              <TextComponent
                text="Your cart is empty !"
                font={fontFamillies.poppinsSemiBold}
                size={sizes.smallTitle}
              />
              <TextComponent
                text="You will get a response within a few minutes."
                font={fontFamillies.poppinsMedium}
                size={sizes.bigText}
                color={colors.text}
                styles={{ width: '60%', textAlign: 'center' }}
              />
            </View>
          )}
        </SectionComponent>

        {data1.length > 0 ? (
          <View>
            <SectionComponent>
              <RowComponent justify="space-between">
                <TextComponent
                  text="Subtotal"
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
                <TextComponent
                  text="$56.7"
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
              </RowComponent>
              <RowComponent justify="space-between">
                <TextComponent
                  text="Shipping charges"
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
                <TextComponent
                  text="$1.6"
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
              </RowComponent>
              <RowComponent
                justify="space-between"
                styles={{
                  borderTopWidth: 1,
                  borderTopColor: colors.border,
                  marginVertical: 10,
                  paddingTop: 10,
                }}
              >
                <TextComponent
                  text="Total"
                  color={colors.text2}
                  font={fontFamillies.poppinsSemiBold}
                  size={sizes.thinTitle}
                />
                <TextComponent
                  text="$58.2"
                  color={colors.text2}
                  font={fontFamillies.poppinsSemiBold}
                  size={sizes.thinTitle}
                />
              </RowComponent>

              <Shadow
                distance={5}
                startColor={`${colors.primaryLight}d8`}
                endColor={`${colors.primary}10`}
                offset={[0, 4]}
                style={{
                  width: '100%',
                  marginBottom: 16,
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[colors.primaryDark, colors.primary]}
                  style={{ borderRadius: 5 }}
                >
                  <ButtonComponent
                    color="transparent"
                    onPress={() => {}}
                    text="Checkout"
                    styles={{
                      borderRadius: 5,
                    }}
                    textStyles={{
                      color: colors.background,
                      fontFamily: fontFamillies.poppinsMedium,
                      fontSize: sizes.bigText,
                      marginLeft: 20,
                    }}
                  />
                </LinearGradient>
              </Shadow>
            </SectionComponent>
          </View>
        ) : (
          <SectionComponent>
            <Shadow
              distance={5}
              startColor={`${colors.primaryLight}d8`}
              endColor={`${colors.primary}10`}
              offset={[0, 4]}
              style={{
                width: '100%',
                marginBottom: 16,
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.primaryDark, colors.primary]}
                style={{ borderRadius: 5 }}
              >
                <ButtonComponent
                  color="transparent"
                  onPress={() => navigation.navigate('Main')}
                  text="Start shopping"
                  styles={{
                    borderRadius: 5,
                  }}
                  textStyles={{
                    color: colors.background,
                    fontFamily: fontFamillies.poppinsMedium,
                    fontSize: sizes.bigText,
                    marginLeft: 20,
                  }}
                />
              </LinearGradient>
            </Shadow>
          </SectionComponent>
        )}
      </View>
    </Container>
  );
};

export default CartScreen;
