import React, { useCallback, useState,useEffect } from 'react'
import { View,Text,StyleSheet,Dimensions,FlatList,TouchableOpacity } from 'react-native'
import SearchFavorites from '../components/SearchFavorites/SearchFavorites';
import DropDownFav from '../components/DropDownFav/DropDownFav';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import CardFavorite from '../components/CardFavorites/CardFavorites';
import NoCardStores from '../components/NoCardStores/NoCardStores';
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Favorites() {

    const defaultText = useSelector(store => store.textFav.textFav)
    const defaultCategory = useSelector(store => store.categoriesFav.categoriesFav)
    const status = useSelector(store=>store.statusFav.statusFav)

    const [reload,setReload] = useState(false)
    const [favorites,setFavorites] = useState([])


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

    async function getFavorites(){
        let url = `http://192.168.0.113:8080/favourites/`
       if(token){
            try{
                const response = await axios.get(url,headers)
                setFavorites(response.data.favourites)
            }catch(err){
                console.log(err);
            }
       }
    }

    async function handleDelet(){
        let url = `http://192.168.0.113:8080/favourites/`
        if(token){
            try{
                const response = await axios.delete(url,headers)
                getFavorites()
            }catch(err){
                console.log(err);
            }
        }
    }

    let storeIds = [];
    favorites.forEach(favorite => {
        storeIds.push(favorite.store_id);
    });
    
    useFocusEffect(
        useCallback(()=>{
            getFavorites()
        },[token,status])
    )
    

  return (
 
    <View style={styles.contain}>
        <View style={styles.searchStores}>
            <SearchFavorites/>
        </View>
        <View style={styles.sectionStores}>
            <View style={styles.cont_drop}>
                <View style={styles.drop}>
                    <DropDownFav/>
                </View>
                <TouchableOpacity style={styles.btn_delete} onPress={handleDelet}>
                    <Text style={{fontSize:13,fontFamily:'Montserrat-Medium',color:'#F4F4F2'}}>CLEAR ALL FAVOURITES</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cont_cards}>
                <FlatList 
                  data={storeIds}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => (
                    <CardFavorite
                      id={item._id}
                      banner={item.banner}
                      photo={item.photo}
                      name={item.name}
                      cat={item.category}
                    />
                  )}
                  ListEmptyComponent={<NoCardStores text={defaultText} cat={defaultCategory}/>}
                  removeClippedSubviews={true}
                  maxToRenderPerBatch={10}
                  updateCellsBatchingPeriod={50}
                  initialNumToRender={6}
                  windowSize={21}
                />
            </View>
        </View>
    </View>
  )
}

const altura = Dimensions.get('window').height;
const styles = StyleSheet.create({
    contain:{
        flex:1,
        height:altura,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    searchStores:{
        flex:0.2,
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingBottom:18,
    },
    sectionStores:{
        flex:0.8,
        width:'100%',
        backgroundColor:'#E4E4E4',
        borderTopLeftRadius:21,
        borderTopRightRadius:21
    },
    cont_drop:{
        flex:0.35,
        width:'100%',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    cont_cards:{
        flex:0.65,
        width:'100%',
        backgroundColor:'#D7D7D7',
        borderTopLeftRadius:21,
        borderTopRightRadius:21
    },
    drop:{
        width:'90%',
        height:58,
        backgroundColor:'#495464',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'
    },
    btn_delete:{
        paddingHorizontal:20,
        paddingVertical:6,
        backgroundColor:'#495464',
        borderRadius:6
    }

})