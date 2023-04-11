import React from 'react'
import { View,Text,StyleSheet } from 'react-native'

export default function NoCard(props) {
  return (
    <View style={styles.contain}> 
        <Text style={{fontSize:16,fontWeight:400}}>nothing found for search  " {props.text} "</Text>  
        <Text style={{fontSize:16,fontWeight:400}}>nothing found by the filter  " {props.cat} "</Text>  
    </View>
  )
}

const styles = StyleSheet.create({
    contain:{
        height:418,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:20
    },
})