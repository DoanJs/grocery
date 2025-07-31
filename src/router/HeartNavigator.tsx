import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HeartScreen } from '../screens'

const HeartNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HeartScreen' component={HeartScreen} />
        </Stack.Navigator>
    )
}

export default HeartNavigator