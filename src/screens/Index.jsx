import React from 'react'
import { Text,StatusBar,ScrollView } from 'react-native'
import Home from '../screens/Home'
import About from './About'
import Customers from './Customers'
import Contact from './Contact'

function Index() {
  return (
    <ScrollView>
      <Home/>
      <About/>
      <Customers/>
      <Contact/>
      <StatusBar style='auto'/>
    </ScrollView> 
  )
}

export default Index