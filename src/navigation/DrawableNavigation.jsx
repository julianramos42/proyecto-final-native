import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Index from '../screens/Index'
import Stores from '../screens/Stores'
import DetailsProduct from '../screens/DetailsProduct'

const Draw = createDrawerNavigator()

function DrawableNavigation() {
  return (
    //screenOptions={{ headerTransparent:true}}
    <Draw.Navigator screenOptions={{ headerTransparent:true}}>
        <Draw.Screen name='Home' component={Index}/>
        <Draw.Screen name='Stores' component={Stores}/>
        <Draw.Screen name='Details' component={DetailsProduct}/>
    </Draw.Navigator>
  )
}

export default DrawableNavigation