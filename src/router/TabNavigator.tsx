import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import CartNavigator from './CartNavigator'
import HeartNavigator from './HeartNavigator'
import HomeNavigator from './HomeNavigator'
import ProfileNavigator from './ProfileNavigator'

const TabNavigator = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={HomeNavigator} />
            <Tab.Screen name='Heart' component={HeartNavigator} />
            <Tab.Screen name='Cart' component={CartNavigator} />
            <Tab.Screen name='Profile' component={ProfileNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator