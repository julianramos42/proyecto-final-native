import React from 'react'
import { Text,StatusBar,ScrollView } from 'react-native'
import Home from '../screens/Home'
import About from './About'

function Index() {
  return (
    <ScrollView>
      <Home/>
      <About/>
      <StatusBar style='auto'/>
    </ScrollView> 
  )
}

export default Index