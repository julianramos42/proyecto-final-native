import React from 'react'
import { View, Text,StyleSheet,Dimensions,ScrollView,TouchableOpacity } from 'react-native'
import CardCart from '../components/CardCart/CardCart';

export default function Cart() {
  return (
    <View style={styles.contain}>
        <View style={styles.header_cart}>
            <View style={styles.text_header}>
                <Text style={{fontSize:20,fontWeight:500,color:'#566270'}}>Cart (0)</Text>
            </View>
        </View>
        <View style={styles.products_cart}>
            <View style={{flex:1,width:'90%',borderBottomColor:'#999999',borderBottomWidth:1}}>
                <ScrollView>
                    <CardCart/>
                    <CardCart/>
                </ScrollView>
            </View>
        </View>
        <View style={styles.btn_cart}>
            <TouchableOpacity style={styles.btn} >
                <Text style={{fontSize:20,fontWeight:600,color:'white'}}>BUY CART</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} >
                <Text style={{fontSize:20,fontWeight:600,color:'#5BB35F'}}>DELETE CART</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const altura = Dimensions.get('window').height;
const styles = StyleSheet.create({
    contain:{
        flex:1,
        height:altura,
        backgroundColor:'#F0F2F5'
    },
    header_cart:{
        flex:0.08,
        display:'flex',
        alignItems:'center',
    },
    text_header:{
        flex:1,
        width:'90%',
        borderBottomColor:'#999999',
        borderBottomWidth:1,
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        paddingBottom:10,
    },
    products_cart:{
        flex:0.72,
        display:'flex',
        alignItems:'center',
    },
    btn_cart:{
        flex:0.2,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:15,
    },
    btn:{
        width:'85%',
        height:60,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5BB35F',
        borderRadius:20
    },
    btn2:{
        width:'85%',
        height:60,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(91, 179, 95, 0.34);',
        borderRadius:20
    }
})