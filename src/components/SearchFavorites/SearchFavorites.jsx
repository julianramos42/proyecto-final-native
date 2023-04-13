import React,{useState} from 'react'
import { View,Text,StyleSheet,Image,TextInput } from 'react-native'
import TextFavAction from '../../store/searchFavorite/actions'
import { useDispatch, useSelector } from 'react-redux'

const {captureTextFav} = TextFavAction

export default function SearchFavorites() {
    
  const dispatch = useDispatch();
  const [name,setName] = useState('')
  const defaultText = useSelector((state) => state.textFav.textFav);
  const [reload, setReload] = useState(false);

  function handleChange(text) {
    setName(text);
    setReload(!reload);
    dispatch(captureTextFav({ inputText: text }));
  }


  return (
    <View style={style.contain_search}>
        <Image source={require('../../../images/lupaStores.png')}/>
        <TextInput value={name} defaultValue={defaultText} style={style.input_search} placeholder='Search for something here...' onChangeText={handleChange}/>
    </View>
  )
}


const style = StyleSheet.create({
    contain_search:{
        backgroundColor:'#EBEDEC',
        width:371,
        height:55,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:16,
        borderRadius:10,
        borderColor:'#C2C2C2',
        borderWidth:1,
        gap:18
    },
    input_search:{
        width:287,
        fontSize:17,
        fontFamily:'Montserrat-Regular'
    }
})