import React,{useState,useCallback,useEffect} from 'react'
import { View,Text,Image,FlatList,StyleSheet,TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Icon } from '@rneui/base';
// import { mdiHomeRoof } from '@mdi/js';


export default function CustomDrawerContain({navigation,handleLogout,reload}) {
    const commonImage = '../../images/profile.png'

    
    const [selectedId, setSelectedId] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({ name: '', photo: '' });

    // console.log(updateLoading);    

    async function getTokenAndUser () {
        try{
            
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('user');
            
            if (!storedToken) {
              AsyncStorage.setItem('user', JSON.stringify({
                  // id:'',
                  // admin: '',
                  name: '',
                  photo: '',
                  // seller: ''
              }));
            }
            setToken(storedToken);
            setUser(JSON.parse(storedUser || '{}'));

        }catch(err){
            console.log(err);
        }
        
    };

    useEffect(()=>{
      getTokenAndUser();
    },[reload])



    let listArray = [
        {icon: commonImage  , title:'Home',route:'Home'},
        {icon: commonImage  , title:'Shop',route:'Shop'},
        {icon: commonImage , title:'Register',route:'Register'},
        {icon: commonImage , title:'Login',route:'Login'},
    ]
    let bottomList = [
        {icon: commonImage  , title:'Help',route:'Help'},
        {icon: commonImage , title:'Logout',route:'Logout'},
    ]

    if (token) {
        listArray = listArray.filter((item)=> item.title!== 'Register' && item.title !== 'Login')
    }

    if(!token){
        bottomList = bottomList.filter((item) => item.title !== 'Logout');
    }

    const Item = ({title,icon,onPress,backgroundColor,color}) => (
        <TouchableOpacity onPress={onPress} style={[styles.item,{backgroundColor: backgroundColor}]}>
             <Image source={require('../../images/Diseño.jpg')} style={{height:35,width:35,borderRadius:50,marginLeft:10}}/>
          <Text style={[styles.title,{color:color}]}>{title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        const backgroundColor = item.title === selectedId ? '#495464' : 'white';
        const color = item.title === selectedId ? 'white' : 'black';
       return(
            <Item
              onPress={() =>{ 
                setSelectedId(item.title)
                if (item.title === 'Logout') {
                    handleLogout();
                } else {
                    navigation.navigate({ name: item.route });
                }
            }}
              title={item.title}
              icon={item.icon}
              backgroundColor={backgroundColor}
              color={color}
            />
       )
    }

  return (
    <View style={{flex:1}}>
        <View style={{flex:0.25,paddingTop:50,paddingHorizontal:20,borderBottomColor:'rgba(0, 0, 0, 0.25)',borderBottomWidth:1}}>
            <Image source={require('../../images/Diseño.jpg')} style={{height:100,width:100,borderRadius:50}}/>
            <Text style={{fontWeight:'bold',fontSize:22,marginTop:20}}>Johan Zuluaga</Text>
            <Text style={{fontSize:16,marginTop:5}}>{`6000 followers`}</Text>
        </View>
        <View style={{flex:0.5}}>
            <FlatList
              data={listArray}
              renderItem={renderItem}
            />
        </View>
        <View style={{flex:0.25,borderTopColor:'rgba(0, 0, 0, 0.25)',borderTopWidth:1}}>
            <FlatList
              data={bottomList}
              renderItem={renderItem}
            />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    item: {
      paddingVertical:10,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection:'row',
      borderRadius:10,
      alignItems:'center'
    },
    title: {
      fontSize: 18,
      fontWeight:600,
      marginLeft:20
    },
});