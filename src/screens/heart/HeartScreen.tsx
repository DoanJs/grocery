import React from 'react';
import { ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import avacodaItem from '../../assests/images/avacodaItem.png';
import broccoliItem from '../../assests/images/broccoliItem.png';
import grapesItem from '../../assests/images/grapesItem.png';
import pineappleItem from '../../assests/images/pineappleItem.png';
import {
  CartItemComponent,
  Container,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
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
const HeartScreen = () => {
  return (
    <Container bg={colors.background} back title="Favorites">
      <SectionComponent
        styles={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 20,
        }}
      >
        <GestureHandlerRootView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data1.map((_, index) => (
              <CartItemComponent key={index} product={_} />
            ))}
          </ScrollView>
        </GestureHandlerRootView>
      </SectionComponent>
    </Container>
  );
};

export default HeartScreen;
