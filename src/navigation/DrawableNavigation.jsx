import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Index from '../screens/Index'

const Draw = createDrawerNavigator()

function DrawableNavigation() {
  return (
    <Draw.Navigator>
        <Draw.Screen name='Home' component={Index}/>
    </Draw.Navigator>
  )
}

export default DrawableNavigation