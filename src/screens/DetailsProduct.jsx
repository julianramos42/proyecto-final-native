import React,{useState,useCallback,useEffect} from 'react'
import { View,Text,StyleSheet,ScrollView,Image,TouchableOpacity,ToastAndroid } from 'react-native'
import InfoDetails from '../components/InfoDetails/InfoDetails';
import ReturnDetails from '../components/ReturnDetails/ReturnDetails';
import Description from '../components/Description/Description';
import axios from 'axios'
import { useFocusEffect,useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailsProduct() {

    const [detail,setDetail] = useState({})
    const [shop,setShop] = useState({})
    const [count,setCount] = useState(0)
    const [maxStock,setMaxStock] = useState(1)

    const route = useRoute();
    const { id,productId } = route.params;

    const [token, setToken] = useState(null);
    useFocusEffect(
        useCallback(() => {
          const getTokenAndUser = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);
          };
          getTokenAndUser();
        }, [])
    );

    let url = 'http://192.168.0.113:8080/product/' + id

    useFocusEffect(
        useCallback(()=>{
            async function getDetail(){

                try{
                    const response = await axios.get(url)
                    setDetail(response.data.product)

                }catch(err){
                    console.log(err);
                }
            }
            getDetail()
        },[id])
    )

    let ShopId = detail?.store_id 
    let urlShop = 'http://192.168.0.113:8080/shop/'+ ShopId

    async function getShop(){
        if (ShopId) { 
            setTimeout(async () => { 
                try{
                    const response = await axios.get(urlShop)
                    setShop(response.data.shop)
                }catch(err){
                    console.log(err);
                }
            }, 500);
        }
    }

    useEffect(()=>{
        setMaxStock(detail?.stock)
    },[detail])
    
    useEffect(() => {
        getShop();
    }, [ShopId]); 


    const handleRest = () => {
        if (count !== 0){
            setCount(count - 1)
            detail.stock++
        }
        
    }

    const handleSum = () => {
        if(count !== maxStock){
            setCount(count + 1)
            detail.stock--
        }
    }


    const handleCart = async () => {
        try{
            if(ShopId){
                if(count !== 0){
                    let url = `http://192.168.0.113:8080/shop/${ShopId}/createcartproduct`
                    let headers = {headers:{'Authorization': `Bearer ${token}`}}
                    let data = {
                        ...detail,
                        maxStock: maxStock
                    }
                    data.stock = count
                    const response = await axios.post(url,data,headers)
                        ToastAndroid.showWithGravity(response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                        setCount(0)
                        setMaxStock(detail.stock)
                }else{;
                    ToastAndroid.showWithGravity('The stock cannot be 0', ToastAndroid.LONG, ToastAndroid.TOP)
                }
            }
            
        }catch(error){
            console.log(error);
            if (error.code === "ERR_NETWORK") {
                ToastAndroid.showWithGravity('Network Error', ToastAndroid.LONG, ToastAndroid.TOP)
            } else {
                if (typeof error.response.data.message === 'string') {
                  ToastAndroid.showWithGravity(error.response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                } else {
                  error.response.data.message.forEach(err => ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP))
                }
            }
        }
    }    

  return (
    <ScrollView style={styles.contain_details}> 
            <View style={styles.cont_img}>
                <ReturnDetails id={productId}/>
                <InfoDetails photo={detail?.photo} category={detail?.category} name={detail?.name} price={detail?.price}/>
            </View>
            <View style={styles.cont_description}>
                <View style={styles.count_item}>
                    <View style={styles.count}>
                        <TouchableOpacity style={styles.btn_count} onPress={handleRest}>
                            <Text style={{fontSize:16,fontFamily:'Montserrat-Regular'}}>-</Text>
                        </TouchableOpacity>
                        <View style={styles.number}>
                            <Text style={{fontSize:16,fontFamily:'Montserrat-Regular'}}>{count}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn_count}>
                            <Text style={{fontSize:16,fontFamily:'Montserrat-Regular'}} onPress={handleSum}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Description des={detail?.description} stock={detail?.stock}/>
            </View>
            <View style={styles.cont_btn}>
                <View style={styles.btn_cart}>
                    <TouchableOpacity style={styles.btn} onPress={handleCart}>
                        <Text style={{fontSize:20,fontFamily:'Montserrat-SemiBold',color:'white'}} onPress={handleCart}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <View style={styles.logo_foot}>
                        <Image style={{width:113,height:74,borderRadius:50}} source={{uri:shop?.photo}} resizeMode='cover'/>
                    </View>
                    <Text style={styles.text_foot}>© 2023 Mindhub</Text>
                </View>
            </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    contain_details:{
        flex:1,
        backgroundColor:'#F0F2F5'
    },
    cont_img:{
        height:560,
        width:'100%',
        display:'flex',
        alignItems:'center',
        gap:25,
    },
    cont_description:{
        height:433,
        width:'100%',
    },
    cont_btn:{
        height:430,
        width:'100%',
    },
    count_item:{
        flex:0.1,
        display:'flex',
        alignItems:'flex-end',
        paddingRight:23,
    },
    count:{
        width:'50%',
        flex:1,
        borderColor:'#999999',
        borderWidth:1,
        display:'flex',
        flexDirection:'row',
    },
    btn_count:{
        flex:0.275,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    number:{
        flex:0.45,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'#999999',
        borderRightWidth:1,
        borderLeftColor:'#999999',
        borderLeftWidth:1,
    },
    btn_cart:{
        flex:0.3,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        width:'85%',
        height:70,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#5BB35F',
        borderRadius:20
    },
    footer:{
        flex:0.7,
        display:'flex',
        alignItems:'center',
        backgroundColor:'#566270'
    },
    logo_foot:{
        flex:0.6,
        width:'80%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'#FFFFFF',
        borderBottomWidth:1,
    },
    text_foot:{
        flex:0.4,
        width:'100%',
        textAlign:'center',
        paddingTop:21,
        fontSize:20,
        fontFamily:'Montserrat-Regular',
        color:'white'
    }

})