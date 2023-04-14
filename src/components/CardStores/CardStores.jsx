import React,{useCallback, useEffect, useState} from 'react'
import { View,Text,StyleSheet,ImageBackground,TouchableOpacity,Image } from 'react-native'
import { Icon } from '@rneui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CardStores(props) {

    const navigation = useNavigation()
    const [iconColor, setIconColor] = useState('white');
    const [ShopFavorites,setShopFavorites] = useState([])
    const [reload,setReload] = useState(false)


    const handleNavigation = () => {
        navigation.navigate('Shop',{id:props.id})
    }

    const [token, setToken] = useState(null);
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    useFocusEffect(
        useCallback(() => {
          const getTokenAndUser = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
            setReload(!reload)
          };
          getTokenAndUser();
        }, [])
    );

    async function addFavorite(FavoriteId){
        let url = `http://192.168.0.113:8080/favourites/${FavoriteId}`
        if(token){
            try{
                const response = await axios.post(url,'',headers)
                getStoresFavorites()
            }catch(err){
                console.log(err);
            }
        }
    }

    async function deleteFavorite(FavoriteId){
        let url = `http://192.168.0.113:8080/favourites/${FavoriteId}`
        if(token){
            try{
                const response = await axios.delete(url,headers)
                getStoresFavorites()
            }catch(err){
                console.log(err);
            }
        }
    }

    async function getStoresFavorites(){
        setReload(true)
        if(token){
            let url = 'http://192.168.0.113:8080/favourites/'
            try{
                const response = await axios.get(url,headers)
                setShopFavorites(response.data.favourites)
            }catch(err){
                console.log(err);
            }
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getStoresFavorites()
        },[token])
    )

    useFocusEffect(
        useCallback(()=>{
            function ReloadFavorites (){
                const isFavorite = ShopFavorites && ShopFavorites.some(
                  (favorites) => favorites.store_id._id === props.id
                );
                setIconColor(isFavorite ? 'red' : 'white');
            }
            ReloadFavorites()
        },[ShopFavorites])
    )

    const handleHeartPress = (FavoriteId) => {
      const isFavorite = ShopFavorites && ShopFavorites.some(
        (favorites) => favorites.store_id._id == FavoriteId
      );
      setIconColor(isFavorite ? 'white' : 'red');
      if (isFavorite) {
        deleteFavorite(FavoriteId);
      } else {
        addFavorite(FavoriteId);
      }
    };
    

  return (
    <View style={styles.contain}>
        <View style={styles.card}>
            <ImageBackground style={styles.cont_banner} source={{uri:props.banner}} resizeMode='cover'>
                <TouchableOpacity onPress={() => { handleHeartPress(props.id) }}>
                    <Icon style={{margin:10}} name='favorite' type="material" size={30} color={token?iconColor:'white'}/>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.cont_name}>
                <Text style={{paddingTop:45,fontSize:14,fontFamily:'Montserrat-SemiBold'}}>{props.name}</Text>
                <Text style={{fontSize:12,fontFamily:'Montserrat-Regular'}}>{props.cat}</Text>
                <TouchableOpacity style={{paddingVertical:4,paddingHorizontal:6,backgroundColor:'#495464',marginTop:10,borderRadius:4}} onPress={handleNavigation}>
                    <Text style={{fontSize:12,fontFamily:'Montserrat-SemiBold',color:'white'}}>Visit Store</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.img_photo} >
            <Image style={{flex:1}} source={{uri:props.photo}}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contain:{
        width:'100%',
        height:236,
        marginTop:25,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
    },
    card:{
        flex:1,
        width:'90%',
        borderRadius:6,
        overflow: 'hidden',
    },
    cont_banner:{
        flex:0.4,
        alignItems:'flex-end'
    },
    cont_name:{
        flex:0.6,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    img_photo:{
        width: 120,
        height: 120,
        position: 'absolute',
        left: '50%',
        marginLeft: -60,
        top: 28,
        borderRadius:8,
        elevation: 8,
        overflow: 'hidden',
    }
})