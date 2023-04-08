import React from 'react'
import { Text, View,StyleSheet,ScrollView,TouchableOpacity,Image } from 'react-native'
import Dropdowns from '../Dropdowns/Dropdowns'
import CardProduct from '../CardProduct/CardProduct'

export default function ProductsSections() {
  const onPressFunction = () =>{
    console.log('navegar a details');
  }
  return (
    <View style={styles.cont_products}>
      <View style={styles.cat_sort}>
        <Dropdowns/>
        <TouchableOpacity style={styles.btn_sort}>
          <Text style={styles.text_sort}>Sort</Text>
          <Image  source={require('../../../images/flechaSort.png')} resizeMode='cover'/>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.allproducts}>
        {/* //enviar props con imagen,nombre y precio del producto */}
        <CardProduct press={onPressFunction}/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
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
    btn_sort:{
      width:50,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    text_sort:{
      fontSize:15,
      fontWeight:500,
      color: '#566270'
    },
    allproducts:{
      flex:0.85,
      width:'100%',
    }
})