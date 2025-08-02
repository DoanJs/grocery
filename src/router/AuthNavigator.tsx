import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AuthHomeScreen, Login, Register, SwiperScreen } from '../screens'
import TabNavigator from './TabNavigator'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SwiperScreen' component={SwiperScreen} />
            <Stack.Screen name='AuthHomeScreen' component={AuthHomeScreen} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Main' component={TabNavigator} />

        </Stack.Navigator>
    )
}

export default AuthNavigator