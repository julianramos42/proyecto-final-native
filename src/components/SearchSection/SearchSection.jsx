import React,{useState} from 'react'
import { Text, View,StyleSheet,ImageBackground,Image,TouchableOpacity } from 'react-native'
import ShopRoutes from '../ShopRoutes/ShopRoutes'
import SearchStore from '../SearchStore/SearchStore'

export default function SearchSection() {
  return (
    <View style={styles.cont_search}>
        <ImageBackground style={styles.img_Search} source={require('../../../images/img_stores.png')} >
            <View style={styles.cont_Logo} >
                <Image source={require('../../../images/logo_stores.png')}/>
            </View>
            <ShopRoutes/>
            <View style={styles.search}>
                <SearchStore/>           
            </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    cont_search:{
        flex:0.4,
        width:'100%'
    },
    img_Search:{
        flex:1,
        resizeMode:'cover',
    },
    cont_Logo:{
        flex:0.4,
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    search:{
        flex:0.4,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
})