import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { AuthHomeScreen, Login, SwiperScreen } from '../screens'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SwiperScreen' component={SwiperScreen} />
            <Stack.Screen name='AuthHomeScreen' component={AuthHomeScreen} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}

export default AuthNavigator