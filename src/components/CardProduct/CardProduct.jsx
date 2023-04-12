import React from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Image,Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function CardProduct(props) {

  const navigation = useNavigation()

  const onPressFunction = () =>{
    setTimeout(()=>{
      navigation.navigate('Details',{id:props.id,productId:props.storeId})
    },1000)
  }

  return (
    <View style={styles.contain}> 
        <Pressable onPress={onPressFunction}>
          {({ pressed }) => (
            <View style={[styles.contain_Card, pressed && styles.pressed]}>
              <Image style={styles.img_product} source={{uri:props.img}} resizeMode='cover'/>
              <Text style={styles.name_product}>{props.name}</Text>
              <Text style={styles.price}>${props.price}</Text>
            </View>
          )}
        </Pressable>        
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
        fontFamily:'Montserrat-Medium'
    },
    price:{
        color:'#081323',
        fontSize:24,
        fontFamily:'Montserrat-Medium'
    },
    pressed: {
    opacity: 0.5,
    },
})