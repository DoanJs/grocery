import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RowComponent, TextComponent } from '.';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { sizes } from '../constants/sizes';
import { ProductModel } from '../models/ProductModel';

interface Props {
  product: ProductModel;
  quantity: number
}

const CartItemComponent = (props: Props) => {
  const { product, quantity } = props;
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={() => {}}
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
            source={{uri: product.url}}
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
              // onPress={() => setQuantity(quantity + 1)}
            />
            <TextComponent
              color={colors.text}
              text={`${quantity}`}
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
              // onPress={() => (quantity === 0 ? 0 : setQuantity(quantity - 1))}
            />
          </RowComponent>
        </RowComponent>
      </Swipeable>
    </View>
  );
};

export default CartItemComponent;
