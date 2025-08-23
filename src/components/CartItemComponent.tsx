import { deleteDoc, doc, setDoc } from '@react-native-firebase/firestore';
import React from 'react';
import {
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RowComponent, TextComponent } from '.';
import { db } from '../../firebase.config';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { sizes } from '../constants/sizes';
import { ProductModel } from '../models/ProductModel';

interface Props {
  product: ProductModel;
  cart: any
}

const CartItemComponent = (props: Props) => {
  const { product, cart } = props;


  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={async () => await deleteDoc(doc(db, 'carts', cart.id))}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.red,
          paddingHorizontal: 28,
        }}
      >
        <FontAwesome5 name="trash-alt" color={colors.background} size={26} />
      </TouchableOpacity>
    );
  };

  const handleChangeQuantity = async (type: string) => {
    let quantity = cart.quantity
    let isDelete = false

    if (type === 'decrease') {
      if (quantity === 1) {
        isDelete = true
      }
      quantity = quantity - 1
    } else {
      quantity = quantity + 1
    }

    if (isDelete) {
      await deleteDoc(doc(db, 'carts', cart.id))
    } else {
      await setDoc(
        doc(db, 'carts', cart.id), { quantity },
        { merge: true })
    }
  }

  return (
    <View
      style={{
        marginVertical: 6,
      }}
    >
      <Swipeable renderRightActions={renderRightActions}>
        <RowComponent
          justify="space-between"
          styles={{
            backgroundColor: colors.background,
            padding: 16,
          }}
        >
          <Image
            source={{ uri: product.url }}
            resizeMode="contain"
            style={{
              marginRight: 16,
              width: 80,
              height: 80,
            }}
          />
          <RowComponent
            styles={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: 1,
            }}
          >
            <TextComponent
              text={`$${product.price}`}
              color={colors.primary}
              font={fontFamillies.poppinsMedium}
            />
            <TextComponent
              text={product.title as string}
              color={colors.text2}
              size={sizes.bigText}
              font={fontFamillies.poppinsSemiBold}
            />
            <TextComponent
              text={product.quantity as string}
              color={colors.text}
            />
          </RowComponent>

          <RowComponent
            styles={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Entypo
              size={20}
              color={colors.primary}
              name="plus"
              onPress={() => handleChangeQuantity('increase')}
            />
            <TextComponent
              color={colors.text}
              text={`${cart.quantity}`}
              font={fontFamillies.poppinsMedium}
              size={sizes.bigText}
              styles={{
                paddingVertical: 8,
              }}
            />
            <Entypo
              size={20}
              color={colors.primary}
              name="minus"
              onPress={() => handleChangeQuantity('decrease')}
            />
          </RowComponent>
        </RowComponent>
      </Swipeable>
    </View>
  );
};

export default CartItemComponent;
