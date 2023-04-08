import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Customers from '../screens/Customers'
import Contact from "../screens/Contact"

const Draw = createDrawerNavigator()

function DrawableNavigation() {
  return (
    <Draw.Navigator>
        {/* <Draw.Screen name='Home' component={Customers}/> */}
        <Draw.Screen name='Home' component={Contact}/>
    </Draw.Navigator>
  )
}

export default DrawableNavigation