import React,{useState} from 'react'
import { Text, View,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function ShopRoutes(props) {
    const [pressedButtonIndex, setPressedButtonIndex] = useState(1);

    const navigation = useNavigation()

    const handlePress = (index) => {
      setPressedButtonIndex(index);
    };
    const handleHome = () =>{
        console.log('ir a home con un useNavigation(homestores,{id:idstore}) y enviar por params el id de la tienda ');
    }
    const handleStore = () =>{
        console.log('ir a store con un useNavigation(store,{id:idstore}) y enviar por params el id de la tienda ');
    }
    const handleBlog = () =>{
        console.log('ir a blog con un useNavigation(blog,{id:idstore}) y enviar por params el id de la tienda ');
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
        <TouchableOpacity onPress={() => {handlePress(3),handleBlog()}}>
          <Text style={[styles.text, pressedButtonIndex === 3 && styles.pressed]}>Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCart()}>
            <ImageBackground style={styles.img_icon} source={require('../../../images/icon_cart.png')} resizeMode='cover' >
                <Text style={styles.count_cart}>1</Text>
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
        fontWeight:300,
        textDecorationLine: 'none',
    },
    pressed: {
        color:'white',
        fontWeight:700,
    },
    img_icon:{
        width:26,
        height:30,
    },
    count_cart:{
        width: 21,
        height: 21,
        backgroundColor:'#5BB35F',
        textAlign:'center',
        borderRadius:50,
        fontSize:14,
        fontWeight:700,
        color:'white',
        position: 'absolute',
        left: '46.15%',
        right: '0%',
        top:' 8.2%',
        bottom: '34.38%',
    }
   
})