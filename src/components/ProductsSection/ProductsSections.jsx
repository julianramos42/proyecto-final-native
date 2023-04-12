import React, { useCallback, useState } from 'react'
import { Text, View,StyleSheet,ScrollView,TouchableOpacity,Image,FlatList } from 'react-native'
import Dropdowns from '../Dropdowns/Dropdowns'
import CardProduct from '../CardProduct/CardProduct'
import axios from 'axios'
import { useFocusEffect,useRoute } from '@react-navigation/native'
import { useDispatch,useSelector } from 'react-redux'
import NoCard from '../NoCard/NoCard'

export default function ProductsSections() {
  
  const [product,setProduct] = useState({})
  const [sort, setSort] = useState(1);
  const defaultCategory = useSelector((state) => state.categories.categories);
  const defaultText = useSelector((state) => state.text.text);

  // const route = useRoute();
  // const { id } = route.params;
  const id = '642c487e7b721ca6a2bf0a47' //id que llega por params el ide de facu y el de la navegacion de returdetails
  let url = 'http://192.168.0.113:8080/shop/'+ id + '/products'+`?name=${defaultText}&category=${defaultCategory}&sort=${sort}`

  useFocusEffect(
    useCallback(()=>{
      async function getProduct(){
        try{
          const response = await axios.get(url)
          setProduct(response.data.products)
        }catch(err){
          console.log(err);
        }
      }
      getProduct()
    },[defaultCategory,defaultText,sort])
  )
  
  return (
    <View style={styles.cont_products}>
      <View style={styles.cat_sort}>
        <Dropdowns/>
        <TouchableOpacity style={styles.btn_sort} onPress={() => setSort(sort === 1 ? -1 : 1)}>
          <Text style={styles.text_sort}>Sort</Text>
          <Image  source={require('../../../images/flechaSort.png')} resizeMode='cover'/>
        </TouchableOpacity>
      </View>
      <FlatList style={styles.allproducts}
        data={product}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <CardProduct
            storeId={item.store_id}
            id={item._id}
            img={item.photo}
            name={item.name}
            price={item.price}
          />
        )}
        ListEmptyComponent={<NoCard text={defaultText} cat={defaultCategory}/>}
      />

    </View>
  )
}
const styles = StyleSheet.create({
    cont_products:{
        backgroundColor:'#F0F2F5',
        flex:0.6,
        width:'100%',
        display:'flex',
        alignItems:'center'
    },
    cat_sort:{
      flex:0.2,
      width:'90%',
      borderBottomColor:'rgba(0, 0, 0, 0.3)',
      borderBottomWidth:1,
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:40,
    },
    allproducts:{
      flex:0.8,
      width:'100%',
    },
    btn_sort:{
      width:50,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    text_sort:{
      fontSize:15,
      fontFamily:'Montserrat-Medium',
      color: '#566270'
    },
    
})