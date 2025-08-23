import { where } from '@react-native-firebase/firestore';
import { ArrowRight2, SearchNormal1, Setting5 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { auth } from '../../../firebase.config';
import swiper01Png from '../../assests/images/swiper01.png';
import swiper02Png from '../../assests/images/swiper02.png';
import swiper03Png from '../../assests/images/swiper03.png';
import swiper04Png from '../../assests/images/swiper04.png';
import {
  CategoryItem,
  Container,
  ProductItemComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { categories } from '../../constants/categories';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { onSnapshotData } from '../../constants/onSnapshotData';
import { sizes } from '../../constants/sizes';
import { ProductModel } from '../../models/ProductModel';

const HomeScreen = ({ navigation, route }: any) => {
  const user = auth.currentUser;
  const { params } = route
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [hearts, setHearts] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      if (params && params.conditions.length > 0) {
        onSnapshotData({
          nameCollect: 'products',
          setData: setProducts,
          conditions: params.conditions
        });
      } else {
        onSnapshotData({
          nameCollect: 'products',
          setData: setProducts,
        });
      }

      onSnapshotData({
        nameCollect: 'hearts',
        setData: setHearts,
        conditions: [where('userId', '==', user.uid)],
      });

      onSnapshotData({
        nameCollect: 'carts',
        setData: setCarts,
        conditions: [where('userId', '==', user.uid)],
      });
    }
  }, [user, params]);

  return (
    <Container>
      <SectionComponent
        styles={{
          marginTop: 60,
          marginBottom: 0,
        }}
      >
        <RowComponent
          justify="space-between"
          styles={{
            paddingHorizontal: 20,
            paddingVertical: 16,
            backgroundColor: colors.background1,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <RowComponent onPress={() => navigation.navigate('SearchScreen')}>
            <SearchNormal1 color={colors.text} size={26} />
            <SpaceComponent width={10} />
            <TextComponent
              text="Search keywords.."
              color={colors.text}
              font={fontFamillies.poppinsMedium}
              size={sizes.bigText}
            />
          </RowComponent>
          <TouchableOpacity onPress={() => navigation.navigate('FilterScreen', {
            valueCondition: params?.valueCondition
          })}>
            <Setting5 size={26} color={colors.text} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>

      <SectionComponent
        styles={{
          height: '30%',
        }}
      >
        <Swiper
          loop={false}
          onIndexChanged={num => setIndex(num)}
          index={index}
          style={{
            backgroundColor: 'coral',
          }}
          showsPagination={false}
        >
          <Image source={swiper01Png} style={localStyle.image} />
          <Image source={swiper02Png} style={localStyle.image} />
          <Image source={swiper03Png} style={localStyle.image} />
          <Image source={swiper04Png} style={localStyle.image} />
        </Swiper>

        <View style={localStyle.swNext}>
          <RowComponent>
            {Array.from({ length: 4 }).map((_, i) => {
              return (
                <View
                  key={i}
                  style={
                    i === index ? localStyle.swActiveDot : localStyle.swDot
                  }
                />
              );
            })}
          </RowComponent>
        </View>
      </SectionComponent>

      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionComponent>
          <RowComponent justify="space-between">
            <TextComponent
              text="Categories"
              font={fontFamillies.poppinsBold}
              size={sizes.thinTitle}
            />
            <ArrowRight2
              size={sizes.thinTitle}
              color={colors.text}
              onPress={() => navigation.navigate('CategoriesScreen')}
            />
          </RowComponent>

          <SpaceComponent height={10} />

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((_, ind) => (
              <CategoryItem
                onPress={() => navigation.navigate('CategoryProductScreen', {
                  category: _.name
                })}
                key={ind}
                text={_.name}
                bg={_.color}
                uri={_.url}
              />
            ))}
          </ScrollView>
        </SectionComponent>

        <SectionComponent>
          <RowComponent justify="space-between">
            <TextComponent
              text="Featured products"
              font={fontFamillies.poppinsBold}
              size={sizes.thinTitle}
            />
            <TouchableOpacity onPress={() => { }}>
              <ArrowRight2 size={sizes.thinTitle} color={colors.text} />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>

        <View
          style={{
            backgroundColor: colors.background1,
            height: sizes.height,
            paddingVertical: 20,
          }}
        >
          <SectionComponent
            styles={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {products.map((_, index) => (
              <ProductItemComponent
                onPress={() =>
                  navigation.navigate('ProductDetailsScreen', {
                    productId: _.id,
                  })
                }
                key={index}
                product={_}
                cart={carts.filter(pro => pro.productId === _.id)}
                heart={hearts.filter(pro => pro.productId === _.id)}
              />
            ))}
          </SectionComponent>
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
const localStyle = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  swNext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 10,
  },
  swDot: {
    height: 6,
    width: 6,
    borderRadius: 100,
    backgroundColor: colors.background,
    marginHorizontal: 2,
  },
  swActiveDot: {
    height: 6,
    width: 20,
    borderRadius: 100,
    backgroundColor: colors.primary,
    marginHorizontal: 2,
  },
});
