import React, { useState } from 'react'
import { View, Text, Alert, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Logo from '../../../assets/images/Event-Finder-logo.png'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify'

const SignInScreen = () => {

    const {height} = useWindowDimensions()

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false);

    const {control, handleSubmit, formState: {errors}} = useForm()

    const onSignInPressed = async(data) => {

        if(loading){
            return;
        }

        setLoading(true);

        try{
            const response = await Auth.signIn(data.username, data.password);
            console.log(response);
        }catch(e){
            Alert.alert('Oops',e.message);
        }

        setLoading(false);
        // console.log(data)
        // //to be changed
        // navigation.navigate('Home')
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
                name='username'
                control={control}
                placeholder='username'
                rules={{required: 'username is required'}}
            />
            <CustomInput 
                name='password'
                control={control}
                placeholder='password' 
                secureTextEntry={true}
                rules={{
                    required: 'password is required', 
                    minLength: {value: 8, message: 'password should be minimum 8 characters long'}
                }}
            />

            <CustomButton
                text={loading ? 'Loading...' : 'Sign in'}
                onPress={handleSubmit(onSignInPressed)}
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