import { where } from '@react-native-firebase/firestore';
import { ArrowLeft, Heart, ShoppingBag } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { auth } from '../../../firebase.config';
import {
  ButtonComponent,
  ListStarComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { addDocData } from '../../constants/addDocData';
import { colors } from '../../constants/colors';
import { deleteDocData } from '../../constants/deleteDocData';
import { fontFamillies } from '../../constants/fontFamilies';
import { getDocData } from '../../constants/getDocData';
import { onSnapshotData } from '../../constants/onSnapshotData';
import { sizes } from '../../constants/sizes';
import { CartModel } from '../../models/CartModel';
import { CommentModel } from '../../models/CommentModel';
import { HeartModel } from '../../models/HeartModel';
import { ProductModel } from '../../models/ProductModel';

const ProductDetailsScreen = ({ navigation, route }: any) => {
  const user = auth.currentUser;
  const { productId } = route.params;
  const [isShowText, setIsShowText] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductModel>();
  const [hearts, setHearts] = useState<HeartModel[]>([]);
  const [carts, setCarts] = useState<CartModel[]>([]);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [star, setStar] = useState<number>(0);

  useEffect(() => {
    if (productId) {
      getDocData({
        id: productId,
        nameCollect: 'products',
        setData: setProduct,
      });

      onSnapshotData({
        nameCollect: 'hearts',
        conditions: [
          where('productId', '==', productId),
          where('userId', '==', user?.uid),
        ],
        setData: setHearts,
      });

      onSnapshotData({
        nameCollect: 'carts',
        conditions: [
          where('productId', '==', productId),
          where('userId', '==', user?.uid),
        ],
        setData: setCarts,
      });

      onSnapshotData({
        nameCollect: 'comments',
        setData: setComments,
        conditions: [where('productId', '==', productId)],
      });
    }
  }, [productId]);

  useEffect(() => {
    if (comments.length > 0) {
      let starTotal: number = 0;
      comments.map(_ => (starTotal += _.star));
      setStar(Number((starTotal / comments.length).toFixed(1)));
    }
  }, [comments]);

  const handleChangeHeart = () => {
    if (hearts[0]) {
      deleteDocData({
        nameCollect: 'hearts',
        id: hearts[0].id,
      });
    } else {
      addDocData({
        nameCollect: 'hearts',
        value: {
          productId: productId,
          userId: user?.uid,
        },
      });
    }
  };

  const handleAddCart = () =>
    addDocData({
      nameCollect: 'carts',
      value: {
        productId,
        userId: user?.uid,
        quantity: quantity > 0 ? quantity : 1,
      },
    });

  return product ? (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
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
        source={{ uri: product.url }}
        style={{
          width: sizes.width,
          height: '45%',
          resizeMode: 'contain',
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background1,
          paddingVertical: 20,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
            paddingVertical: 20,
            marginBottom: 0,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <RowComponent justify="space-between">
              <TextComponent
                text={`${product.price}`}
                font={fontFamillies.poppinsSemiBold}
                size={sizes.thinTitle}
                color={colors.primary}
              />

              <Heart
                size={20}
                onPress={handleChangeHeart}
                variant={hearts[0] ? 'Bold' : 'Linear'}
                color={hearts[0] ? colors.heart : colors.text}
              />
            </RowComponent>
            <TextComponent
              text={product.title}
              font={fontFamillies.poppinsSemiBold}
              size={sizes.smallTitle}
            />
            <TextComponent
              text={product.quantity}
              font={fontFamillies.poppinsMedium}
              color={colors.text}
            />
            <RowComponent
              styles={{
                alignItems: 'baseline',
              }}
            >
              <TextComponent
                text={`${star}`}
                font={fontFamillies.poppinsMedium}
              />
              <ListStarComponent star={star} />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ReviewsScreen', {
                    productId: product.id,
                  })
                }
              >
                <TextComponent
                  text={`${comments.length} reivew${
                    comments.length * 4 > 9 ? 's' : ''
                  }`}
                  color={colors.text}
                  font={fontFamillies.poppinsMedium}
                />
              </TouchableOpacity>
            </RowComponent>

            <View>
              <TextComponent
                text={product.description as string}
                color={colors.text}
                numberOfLine={isShowText ? undefined : 4}
              />
              {product.description &&
                product.description.length > 200 &&
                !isShowText && (
                  <TouchableOpacity onPress={() => setIsShowText(true)}>
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
                )}
            </View>

            <SpaceComponent height={16} />

            <RowComponent
              justify="space-between"
              styles={{
                backgroundColor: colors.background,
                paddingHorizontal: 16,
              }}
            >
              <TextComponent
                text="Quantity"
                font={fontFamillies.poppinsMedium}
                color={colors.text}
              />
              <RowComponent>
                <Entypo
                  size={18}
                  name="minus"
                  style={{
                    paddingRight: 16,
                  }}
                  color={colors.primary}
                  onPress={() =>
                    quantity <= 0 ? 0 : setQuantity(quantity - 1)
                  }
                />
                <TextComponent
                  text={`${quantity}`}
                  styles={{
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderLeftColor: colors.border,
                    borderRightColor: colors.border,
                    paddingVertical: 16,
                    width: 50,
                    textAlign: 'center',
                  }}
                  font={fontFamillies.poppinsMedium}
                  size={sizes.thinTitle}
                />
                <Entypo
                  size={18}
                  name="plus"
                  style={{
                    paddingLeft: 16,
                  }}
                  color={colors.primary}
                  onPress={() => setQuantity(quantity + 1)}
                />
              </RowComponent>
            </RowComponent>
          </ScrollView>
        </SectionComponent>

        <SectionComponent>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.primaryDark, colors.primary]}
            style={{ borderRadius: 5 }}
          >
            <ButtonComponent
              text={carts[0] ? 'Go to Cart' : 'Add to cart'}
              onPress={
                carts[0]
                  ? () => navigation.navigate('CartScreen')
                  : handleAddCart
              }
              color="transparent"
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
  ) : (
    <ActivityIndicator />
  );
};

export default ProductDetailsScreen;
