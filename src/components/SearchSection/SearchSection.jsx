import React,{useState,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Text, View,StyleSheet,ImageBackground,Image,TouchableOpacity } from 'react-native'
import ShopRoutes from '../ShopRoutes/ShopRoutes'
import SearchStore from '../SearchStore/SearchStore'
import axios from 'axios'


export default function SearchSection() {

    const [shop,setShop] = useState({})

    const id = '642c487e7b721ca6a2bf0a47' // id que llega por params
    let url = 'http://192.168.0.113:8080/shop/'+id

    useFocusEffect(
        useCallback(()=>{
            async function getShop(){
                try{
                    const response = await axios.get(url)
                    setShop(response.data.shop)
                }catch(err){
                    console.log(err);
                }
            }
            getShop()
        },[])
    )

  return (
    <View style={styles.cont_search}>
        <ImageBackground style={styles.img_Search} source={{uri:shop?.banner}} resizeMode='cover'>
            <View style={styles.cont_Logo} >
                <Image style={{width:113,height:74,borderRadius:50}} source={{uri:shop?.photo}} resizeMode='cover'/>
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