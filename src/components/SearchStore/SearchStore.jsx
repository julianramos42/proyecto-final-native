import React,{useState} from 'react'
import { View,Text,StyleSheet,Image,TextInput } from 'react-native'
import TextAction from '../../store/search/actions'
import { useDispatch, useSelector } from 'react-redux'

const {captureText} = TextAction

export default function SearchStore() {

  const dispatch = useDispatch();
  const [name,setName] = useState('')
  const defaultText = useSelector((state) => state.text.text);
  const [reload, setReload] = useState(false);

  function handleChange(text) {
    setName(text);
    setReload(!reload);
    dispatch(captureText({ inputText: text }));
  }

  return (
    <View style={style.contain_search}>
        <Image source={require('../../../images/lupa.png')}/>
        <TextInput value={name} defaultValue={defaultText} style={style.input_search} placeholder='Find your product' onChangeText={handleChange}/>
    </View>
  )
}

const style = StyleSheet.create({
    contain_search:{
        backgroundColor:'white',
        width:371,
        height:55,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:16,
        borderRadius:10,
        gap:24
    },
    input_search:{
        width:287,
        fontSize:17,
        fontFamily:'Montserrat-Regular'
    }
})