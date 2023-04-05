import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Fieldsets from '../components/Fieldsets'

function Register() {
    return (
        <View style={styles.registerForm}>
            <View style={styles.registerText}>
                <Text style={styles.registerTitle}>Sign Up</Text>

                <Fieldsets />

                <TouchableOpacity style={styles.signBtn}>
                    <Text style={styles.signBtnText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>Already have an account? </Text>
                    <Text style={styles.link}>Log In</Text>
                </View>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>Go back to </Text>
                    <Text style={styles.link}>home page</Text>
                </View>
            </View>
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