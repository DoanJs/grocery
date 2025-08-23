import { where } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { auth } from '../../../firebase.config';
import {
  CartItemComponent,
  Container,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { onSnapshotData } from '../../constants/onSnapshotData';
import { ProductModel } from '../../models/ProductModel';


const HeartScreen = () => {
  const user = auth.currentUser
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [hearts, setHearts] = useState<any[]>([]);
  const [proHearts, setProHearts] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      onSnapshotData({
        nameCollect: 'products',
        setData: setProducts
      })

      onSnapshotData({
        nameCollect: 'hearts',
        setData: setHearts,
        conditions: [where('userId', '==', user?.uid)],
      });
    }
  }, [user])

  useEffect(() => {
    if (hearts && products) {
      let items: any[] = [];

      hearts.map((heart: any) => {
        const index = products.findIndex(
          (product: ProductModel) => product.id === heart.productId,
        );

        items.push({
          heart,
          product: products[index],
        });
      });

      setProHearts(items);
    }
  }, [products, hearts]);

  return (
    <Container bg={colors.background} back title="Favorites">
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 20,
          marginBottom: 0
        }}
      >
        <GestureHandlerRootView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {proHearts.map((_, index) => (
              <CartItemComponent
                key={index}
                product={_.product}
                heart={_.heart}
              />
            ))}
          </ScrollView>
        </GestureHandlerRootView>
      </SectionComponent>
    </Container>
  );
};

export default HeartScreen;
