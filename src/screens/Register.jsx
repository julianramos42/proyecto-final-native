import React, { useEffect } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import RegisterFieldsets from '../components/RegisterFieldsets'
import axios from 'axios'
import { useState } from 'react'
import { ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

function Register() {
    let [data, setData] = useState('')
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    async function handleSignUp() {
        setLoading(true)
        let url = 'https://lance-app.onrender.com/auth/signup'
        
        try {
            await axios.post(url, data).then(res => {
                ToastAndroid.showWithGravity(res.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
                setTimeout(() => {
                    setLoading(false)
                    navigation.navigate('Login')
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

    function handleLoginNavigate(){
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('Login')
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
        <View style={styles.registerForm}>
            <View style={styles.registerText}>
                <Text style={styles.registerTitle}>Register</Text>

                <RegisterFieldsets setData={setData} />

                <TouchableOpacity style={styles.signBtn} onPress={handleSignUp}>
                    <Text style={styles.signBtnText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>Already have an account? </Text>
                    <Text style={styles.link} onPress={handleLoginNavigate}>Log In</Text>
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
    registerForm: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerText: {
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
    registerTitle: {
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
        backgroundColor: '#495464',
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

export default Register