import React,{useState,useCallback} from 'react'
import { View,Text,StyleSheet,ScrollView,Image,TouchableOpacity } from 'react-native'
import InfoDetails from '../components/InfoDetails/InfoDetails';
import ReturnDetails from '../components/ReturnDetails/ReturnDetails';
import Description from '../components/Description/Description';
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'

export default function DetailsProduct() {

    const [detail,setDetail] = useState({})
    const [count,setCount] = useState(1)

    const id = '642d8fd0f85ac25682438750'
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
        },[])
    )

    const handleRest = () => {
        if (count === 0){
            console.log('no se puede sacar mas');//mensaje a mostrar en toast
        }else{
            setCount(count - 1)
        }
        
    }

    const handleSum = () => {
        if(count === detail?.stock){
            console.log('no hay mas stock');//mensaje de toast
        }else{
            setCount(count + 1)
        }
    }

    const handleCart = () => {
        console.log('agregar a carrito')//esto añade al carrito
    }

  return (
    <ScrollView style={styles.contain_details}> 
            <View style={styles.cont_img}>
                <ReturnDetails/>
                <InfoDetails photo={detail?.photo} category={detail?.category} name={detail?.name} price={detail?.price}/>
            </View>
            <View style={styles.cont_description}>
                <View style={styles.count_item}>
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
                <Description des={detail?.description} stock={detail?.stock}/>
            </View>
            <View style={styles.cont_btn}>
                <View style={styles.btn_cart}>
                    <TouchableOpacity style={styles.btn} onPress={handleCart}>
                        <Text style={{fontSize:20,fontWeight:600,color:'white'}}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <View style={styles.logo_foot}>
                        <Image source={require('../../images/logo_stores.png')}/>
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
        fontWeight:400,
        color:'white'
    }

})