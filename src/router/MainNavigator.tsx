import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  AboutMeScreen,
  AddAdressScreen,
  AddressScreen,
  CartScreen,
  CategoriesScreen,
  CategoryProductScreen,
  FilterScreen,
  HeartScreen,
  MyOrderScreen,
  NotificationsScreen,
  ProductDetailsScreen,
  TransactionsScreen,
} from '../screens';
import SearchScreen from '../screens/home/SearchScreen';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen
        name="CategoryProductScreen"
        component={CategoryProductScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="HeartScreen" component={HeartScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen name="AddAdressScreen" component={AddAdressScreen} />
      <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
      <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
      <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
