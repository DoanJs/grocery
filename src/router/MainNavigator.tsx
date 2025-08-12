import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CartScreen, CategoriesScreen, CategoryProductScreen, FilterScreen, HeartScreen, ProductDetailsScreen } from '../screens';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen} />
      <Stack.Screen name='CategoriesScreen' component={CategoriesScreen} />
      <Stack.Screen name='CategoryProductScreen' component={CategoryProductScreen} />
      <Stack.Screen name='CartScreen' component={CartScreen} />
      <Stack.Screen name='FilterScreen' component={FilterScreen} />
      <Stack.Screen name='HeartScreen' component={HeartScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
