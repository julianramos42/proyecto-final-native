import React,{useState} from 'react'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import categoriesAction from '../../store/Categories/actions'
import { useDispatch,useSelector } from 'react-redux'

const {captureCategories} = categoriesAction

export default function Dropdowns() {


  const dispatch = useDispatch();
  
    const data = [
        { label: 'Computacion', value: 'Computacion' },
        { label: 'Computacion2', value: 'Computacion2' },
    ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const handleReset = () => {
      setValue(null);
      dispatch(captureCategories({ inputCategory: [] })); 
    }

    const handleChange = item => {
      setValue(item.value);
      setIsFocus(false);
      dispatch(captureCategories({inputCategory: item.value})); // dispatch value
    };


  return (
    <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#566270' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Category' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleChange}
        />
        <TouchableOpacity onPress={handleReset}>
              <Text style={styles.resetButton}>Reset</Text>
            </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      flexDirection:'row-reverse',
      gap:10,
      justifyContent:'center',
      alignContent:'center'
    },
    dropdown: {
      height: 35,
      width:200,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 15,
      fontFamily:'Montserrat-Medium',
      color:'#566270'
    },
    selectedTextStyle: {
      fontSize: 15,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 15,
    },
    resetButton: {
      marginTop: 10,
      fontFamily:'Montserrat-Medium',
    }
  });