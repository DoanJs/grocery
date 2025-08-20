import {
  collection,
  onSnapshot,
  query,
} from '@react-native-firebase/firestore';
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
import { auth, db } from '../../../firebase.config';
import grapesItem from '../../assests/images/grapesItem.png';
import peachItem from '../../assests/images/peachItem.png';
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
import { sizes } from '../../constants/sizes';
import { ProductModel } from '../../models/ProductModel';

const dataHeart = [
  {
    id: 1,
    title: 'Fresh Peach',
    description: 'dozen',
    price: 8.0,
    source: peachItem,
  },
];
const dataCart = [
  {
    id: 4,
    title: 'Black Grapes',
    description: '5.0 lbs',
    price: 7.05,
    source: grapesItem,
  },
];
const HomeScreen = ({ navigation }: any) => {
  const user = auth.currentUser;
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    if (user) {
      getProducts();
    }
  }, [user]);

  const getProducts = async () => {
    setIsLoading(true);
    const q = query(
      collection(db, 'products'),
      // where('uids', 'array-contains', user?.uid),
    );
    await onSnapshot(q, doc => {
      if (doc.empty) {
        setIsLoading(false);
        console.log(`Products data not found`);
      } else {
        const items: any = [];

        doc.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });

        setProducts(items);

        setIsLoading(false);
      }
    });
  };
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
          <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')}>
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
                onPress={() => navigation.navigate('CategoryProductScreen')}
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
            <TouchableOpacity onPress={() => {}}>
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
                onPress={() => navigation.navigate('ProductDetailsScreen')}
                key={index}
                product={_}
                isCart={dataCart.filter(pro => pro.id === _.id).length > 0}
                isHeart={dataHeart.filter(pro => pro.id === _.id).length > 0}
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
