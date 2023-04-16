import React,{useState,useCallback,useEffect} from 'react'
import { View,Text,Image,FlatList,StyleSheet,TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/base';
import { useSelector } from 'react-redux';


export default function CustomDrawerContain({navigation,handleLogout,reload}) {

    const [selectedId, setSelectedId] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({ name: '', photo: '' });
    const loading = useSelector(store=>store.status.status)


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
    },[reload,loading])



    let listArray = [
      { icon: 'home', title: 'Home', route: 'Home' },
      { icon: 'shopping-cart', title: 'Stores', route: 'Stores' },
      { icon: 'favorite', title: 'Favorites', route: 'Favorites' },
      { icon: 'person-add', title: 'Register', route: 'Register' },
      { icon: 'login', title: 'Login', route: 'Login' },
    ];
    let bottomList = [
        {icon: 'live-help'  , title:'Help',route:'Help'},
        {icon: 'logout' , title:'Logout',route:'Logout'},
    ]

    if (token) {
        listArray = listArray.filter((item)=> item.title!== 'Register' && item.title !== 'Login')
    }

    if(!token){
        bottomList = bottomList.filter((item) => item.title !== 'Logout');
        listArray = listArray.filter((item)=> item.title!== 'Favorites')
    }

    const Item = ({title,icon,onPress,backgroundColor,color}) => (
        <TouchableOpacity onPress={onPress} style={[styles.item,{backgroundColor: backgroundColor}]}>
          <Icon name={icon} type="material" size={30} color={color} />
          <Text style={[styles.title,{color:color}]}>{title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        const backgroundColor = item.title === selectedId ? '#161616' : 'white';
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

    let follow = Math.floor(Math.random() * 10001);

  return (
    <View style={{flex:1}}>
        <View style={{flex:0.3,paddingTop:50,borderBottomColor:'rgba(0, 0, 0, 0.25)',borderBottomWidth:1,gap:10}}>
            <Image source={user?.photo?{uri:user?.photo}:require('../../images/userPhoto.jpg')} style={{height:100,width:100,borderRadius:50,marginHorizontal:20}}/>
            <View style={{backgroundColor:'#161616',justifyContent:'center',paddingVertical:10,paddingLeft:20}}>
              <Text style={{fontFamily:'Montserrat-Bold',fontSize:22,color:'white'}}>{user?.name?user?.name:'User Name'}</Text>
              <View style={{marginTop:5,flexDirection:'row',alignItems:'center',gap:2}}>
                <Text style={{fontFamily:'Montserrat-Regular',fontSize:16,color:'white'}}>{user?.name?`${follow} Followers`:`0 Followers`}</Text>
                <Icon name='supervised-user-circle' type='material' size={20} color='white' />
              </View>
            </View>
        </View>
        <View style={{flex:0.6,paddingTop:20}}>
            <FlatList
              data={listArray}
              renderItem={renderItem}
            />
        </View>
        <View style={{flex:0.2,borderTopColor:'rgba(0, 0, 0, 0.25)',borderTopWidth:1}}>
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
      paddingLeft:10,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection:'row',
      borderRadius:10,
      alignItems:'center'
    },
    title: {
      fontSize: 18,
      fontFamily:'Montserrat-SemiBold',
      marginLeft:20
    },
});