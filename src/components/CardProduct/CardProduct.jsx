import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Image } from 'react-native'

export default function CardProduct() {
  return (
    <View style={styles.contain}> 
            <View style={styles.contain_Card}>
                <TouchableOpacity>
                <Image style={styles.img_product} source={require('../../../images/product.png')} resizeMode='cover'/>
                </TouchableOpacity>
                <Text style={styles.name_product}>Monstera Deliciosa</Text>
                <Text style={styles.price}>$89</Text>
            </View>
    </View>
  )
}
const styles = StyleSheet.create({
    contain:{
        height:418,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    contain_Card:{
        width:400,
        height:400,
        padding:10,
        borderBottomColor:'rgba(0, 0, 0, 0.3)',
        borderBottomWidth:1,
    },
    img_product:{
        width:380,
        height:319,
        borderRadius:8
    },
    name_product:{
        color:'#566270',
        fontSize:20,
        fontWeight:500
    },
    price:{
        color:'#081323',
        fontSize:24,
        fontWeight:500
    }
})