import React from 'react'
import { Text, View,TouchableOpacity,StyleSheet } from 'react-native'


export default function BtnIndex(props) {
  return (
    <TouchableOpacity style={[styles.btn_index,{backgroundColor:props.bg}]}>
        <Text style={[styles.text_btn,{color:props.color}]}>{props.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn_index:{
        paddingHorizontal:71,
        paddingVertical:12,
        borderRadius:50
    },
    text_btn:{
        fontSize:24,
        fontFamily:'Montserrat-SemiBold'
    }
})