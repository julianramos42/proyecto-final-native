import React,{useState} from 'react'
import { View,Text,StyleSheet,Image,TouchableOpacity } from 'react-native'

export default function CardCart() {

    const [count,setCount] = useState(0)

    const handleRest = () => {
        if (count === 0){
            console.log('no se puede sacar mas');//mensaje a mostrar en toast
        }else{
            setCount(count - 1)
        }
        
    }

    const handleSum = () => {
        if(count === 10){//poner la cantidad del stok que hay en maxstock del back
            console.log('no hay mas stock');//mensaje de toast
        }else{
            setCount(count + 1)
        }
    }
  return (
    <View style={styles.contain}>
        <View style={styles.cont_img}>
            <Image style={{height:'100%',width:272,borderRadius:8}} source={require('../../../images/product.png')} resizeMode='cover'/>
            <TouchableOpacity style={{width:30,height:30}}>
                <Image style={{width:50,height:50}} source={require('../../../images/next.png')} resizeMode='cover'/>
            </TouchableOpacity>
        </View>
        <View style={styles.cont_name}>
            <Text style={{fontSize:20,fontWeight:500,color:'#566270'}}>Monstera Deliciosa</Text>
            <Text style={{fontSize:18,fontWeight:500}}>$89</Text>
        </View>
        <View style={styles.cont_count}>
            <View style={styles.count}>
                <TouchableOpacity style={styles.btn_count} onPress={handleRest}>
                    <Text style={{fontSize:16,fontWeight:400}}>-</Text>
                </TouchableOpacity>
                <View style={styles.number}>
                    <Text style={{fontSize:16,fontWeight:400}}>{count}</Text>
                </View>
                <TouchableOpacity style={styles.btn_count}>
                    <Text style={{fontSize:16,fontWeight:400}} onPress={handleSum}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.cont_description}>
            <View style={styles.name}>
                <View style={styles.title}>
                    <Text style={{fontSize:20,fontWeight:500}}>DESCRIPTION</Text>
                </View>
            </View>
            <View style={styles.description}>
            <Text style={styles.text}>your own terrarium, and then walk you through the process step-by-step to create your miniature environment with unique plants to take home.
                    We’re excited to welcome you into our brand new workshop space located at 5-2501 Alyth Road SE, where you’ll enjoy a 1.5 – 2 hour interactive class. Please see the 
                    map for location details as all workshops are held at Plant Plant (our sister shop) just minutes away from our mainstreet Inglewood location.</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contain:{
        height:560,
        width:'100%',
        marginTop:24,
        borderBottomColor:'#999999',
        borderBottomWidth:1
    },
    cont_img:{
        flex:0.4,
        display:'flex',
        flexDirection:'row',
        padding:10,
        gap:30,
    },
    cont_name:{
        flex:0.1,
        paddingLeft:10,
    },
    cont_count:{
        flex:0.1,
        paddingLeft:10,
        justifyContent:'center'
    },
    cont_description:{
        flex:0.4,
    },
    count:{
        width:'50%',
        height:36,
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
    name:{
        flex:0.2,
        alignItems:'center',
    },
    title:{
        flex:1,
        width:135,
        borderBottomWidth:2,
        alignItems:'center',
        justifyContent:'center',
    },
    description:{
        flex:0.8,
    },
    text:{
        width:355,
        fontSize:12,
        fontWeight:400,
        lineHeight: 20, 
        letterSpacing: 0.5,
        paddingVertical:5
    }
})