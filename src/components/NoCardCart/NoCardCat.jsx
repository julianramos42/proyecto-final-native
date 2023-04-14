import React from 'react'
import { View,Text,StyleSheet } from 'react-native'

export default function NoCardCat() {
  return (
    <View style={styles.contain}>
        <Text style={{fontSize:16,fontFamily:'Montserrat-Regular'}}>THERE IS NOTHING IN THE CART</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    contain:{
        height:560,
        width:'100%',
        marginTop:24,
        borderBottomColor:'#999999',
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
})    