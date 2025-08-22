import { where } from '@react-native-firebase/firestore';
import { ShoppingBag } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { auth } from '../../../firebase.config';
import avacodaItem from '../../assests/images/avacodaItem.png';
import {
  default as broccoliItem,
  default as pineappleItem,
} from '../../assests/images/broccoliItem.png';
import grapesItem from '../../assests/images/grapesItem.png';
import {
  BtnShadowLinearComponent,
  CartItemComponent,
  Container,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { onSnapshotData } from '../../constants/onSnapshotData';
import { sizes } from '../../constants/sizes';
import { ProductModel } from '../../models/ProductModel';
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
const CartScreen = ({ navigation }: any) => {
  const user = auth.currentUser;
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [carts, setCarts] = useState<ProductModel[]>([]);
  const [proCarts, setProCarts] = useState<any[]>([]);

  useEffect(() => {
    onSnapshotData({
      nameCollect: 'products',
      setData: setProducts,
    });

    onSnapshotData({
      nameCollect: 'carts',
      setData: setCarts,
      conditions: [where('userId', '==', user?.uid)],
    });
  }, []);

  useEffect(() => {
    if (carts && products) {
      let items: ProductModel[] = [];

      carts.map((cart: any) => {
        const index = products.findIndex(
          (product: ProductModel) => product.id === cart.productId,
        );

        items.push({
          ...cart,
          product: products[index],
        });
      });

      setProCarts(items);
    }
  }, [products, carts]);

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
          {proCarts.length > 0 ? (
            <GestureHandlerRootView>
              <ScrollView showsVerticalScrollIndicator={false}>
                {proCarts.map((_: any, index: number) => (
                  <CartItemComponent
                    key={index}
                    product={_.product}
                    quantity={_.quantity}
                  />
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

              <BtnShadowLinearComponent
                title="Checkout"
                onPress={() => navigation.navigate('ShippingMethodScreen')}
              />
            </SectionComponent>
          </View>
        ) : (
          <SectionComponent>
            <BtnShadowLinearComponent
              title="Start shopping"
              onPress={() => navigation.navigate('ShippingMethodScreen')}
            />
          </SectionComponent>
        )}
      </View>
    </Container>
  );
};

export default CartScreen;
