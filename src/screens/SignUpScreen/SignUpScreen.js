import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons'

const SignUpScreen = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const onRegisterPressed = () => {
        console.warn('onRegisterPressed')
    }

    const onSignUpPressed = () => {
        console.warn('onSignUpPressed')
    }

    const onTermsOfUsePressed = () => {
        console.warn('onTermsOfUsePressed')
    }

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text 
                style={styles.title}>Create an account
            </Text>

            <CustomInput 
                placeholder='username'
                value={username} 
                setValue={setUsername}
            />
            <CustomInput 
                placeholder='email'
                value={email} 
                setValue={setEmail}
            />
            <CustomInput 
                placeholder='password' 
                value={password} 
                setValue={setPassword} 
                secureTextEntry={true}
            />
            <CustomInput 
                placeholder='repeat password' 
                value={passwordRepeat} 
                setValue={setPasswordRepeat} 
                secureTextEntry={true}
            />

            <CustomButton
                text='Register'
                onPress={onRegisterPressed}
            />

            <Text 
                style={styles.text}>By registering, you confirm that you accept our{' '}   
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>.
            </Text> 

            <SocialSignInButtons /> 

            <CustomButton
                text="Don't have an account? Create one!"
                onPress={onSignUpPressed}
                type='TERTIARY'
            />   
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ( {
    root: {
        alignItems: 'center',
        padding: 80,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        //color: '#6f5e55',
        color: 'black',
    },

    text: {
        color: '#555555',
        marginVertical: 10,
    },

    link: {
        color: 'yellow',
    }
})

export default SignUpScreen