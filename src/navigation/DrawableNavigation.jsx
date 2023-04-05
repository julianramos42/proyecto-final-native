import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Index from '../screens/Index'
import Register from '../screens/Register'

const Draw = createDrawerNavigator()

function DrawableNavigation() {
  return (
    <Draw.Navigator>
        <Draw.Screen name='Home' component={Index}/>
        <Draw.Screen name='Register' component={Register} options={{headerShown: false}} />
    </Draw.Navigator>
  )
}

export default DrawableNavigation