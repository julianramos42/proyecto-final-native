import React,{useState} from 'react'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import categoriesFavAction from '../../store/CategoriesFavorite/actions'
import { useDispatch,useSelector } from 'react-redux'
import { Icon } from '@rneui/themed'

const {captureCategoriesFav} = categoriesFavAction

export default function DropDownFav() {


  const dispatch = useDispatch();
  
    const data = [
        { label: 'Clothing and Accessories', value: 'Clothing and Accessories' },
        { label: 'Shoes', value: 'Shoes' },
        { label: 'Beauty and Personal Care', value: 'Beauty and Personal Care' },
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Home and Garden', value: 'Home and Garden' },
        { label: 'Toys and Games', value: 'Toys and Games' },
        { label: 'Books and Music', value: 'Books and Music' },
        { label: 'Sports and Outdoor Activities', value: 'Sports and Outdoor Activities' },
        { label: 'Food and Beverages', value: 'Food and Beverages' },
        { label: 'Pets', value: 'Pets' },
        { label: 'Cars and Motorcycles', value: 'Cars and Motorcycles' },
        { label: 'Jewelry and Watches', value: 'Jewelry and Watches' },
        { label: 'Office Supplies and Stationery', value: 'Office Supplies and Stationery' },
        { label: 'Financial and Banking Services', value: 'Financial and Banking Services' },
        { label: 'Gift and Souvenir Shops', value: 'Gift and Souvenir Shops' },
        { label: 'Health and Wellness', value: 'Health and Wellness' },
        { label: 'Art and Craft Stores', value: 'Art and Craft Stores' },
        { label: 'Technology and Gadgets', value: 'Technology and Gadgets' },
        { label: 'Travel and Tourism', value: 'Travel and Tourism' },
        { label: 'Second-hand or Thrift Stores', value: 'Second-hand or Thrift Stores' },
        { label: 'Other', value: 'Other' },
    ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const handleReset = () => {
      setValue(null);
      dispatch(captureCategoriesFav({ inputCategory: [] })); 
    }

    const handleChange = item => {
      setValue(item.value);
      setIsFocus(false);
      dispatch(captureCategoriesFav({inputCategory: item.value})); 
    };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleReset}>
            <Icon name='autorenew' type="material" size={30} color='white'/>
        </TouchableOpacity>
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
        
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width:'100%',
      flex:1,
      flexDirection:'row-reverse',
      justifyContent:'space-around',
      alignItems:'center'
    },
    dropdown: {
      height: 40,
      width:230,
      borderColor: '#FFFFFF',
      borderWidth: 1,
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
      color:'#FFFFFF'
    },
    selectedTextStyle: {
      fontSize: 15,
      color:'#FFFFFF'
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 15,
    },

});