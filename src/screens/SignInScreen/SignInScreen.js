import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Logo from '../../../assets/images/Event-Finder-logo.png'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'

const SignInScreen = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {height} = useWindowDimensions()

    const navigation = useNavigation()

    const onSignInPressed = () => {
        //to be changed
        navigation.navigate('Home')
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword')
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp')
    }

    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
    scrollView: {
        backgroundColor: '#73be73',
    }, 

    root: {
        alignItems: 'center',
        padding: 80,
        backgroundColor: '#73be73',
    },

    logo: {
        width: '55%',
        maxWidth: 300,
        maxHeight: 200,
    },
})

export default SignInScreen