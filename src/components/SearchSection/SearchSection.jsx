import React,{useState,useCallback} from 'react'
import { useFocusEffect,useRoute } from '@react-navigation/native'
import { Text, View,StyleSheet,ImageBackground,Image,TouchableOpacity } from 'react-native'
import ShopRoutes from '../ShopRoutes/ShopRoutes'
import SearchStore from '../SearchStore/SearchStore'
import axios from 'axios'


export default function SearchSection(props) {

    const [shop,setShop] = useState({})

    
    const id = props.id 
    let url = 'https://lance-app.onrender.com/shop/'+id

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
        },[id])
    )
    
  return (
    <View style={styles.cont_search}>
        <ImageBackground style={styles.img_Search} source={{uri:shop?.banner}} resizeMode='cover'>
            <View style={styles.mask} />
                <View style={styles.cont_Logo}>
                  <Image style={{ width: 113, height: 74, borderRadius: 50 }} source={{ uri: shop?.photo }} resizeMode='cover' />
                </View>
                <ShopRoutes id={shop?._id} />
                <View style={styles.search}>
                  <SearchStore />
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
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    }
})