import React from 'react'
import { View,Text,StyleSheet,Image } from 'react-native'

export default function InfoDetails(props) {

    

  return (
    <View style={styles.contain}>
        <Image style={styles.img_product} source={{uri:props.photo}} resizeMode='cover'/>
        <View style={styles.cont_info}>
            <Text style={styles.category}>{props.category}</Text>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.price}>${props.price}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contain:{
        height:433,
        width:381,
        display:'flex',
        gap:8,
    },
    img_product:{
        width:'100%',
        height:319,
        borderRadius:8
    },
    cont_info:{
        paddingLeft:10
    }
    ,
    category:{
        color:'#999999',
        fontSize:16,
        fontWeight:400
    },
    name:{
        fontSize:40,
        fontWeight:500
    },
    price:{
        fontSize:20,
        fontWeight:500
    }
})