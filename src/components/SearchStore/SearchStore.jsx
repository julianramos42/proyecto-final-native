import React from 'react'
import { View,Text,StyleSheet,Image,TextInput } from 'react-native'

export default function SearchStore() {
  return (
    <View style={style.contain_search}>
        <Image source={require('../../../images/lupa.png')}/>
        <TextInput style={style.input_search} placeholder='Find your product'/>
    </View>
  )
}

const style = StyleSheet.create({
    contain_search:{
        backgroundColor:'white',
        width:371,
        height:55,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:16,
        borderRadius:10,
        gap:24
    },
    input_search:{
        width:287,
        fontSize:17,
    }
})