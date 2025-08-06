import { Heart, ShoppingBag } from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import { RowComponent, SpaceComponent, TextComponent } from '.';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { sizes } from '../constants/sizes';
import { ProductModel } from '../models/ProductModel';

interface Props {
  onPress: () => void;
  isCart?: boolean;
  isHeart?: boolean;
  product: ProductModel;
}

const ProductItemComponent = (props: Props) => {
  const { onPress, isCart, isHeart, product } = props;

  return (
    <RowComponent
      onPress={onPress}
      styles={{
        flexDirection: 'column',
        backgroundColor: colors.background,
        width: '48%',
        marginBottom: 16,
      }}
    >
      {product.sale && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            paddingVertical: 2,
            paddingHorizontal: 10,
            backgroundColor: colors.pink2,
            // backgroundColor: isNew ? colors.orange2 : colors.pink2,
          }}
        >
          <TextComponent
            text={`${product.sale ?? 'NEW'}`}
            size={sizes.smallText}
            font={fontFamillies.poppinsMedium}
            color={colors.pink}
            // color={isNew ? colors.orange : colors.pink}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={() => {}}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <Heart
          color={isHeart ? colors.heart : colors.border}
          size={20}
          variant={isHeart ? 'Bold' : 'Linear'}
        />
      </TouchableOpacity>

      <RowComponent
        styles={{
          flexDirection: 'column',
        }}
      >
        <SpaceComponent height={24} />
        <Image
          source={product.source as ImageSourcePropType}
          style={{
            height: 120,
            width: 120,
            resizeMode: 'contain',
          }}
        />
        <TextComponent
          text={`${product.price}`}
          color={colors.primary}
          font={fontFamillies.poppinsMedium}
        />
        <TextComponent
          text={product.title as string}
          color={colors.text2}
          font={fontFamillies.poppinsSemiBold}
        />
        <TextComponent
          text={product.description as string}
          color={colors.text}
          font={fontFamillies.poppinsMedium}
        />
      </RowComponent>

      <RowComponent
        onPress={!isCart ? () => {} : undefined}
        styles={{
          width: '100%',
          justifyContent: isCart ? 'space-around' : 'center',
          borderTopWidth: 1,
          borderColor: colors.border,
          paddingVertical: 10,
        }}
      >
        {isCart ? (
          <>
            <TouchableOpacity onPress={() => {}}>
              <TextComponent
                text="-"
                size={sizes.bigText}
                color={colors.primary}
                font={fontFamillies.poppinsBold}
              />
            </TouchableOpacity>
            <TextComponent
              text="10"
              size={sizes.bigText}
              color={colors.primary}
              font={fontFamillies.poppinsMedium}
            />
            <TouchableOpacity onPress={() => {}}>
              <TextComponent
                text="+"
                size={sizes.bigText}
                color={colors.primary}
                font={fontFamillies.poppinsBold}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <ShoppingBag size={20} color={colors.primary} />
            <SpaceComponent width={8} />
            <TextComponent
              text="Add to cart"
              font={fontFamillies.poppinsMedium}
              color={colors.text2}
            />
          </>
        )}
      </RowComponent>
    </RowComponent>
  );
};

export default ProductItemComponent;
