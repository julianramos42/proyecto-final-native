import React from 'react'
import { View,Text,StyleSheet } from 'react-native'

export default function Description(props) {
  return (
    <View style={styles.description}>
        <View style={styles.title}>
            <View style={styles.cont_des}>
                <Text style={{fontSize:20,fontFamily:'Montserrat-Medium',}}>DESCRIPTION</Text>
            </View>
            <Text style={{fontSize:14,fontFamily:'Montserrat-Regular',}}>Only {props.stock} items in stock</Text>
        </View>        
        <View style={styles.text_description}>
            <Text style={styles.text}>{props.des}</Text>
        </View>   
    </View>
  )
}

const styles = StyleSheet.create({
    description:{
        flex:0.9,
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    title:{
        flex:0.2,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:25,
    },
    cont_des:{
        width:148,
        height:38,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:2,
    },
    text_description:{
        flex:0.4,
        width:382,
    },
    text:{
        width:355,
        fontSize:16,
        fontFamily:'Montserrat-Regular',
        lineHeight: 22, 
        letterSpacing: 0.5,
    }
})