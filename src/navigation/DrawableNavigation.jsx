import React,{useCallback} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ToastAndroid } from 'react-native';
import Index from '../screens/Index'
import DetailsProduct from '../screens/DetailsProduct'
import Register from '../screens/Register'
import Login from '../screens/Login'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect,useNavigation} from "@react-navigation/native";
import { useState } from 'react'
import Shop from '../screens/Shop'
import Cart from '../screens/Cart'
import CustomDrawerContain from './CustomDrawerContain'
import Logout from '../screens/Logout'
import axios from 'axios';
import Stores from '../screens/Stores';
import Contact from '../screens/Contact';
import Favorites from '../screens/Favorites';

const Draw = createDrawerNavigator()

function DrawableNavigation() {
  const [load, setLoad] = useState(false);
  let [token, setToken] = useState('')
  const navigate = useNavigation();


  useFocusEffect(
    useCallback(() => {
      const getTokenAndUser = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      };
      getTokenAndUser();
    }, [])
  );

  const handleLogout = async () => {
    setLoad(true)
    let url = 'https://lance-app.onrender.com/auth/signout'
    let headers = { headers: { 'Authorization': `Bearer ${token}` } };

    if(token){
      try {
        await axios.post(url, null, headers);
        await AsyncStorage.setItem('token', '');
        await AsyncStorage.setItem('user', JSON.stringify({
          // id:'',
          // admin: '',
          name: '',
          photo: '',
          // seller: ''
        }));
  
        ToastAndroid.show('The session was closed successfully! !', ToastAndroid.LONG);
        setTimeout(()=>{
          setLoad(false)
          navigate.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        },2000)
      } catch (err) {
        setLoad(false)
        ToastAndroid.show("You're already signed out or not signed in", ToastAndroid.LONG);
      }
    }
  }


  return (
    <Draw.Navigator 
    screenOptions={{ headerTransparent: true ,headerTintColor:'#C2C2C2',}}
    drawerContent={(props) => <CustomDrawerContain {...props} navigation={props.navigation} handleLogout={handleLogout} reload={load}/>}
    initialRouteName='Home'
    >
      <Draw.Screen name='Home' component={Index} />
      <Draw.Screen name='Shop' component={Shop} />
      <Draw.Screen name='Stores' component={Stores}/>
      <Draw.Screen name='Favorites' component={Favorites}/>
      <Draw.Screen name='Details' component={DetailsProduct}/>
      <Draw.Screen name='Cart' component={Cart}/>
      <Draw.Screen name ='Contact' component={Contact}/>
      <Draw.Screen name='Register' component={Register} options={{ headerShown: false }} />
      <Draw.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Draw.Screen name='Logout' component={Logout} options={{title: 'Logout'}}/>
    </Draw.Navigator>
  )
}

export default DrawableNavigation