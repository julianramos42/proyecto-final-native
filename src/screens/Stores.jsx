import React from 'react'
import { Text, View,Dimensions,StyleSheet,ScrollView  } from 'react-native'
import SearchSection from '../components/SearchSection/SearchSection';
import ProductsSections from '../components/ProductsSection/ProductsSections';


const altura = Dimensions.get('window').height;
export default function Stores() {
  return (
    <ScrollView>
        <View style={{flex:1,height:altura}}>
            <SearchSection/>
            <ProductsSections/>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
   
})