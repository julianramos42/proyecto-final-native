import React,{useState,useCallback,useEffect} from 'react'
import { Text, View,StyleSheet,TouchableOpacity,ImageBackground,ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function ShopRoutes(props) {

    let [reload, setReload] = useState(false)
    const [pressedButtonIndex, setPressedButtonIndex] = useState(1);
    const [products,setProducts] = useState([])
    const navigation = useNavigation()


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


    async function getProducts(){
        if(props.id){
            try{
                let url = `http://192.168.0.113:8080/shop/${props.id}/cart`
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
        },[])
    )

    console.log(products);

    const handlePress = (index) => {
      setPressedButtonIndex(index);
    };
    const handleHome = () =>{
        ToastAndroid.showWithGravity('shortly', ToastAndroid.LONG, ToastAndroid.TOP)
    }
    const handleStore = () =>{
        console.log('ir a store con un useNavigation(store,{id:idstore}) y enviar por params el id de la tienda ');
    }
    const handleComments = () =>{
        ToastAndroid.showWithGravity('shortly', ToastAndroid.LONG, ToastAndroid.TOP)
    }
    const handleCart = () =>{
        navigation.navigate('Cart',{id:props.id})
    }


  return (
    <View style={styles.cont_route}>
        <TouchableOpacity onPress={() => {handlePress(0),handleHome()}}>
          <Text style={[styles.text, pressedButtonIndex === 0 && styles.pressed]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {handlePress(1),handleStore()}}>
          <Text style={[styles.text, pressedButtonIndex === 1 && styles.pressed]}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {handlePress(3),handleComments()}}>
          <Text style={[styles.text, pressedButtonIndex === 3 && styles.pressed]}>Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCart()}>
            <ImageBackground style={styles.img_icon} source={require('../../../images/icon_cart.png')} resizeMode='cover' >
                <Text style={styles.count_cart}>{products.length}</Text>
            </ImageBackground>
        </TouchableOpacity>  
    </View>
  )
}
const styles = StyleSheet.create({
    cont_route:{
        flex:0.2,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:20
    },
    search:{
        backgroundColor:'white',
        flex:0.4
    },
    text: {
        color:'white',
        fontSize:20,
        fontFamily:'Montserrat-Regular',
        textDecorationLine: 'none',
    },
    pressed: {
        color:'white',
        fontFamily:'Montserrat-Bold'
    },
    img_icon:{
        width:26,
        height:30,
    },
    count_cart:{
        width: 21,
        height: 21,
        backgroundColor:'#161616',
        textAlign:'center',
        borderRadius:50,
        fontSize:14,
        fontFamily:'Montserrat-Bold',
        color:'white',
        position: 'absolute',
        left: '46.15%',
        right: '0%',
        top:' 8.2%',
        bottom: '34.38%',
        alignItems:'center',
        justifyContent:'center'
    }
   
})