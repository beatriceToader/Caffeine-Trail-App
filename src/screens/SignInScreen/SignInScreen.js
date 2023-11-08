import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Logo from '../../../assets/images/Event-Finder-logo.png'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons'

const SignInScreen = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {height} = useWindowDimensions()

    const onSignInPressed = () => {
        console.warn('Sign in')
    }

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed')
    }

    const onSignUpPressed = () => {
        console.warn('onSignUpPressed')
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode='contain'
            />

            <CustomInput 
                placeholder='username'
                value={username} 
                setValue={setUsername}
            />
            <CustomInput 
                placeholder='password' 
                value={password} 
                setValue={setPassword} 
                secureTextEntry={true}
            />

            <CustomButton
                text='Sign in'
                onPress={onSignInPressed}
            />

            <CustomButton
                text='Forgot password?'
                onPress={onForgotPasswordPressed}
                type='TERTIARY'
            />

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

    logo: {
        width: '55%',
        maxWidth: 300,
        maxHeight: 200,
    },
})

export default SignInScreen