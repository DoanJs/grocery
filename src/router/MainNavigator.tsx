import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CategoryScreen, ProductDetailsScreen } from '../screens';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen}/>
      <Stack.Screen name='CategoryScreen' component={CategoryScreen}/>
    </Stack.Navigator>
  );
};

export default MainNavigator;
