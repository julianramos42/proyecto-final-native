import React from 'react'
import { View,Text,StyleSheet} from 'react-native'


export default function NoCardStores(props) {
    
  return (
    <View style={styles.contain}>
      <Text style={{fontSize:16,fontFamily:'Montserrat-Regular'}}>nothing found for search  " {props.text} "</Text>  
    <Text style={{fontSize:16,fontFamily:'Montserrat-Regular'}}>nothing found by the filter  " {props.cat} "</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
    contain:{
        width:'100%',
        height:450,
        marginTop:25,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
    },
})