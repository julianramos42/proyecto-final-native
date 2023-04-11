import React,{useCallback,useEffect,useState} from 'react'
import { FlatList,View, Text,StyleSheet,Dimensions,ScrollView,TouchableOpacity,Image } from 'react-native'
import CardCart from '../components/CardCart/CardCart';
import { useFocusEffect, useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NoCardCat from '../components/NoCardCart/NoCardCat';


export default function Cart() {
    const navigation = useNavigation()
    const [products,setProducts] = useState([])
    let [reload, setReload] = useState(false)

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
        try{
            let url = `http://192.168.0.113:8080/shop/${id}/cart`
            const response = await axios.get(url,headers)
            setProducts(response.data.products)
            setReload(!reload)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getProducts()
        handleMaxStock()
    },[id,reload])

    const handleLessStock = async (productId) =>{
        try{
            let product = products.find(product => product._id === productId)
            if(product.stock === 1){
                let url = `http://192.168.0.113:8080/shop/cart/deleteone/${product._id}`
                const response = await axios.delete(url,headers)
                console.log(response.data.message);
                setReload(!reload)
            }else{
                let data = {
                    stock: product.stock -=1
                }
                let url = `http://192.168.0.113:8080/shop/cart/update/${product._id}`
                const response = await axios.put(url,data,headers)
                console.log(response.data.message);
                setReload(!reload)
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleMoreStock = async (productId) =>{
        try{

            let product = products.find(product => product._id === productId)
            if(product.stock !== product.maxStock){
                let data = {
                    stock: product.stock +=1
                }
                let url = `http://192.168.0.113:8080/shop/cart/update/${product._id}`
                const response = await axios.put(url,data,headers)
                console.log(response.data.message);
                setReload(!reload)
            }

        }catch(err){
            console.log(err);
        }
    }

    function handleMaxStock(){
        try{
            products.forEach( product => {
                if(product.stock > product.maxStock){
                    let data = {
                        stock: product.maxStock
                    }
                    let url = `http://192.168.0.113:8080/shop/cart/update/${product._id}`
                    axios.put(url, data, headers).then(res => toast.success('Some items stock has been modified because they exceed the limit'))
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        handleMaxStock()
    },[products])

  return (
    <View style={styles.contain}>
        <View style={styles.header_cart}>
            <View style={styles.text_header}>
                <Text style={{fontSize:20,fontWeight:500,color:'#566270'}}>Cart ({products.length})</Text>
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
                      name={item.name}
                      price={item.price}
                      des={item.description}
                      stock={item.stock}
                      LessStock={handleLessStock}
                      MoreStock={handleMoreStock}
                    />
                  )}
                  ListEmptyComponent={<NoCardCat/>}
                />
            </View>
        </View>
        <View style={styles.btn_cart}>
            <TouchableOpacity style={styles.btn} >
                <Text style={{fontSize:20,fontWeight:600,color:'white'}}>BUY CART</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} >
                <Text style={{fontSize:20,fontWeight:600,color:'#5BB35F'}}>CLEAR CART</Text>
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