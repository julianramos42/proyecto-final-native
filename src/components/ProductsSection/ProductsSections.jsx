import React from 'react'
import { Text, View,StyleSheet,ScrollView,TouchableOpacity } from 'react-native'
import Dropdowns from '../Dropdowns/Dropdowns'

export default function ProductsSections() {
  return (
    <View style={styles.cont_products}>
      <View style={styles.cat_sort}>
        <Dropdowns/>
        <TouchableOpacity>
          <Text>Sort</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.allproducts}>

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    cont_products:{
        backgroundColor:'#F0F2F5',
        flex:0.6,
        width:'100%',
        display:'flex',
        alignItems:'center'
    },
    cat_sort:{
      flex:0.15,
      width:'90%',
      borderBottomColor:'rgba(0, 0, 0, 0.3)',
      borderBottomWidth:1,
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:40,
    },
    allproducts:{
      flex:0.85
    }
})