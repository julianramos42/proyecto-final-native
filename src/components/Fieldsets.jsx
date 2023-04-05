import React from 'react'
import { Image, TextInput, View, StyleSheet, Text } from 'react-native'
import profile from '../../images/profile.png'
import email from '../../images/email.png'
import lock from '../../images/lock.png'

function Fieldsets() {
    return (
        <>
            <View style={styles.fieldset}>
                <Text style={styles.legend}>Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Name' />
                    <Image source={profile} style={styles.inputImg} alt='profile' />
                </View>
            </View>

            <View style={styles.fieldset}>
                <Text style={styles.legend}>Last Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Last Name' />
                    <Image source={profile} style={styles.inputImg} alt='profile' />
                </View>
            </View>

            <View style={styles.fieldset}>
                <Text style={styles.legend}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='email@gmail.com' />
                    <Image source={email} style={styles.inputImg} alt='@' />
                </View>
            </View>

            <View style={styles.fieldset}>
                <Text style={styles.legend}>Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='.........' />
                    <Image source={lock} style={styles.inputImg} alt='lock' />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fieldset: {
        borderRadius: 10,
        backgroundColor: '#EBEBEB',
        display: 'flex',
        width: '80%',
        height: 48,
    },
    legend: {
        fontWeight: '400',
        fontSize: 12,
        marginHorizontal: 5,
        paddingHorizontal: 2,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 7,
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: 'white',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 15,
    },
    input: {
        width: '90%',
        color: 'rgba(31, 31, 31, 0.6)',
    },
    inputImg: {
        width: 16,
        height: 16,
    },
})

export default Fieldsets