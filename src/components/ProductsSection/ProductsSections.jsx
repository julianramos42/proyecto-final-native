import React, { useCallback, useState } from 'react'
import { Text, View,StyleSheet,ScrollView,TouchableOpacity,Image,FlatList } from 'react-native'
import Dropdowns from '../Dropdowns/Dropdowns'
import CardProduct from '../CardProduct/CardProduct'
import axios from 'axios'
import { useFocusEffect,useRoute } from '@react-navigation/native'
import { useDispatch,useSelector } from 'react-redux'
import NoCard from '../NoCard/NoCard'

export default function ProductsSections(props) {
  
  const [product,setProduct] = useState({})
  const [sort, setSort] = useState(1);
  const defaultCategory = useSelector((state) => state.categories.categories);
  const defaultText = useSelector((state) => state.text.text);

 
  const id = props.id 
  let url = 'https://lance-app.onrender.com/shop/'+ id + '/products'+`?name=${defaultText}&category=${defaultCategory}&sort=${sort}`

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
    },[defaultCategory,defaultText,sort,id])
  )
  
  return (
    <View style={styles.cont_products}>
      <View style={styles.cat_sort}>
        <Dropdowns shopId ={id}/>
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
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={6}
        windowSize={21}
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