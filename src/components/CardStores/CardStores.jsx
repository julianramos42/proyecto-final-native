import React,{useState} from 'react'
import { View,Text,StyleSheet,ImageBackground,TouchableOpacity,Image } from 'react-native'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';

export default function CardStores(props) {

    const navigation = useNavigation()
    
    const [iconColor, setIconColor] = useState('white');

    const handleHeart = () => {
        setIconColor(iconColor === 'white' ? 'red' : 'white');
      };

    const handleNavigation = () => {
        navigation.navigate('Shop',{id:props.id})
    }

  return (
    <View style={styles.contain}>
        <View style={styles.card}>
            <ImageBackground style={styles.cont_banner} source={{uri:props.banner}} resizeMode='cover'>
                <TouchableOpacity onPress={handleHeart}>
                    <Icon style={{margin:10}} name='favorite' type="material" size={30} color={iconColor}/>
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