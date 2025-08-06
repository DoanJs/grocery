import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProductDetailsScreen } from '../screens';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen}/>
    </Stack.Navigator>
  );
};

export default MainNavigator;
