import React from 'react'
import { Text, View,StyleSheet,Image,Dimensions } from 'react-native'
import BtnIndex from '../components/BtnIndex/BtnIndex'
import { useNavigation } from '@react-navigation/native'

export default function About() {

    const navigation = useNavigation()
    
    const handleNavigation = () =>{
        navigation.navigate('Contact')
    } 

  return (
    <View style={styles.contain}>
        <View style={styles.title_about}>
            <Text style={styles.title}>Meet me</Text>
            <Text style={styles.inf_about}>Editing everything online gives you a sense of control that you haven't felt with any other tool.</Text>
        </View>
        <View style={styles.img_about}>
            <Image style={styles.img_a} source={require('../../images/Diseño.jpg')}/>
        </View>
        <View style={styles.btn_about}>
            <BtnIndex name='Contact us now' color='#161616' bg='white' Press={handleNavigation}/>
        </View>
      </View>
  )
}
const altura = Dimensions.get('window').height;
const styles = StyleSheet.create({
    contain:{
        flex:1,
        height:altura,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#495464'
    },
    title_about:{
        flex:0.37,
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        gap:48,
    },
    title:{
        fontSize:50,
        fontFamily:'Montserrat-Bold',
        color:'white'
    },
    inf_about:{
        fontSize:20,
        fontFamily:'Montserrat-SemiBold',
        color:'white',
        width:330
    },
    img_about:{
        flex:0.45,
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    img_a:{
        width: 375,
        height: '100%',
        borderRadius:20
    },
    btn_about:{
        flex:0.18,
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})