import React,{useCallback,useEffect,useState} from 'react'
import { FlatList,View, Text,StyleSheet,Dimensions,TouchableOpacity,Image,ToastAndroid } from 'react-native'
import CardCart from '../components/CardCart/CardCart';
import { useFocusEffect, useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NoCardCat from '../components/NoCardCart/NoCardCat';
import { Linking } from 'react-native';


export default function Cart() {
    const navigation = useNavigation()
    const [products,setProducts] = useState([])
    let [shop,setShop] = useState({})
    let [reload, setReload] = useState(false)
    let [fullPrice, setFullPrice] = useState(0)

    const route = useRoute()
    const {id} = route.params

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
 

    const handleReturn = () => {
      navigation.navigate('Shop',{id:id})
    }

    async function getProducts(){
        if(token){
            try{
                let url = `https://lance-app.onrender.com/shop/${id}/cart`
                const response = await axios.get(url,headers)
                setProducts(response.data.products)
            }catch(err){
                console.log(err);
            }
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getProducts()
            handleMaxStock()
        },[reload])
    )

    const handleLessStock = async (productId) =>{
        if(token){
            try{
                let product = products.find(product => product._id === productId)
                if(product.quantity === 1){
                    let url = `https://lance-app.onrender.com/shop/cart/deleteone/${product._id}`
                    const response = await axios.delete(url,headers)
                    ToastAndroid.showWithGravity(response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                    setReload(!reload)
                }else{
                    let data = {
                        quantity: product.quantity -=1
                    }
                    let url = `https://lance-app.onrender.com/shop/cart/update/${product._id}`
                    const response = await axios.put(url,data,headers)
                    console.log(response.data.message);
                    setReload(!reload)
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    const handleMoreStock = async (productId) =>{
        if(token){
            try{

                let product = products.find(product => product._id === productId)
                if(product.quantity !== product.maxStock){
                    let data = {
                        quantity: product.quantity +=1
                    }
                    let url = `https://lance-app.onrender.com/shop/cart/update/${product._id}`
                    const response = await axios.put(url,data,headers)
                    console.log(response.data.message);
                    setReload(!reload)
                }
    
            }catch(err){
                console.log(err);
            }
        }
    }

    const deleteOne = async (productId) => {
        if(token){
            try{
                let url = `https://lance-app.onrender.com/shop/cart/deleteone/${productId}`
                const response = await axios.delete(url,headers)
                ToastAndroid.showWithGravity(response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                setReload(!reload)
            }catch(error){
                if (error.code === "ERR_NETWORK") {
                    console.log('Network Error')
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
    }

    const deleteAll = async () =>{
        if(token){
            try{

                let url = `https://lance-app.onrender.com/shop/${id}/cart/deleteall`
                const response = await axios.delete(url,headers)
                ToastAndroid.showWithGravity(response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                setReload(!reload)
            }catch(error){
                if (error.code === "ERR_NETWORK") {
                    console.log('Network Error')
                    ToastAndroid.showWithGravity('Network Error', ToastAndroid.LONG, ToastAndroid.TOP)
                } else {
                    if (typeof error.response.data.message === 'string') {
                        ToastAndroid.showWithGravity(error.response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                    } else if (error.response.data === 'Unauthorized'){
                        ToastAndroid.showWithGravity('Unauthorized, Register or log in', ToastAndroid.LONG, ToastAndroid.TOP)
                      }
                }
            }
        }
    }

    function handleMaxStock(){
        try{
            products.forEach( product => {
                if(product.quantity > product.maxStock){
                    let data = {
                        quantity: product.maxStock
                    }
                    let url = `https://lance-app.onrender.com/shop/cart/update/${product._id}`
                    axios.put(url, data, headers).then(res => ToastAndroid.showWithGravity('Some items stock has been modified because they exceed the limit', ToastAndroid.LONG, ToastAndroid.TOP))    
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        handleMaxStock()
    },[products])

    let shopUrl = `https://lance-app.onrender.com/shop/${id}`

    async function getShop(){
        try{
            const response = await axios.get(shopUrl)
            setShop(response.data.shop)
        }catch(err){
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getShop()
        },[id])
    )

    async function handlePay(){
        let data ={
            products,
            token: shop.token,
            shopId: shop._id
        }
        let url = `https://lance-app.onrender.com/payment`
        if(token){
            try{
                const response = await axios.post(url,data,headers)
                const puedeAbrir = await Linking.canOpenURL(response.data.response.body.init_point);
                if (puedeAbrir) {
                  await Linking.openURL(response.data.response.body.init_point);
                }
            }catch(err){
                ToastAndroid.showWithGravity(err.response.data.error, ToastAndroid.LONG, ToastAndroid.TOP)
            }
        }
    }


    useEffect(()=>{
        let template = 0
        products.map(product => {
            template += product.unit_price*product.quantity
        })
        setFullPrice(template)
    },[products])

  return (
    <View style={styles.contain}>
        <View style={styles.header_cart}>
            <View style={styles.text_header}>
                <Text style={{fontSize:20,fontFamily:'Montserrat-Medium',color:'#566270'}}>Cart ({products.length})</Text>
                <TouchableOpacity  style={{width:30,height:30 ,justifyContent:'center',alignItems:'center'}} onPress={handleReturn}>
                    <Image source={require('../../images/volver.png')} resizeMode='cover'/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.products_cart}>
            <View style={{flex:1,width:'90%',borderBottomColor:'#999999',borderBottomWidth:1}}>
                <FlatList 
                  data={products}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => (
                    <CardCart 
                      storeId={item.store_id}
                      id={item._id}
                      img={item.photo}
                      name={item.title}
                      price={item.unit_price}
                      des={item.description}
                      stock={item.quantity}
                      LessStock={handleLessStock}
                      MoreStock={handleMoreStock}
                      delet={deleteOne}
                    />
                  )}
                  ListEmptyComponent={<NoCardCat/>}
                  removeClippedSubviews={true}
                  maxToRenderPerBatch={10}
                  updateCellsBatchingPeriod={50}
                  initialNumToRender={6}
                  windowSize={21}
                />
            </View>
        </View>
        <View style={styles.btn_cart}>
            <TouchableOpacity style={styles.btn} >
                <Text style={{fontSize:20,fontFamily:'Montserrat-SemiBold',color:'white'}} onPress={handlePay}>BUY CART ({fullPrice})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} >
                <Text style={{fontSize:20,fontFamily:'Montserrat-SemiBold',color:'#161616'}} onPress={deleteAll}>CLEAR CART</Text>
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
        flex:0.1,
        display:'flex',
        alignItems:'center',
    },
    text_header:{
        flex:1,
        width:'90%',
        borderBottomColor:'#999999',
        borderBottomWidth:1,
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
        paddingBottom:4
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
        backgroundColor:'#161616',
        borderRadius:20
    },
    btn2:{
        width:'85%',
        height:60,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(22, 22, 22, 0.34)',
        borderRadius:20
    }
})