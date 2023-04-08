import React from 'react'
import { View,Image,TouchableOpacity,StyleSheet } from 'react-native'

export default function ReturnDetails() {
    const miFuncion = () => {
        console.log('hola');
      }
  return (
    <View style={styles.volver}>    
        <TouchableOpacity style={styles.btn_volver} onPress={miFuncion}>
          <Image source={require('../../../images/volver.png')} resizeMode='cover'/>
        </TouchableOpacity>   
    </View>
  )
}
const styles = StyleSheet.create({
    volver:{
        height:90,
        width:'90%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        paddingBottom:4,
        borderBottomColor:'rgba(0, 0, 0, 0.3)',
        borderBottomWidth:1,
    },
    btn_volver:{
        width:30,
        height:30,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
})