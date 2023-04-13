import React, { useCallback, useState,useEffect } from 'react'
import { View,Text,StyleSheet,Dimensions,FlatList } from 'react-native'
import SearchStores from '../components/SearchStores/SearchStores';
import DropDownStores from '../components/DropDownStores/DropDownStores';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import CardStores from '../components/CardStores/CardStores';
import NoCardStores from '../components/NoCardStores/NoCardStores';
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Stores() {

    const defaultText = useSelector(store => store.textStores.textStores)
    const defaultCategory = useSelector(store => store.categoriesStores.categoriesStores)


    const [reload,setReload] = useState(false)
    const [shops,setShops] = useState({})
    

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

    async function getShops(){
        let url = `http://192.168.0.113:8080/shop?name=${defaultText}&category=${defaultCategory}`
        try{
            const response = await axios.get(url)
            setShops(response.data.shops)
        }catch(err){
            console.log(err);
        }
    }



    useFocusEffect(
        useCallback(()=>{
            getShops()
        },[defaultText,defaultCategory])
    )
    

  return (
 
    <View style={styles.contain}>
        <View style={styles.searchStores}>
            <SearchStores/>
        </View>
        <View style={styles.sectionStores}>
            <View style={styles.cont_drop}>
                <View style={styles.drop}>
                    <DropDownStores/>
                </View>
            </View>
            <View style={styles.cont_cards}>
                <FlatList 
                  data={shops}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => (
                    <CardStores
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
        flex:0.2,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    cont_cards:{
        flex:0.8,
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

})