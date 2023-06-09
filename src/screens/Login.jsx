import React,{useEffect} from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import LoginFieldsets from '../components/LoginFieldsets'
import axios from 'axios'
import { useState } from 'react'
import { ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import statusAction from '../store/StatusDrawer/actions'

const {captureStatus} = statusAction


function Login() {

    let [data, setData] = useState('')
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
    const dispatch = useDispatch()

    async function handleSignIn() {
        setLoading(true)
        let url = 'https://lance-app.onrender.com/auth/signin'
        
        let admin
        let seller
        try {
            await axios.post(url, data).then(res => {
                res.data.user.is_admin ? (admin = true) : (admin = false)
                res.data.user.is_seller ? (seller = true) : (seller = false)
                AsyncStorage.setItem('token', res.data.token)
                AsyncStorage.setItem('user', JSON.stringify({
                    name: res.data.user.name,
                    photo: res.data.user.photo,
                    // id: res.data.user._id,
                    // mail: res.data.user.mail,
                    // admin,
                    // seller
                }))

                ToastAndroid.showWithGravity(res.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                setTimeout(() => {
                    setLoading(false)
                    navigation.navigate('Home')
                }, 3000)
            })
        } catch (error) {
            setLoading(false)
            if (error.code === "ERR_NETWORK") {
                ToastAndroid.showWithGravity('Network Error', ToastAndroid.LONG, ToastAndroid.TOP)
            } else {
                if (typeof error.response.data.message === 'string') {
                    ToastAndroid.showWithGravity(error.response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                } else {
                    error.response.data.message.forEach(err => ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP))
                }
            }
        }
    }

    useEffect(()=>{
        dispatch(captureStatus({inputStatus:loading}))
    },[loading])


    function handleRegisterNavigate(){
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('Register')
        }, 1000)
    }

    function handleHomeNavigate(){
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('Home')
        }, 1000)
    }

    return (
        <View style={styles.loginForm}>
            <View style={styles.loginText}>
                <Text style={styles.loginTitle}>Log In</Text>

                <LoginFieldsets setData={setData} />

                <TouchableOpacity style={styles.signBtn} onPress={handleSignIn}>
                    <Text style={styles.signBtnText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>You don´t have an account yet? </Text>
                    <Text style={styles.link} onPress={handleRegisterNavigate}>Sign Up</Text>
                </View>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>Go back to </Text>
                    <Text style={styles.link} onPress={handleHomeNavigate}>home page</Text>
                </View>
            </View>
            <Spinner visible={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    loginForm: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingVertical: 25,
        paddingHorizontal: 20,
        gap: 25,
        backgroundColor: '#EBEBEB',
    },
    loginTitle: {
        fontWeight: '700',
        fontSize: 30,
        lineHeight: 37,
    },
    link: {
        textDecorationLine: 'none',
        color: '#886688',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 17,
    },
    bottomText: {
        textDecorationLine: 'none',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 17,
    },
    signBtn: {
        backgroundColor: '#161616',
        borderRadius: 10,
        width: '80%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    signBtnText: {
        color: '#fff',
    },
    bottomTextContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Login