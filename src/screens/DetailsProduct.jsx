import React from 'react'
import { View,Text,StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native'
import InfoDetails from '../components/InfoDetails/InfoDetails';

export default function DetailsProduct() {
    const miFuncion = () => {
        console.log('hola');
      }

  return (
    <ScrollView style={styles.contain_details}> 
            <View style={styles.cont_img}>
                <View style={styles.volver}>    
                    <TouchableOpacity style={{width:12,height:20}} onPress={miFuncion}>
                      <Image source={require('../../images/volver.png')} resizeMode='cover'/>
                    </TouchableOpacity>   
                </View>
                <InfoDetails/>
            </View>
            <View style={styles.cont_description}>

            </View>
            <View style={styles.cont_btn}>

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
        height:520,
        width:'100%',
        display:'flex',
        alignItems:'center',
        gap:25,
    },
    cont_description:{
        height:433,
        width:'100%',
        backgroundColor:'purple'
    },
    cont_btn:{
        height:430,
        width:'100%',
        backgroundColor:'yellow'
    },
    volver:{
        height:59,
        width:'90%',
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-end',
        borderBottomColor:'rgba(0, 0, 0, 0.3)',
        borderBottomWidth:1,
    },
})