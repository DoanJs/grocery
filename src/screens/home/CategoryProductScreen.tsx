import { where } from '@react-native-firebase/firestore';
import { Setting5 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { auth } from '../../../firebase.config';
import {
  Container,
  ProductItemComponent,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { onSnapshotData } from '../../constants/onSnapshotData';
import { ProductModel } from '../../models/ProductModel';

const CategoryProductScreen = ({ navigation, route }: any) => {
  const user = auth.currentUser;
  const { category } = route.params;
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    if (category) {
      onSnapshotData({
        nameCollect: 'products',
        setData: setProducts,
        conditions: [where('category', '==', category)],
      });

      onSnapshotData({
        nameCollect: 'hearts',
        setData: setHearts,
        conditions: [where('userId', '==', user?.uid)],
      });

      onSnapshotData({
        nameCollect: 'carts',
        setData: setCarts,
        conditions: [where('userId', '==', user?.uid)],
      });
    }
  }, [category]);

  return (
    <Container
      bg={colors.background}
      back
      title={category}
      right={<Setting5 onPress={() => {}} size={24} color={colors.text2} />}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionComponent
          styles={{
            backgroundColor: colors.background1,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {products.map((_, index) => (
            <ProductItemComponent
              key={index}
              onPress={() =>
                navigation.navigate('ProductDetailsScreen', {
                  productId: _.id,
                })
              }
              product={_}
              cart={carts.filter(pro => pro.productId === _.id)}
              heart={hearts.filter(pro => pro.productId === _.id)}
            />
          ))}
        </SectionComponent>
      </ScrollView>
    </Container>
  );
};

export default CategoryProductScreen;
