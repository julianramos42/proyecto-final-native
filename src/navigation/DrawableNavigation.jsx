import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Index from '../screens/Index'
import Register from '../screens/Register'
import Login from '../screens/Login'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { useState } from 'react'

const Draw = createDrawerNavigator()

function DrawableNavigation() {
  let [token, setToken] = useState('')
  let [user, setUser] = useState('')

  useFocusEffect(React.useCallback(() => {
    async function getData() {
      try {
        const value = await AsyncStorage.getItem('token');
        setToken(value)
        const value2 = await AsyncStorage.getItem('user');
        setUser(value2)
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []));

  return (
    <Draw.Navigator>
      <Draw.Screen name='Home' component={Index} />
      <Draw.Screen name='Register' component={Register} options={{ headerShown: false }} />
      <Draw.Screen name='Login' component={Login} options={{ headerShown: false }} />
    </Draw.Navigator>
  )
}

export default DrawableNavigation