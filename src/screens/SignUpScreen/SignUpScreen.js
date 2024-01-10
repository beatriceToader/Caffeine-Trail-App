import React, { useState } from 'react'
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = () => {

    const {control, handleSubmit, watch} = useForm()

    const pwd = watch('password')

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()


    const onRegisterPressed = async (data) => {

        if(loading){
            return;
        }

        setLoading(true);

        const {username, password, email, name} = data
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {email, name, preferred_username: username}
            })
            navigation.navigate('ConfirmEmail', {username})
        } catch(e) {
            Alert.alert('Oops', e.message)
        }

        setLoading(false);
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    const onTermsOfUsePressed = () => {
        navigation.navigate('onTermsOfUsePressed')
    }

    const onPrivacyPressed = () => {
        navigation.navigate('onPrivacyPressed')
    }

    const [loaded] = useFonts({
        Cooper: require('../../../assets/fonts/CooperLightBT.ttf'),
    });
    
    if (!loaded) {
     return null; //return null or a loading indicator while the font is loading
    }

    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text 
                style={styles.title}>Create an account
            </Text>

            <CustomInput 
                name='name'
                control={control}
                placeholder='name'
                rules={{
                    required: 'name is required', 
                    minLength: {value: 4, message: 'name should be minimum 4 characters long'},
                    maxLength: {value: 24, message: 'name should be maximum 24 characters long'},
                }}
            />

            <CustomInput 
                name='username'
                control={control}
                placeholder='username'
                rules={{
                    required: 'username is required', 
                    minLength: {value: 4, message: 'username should be minimum 4 characters long'},
                    maxLength: {value: 24, message: 'username should be maximum 24 characters long'},
                }}
            />
            <CustomInput 
                name='email'
                control={control}
                placeholder='email'
                rules={{pattern: {value: EMAIL_REGEX, message: 'email is invalid'}}} 
            />
            <CustomInput 
                name='password'
                control={control}
                placeholder='password' 
                secureTextEntry={true}
                rules={{
                    required: 'password is required', 
                    minLength: {value: 8, message: 'password should be minimum 8 characters long'},
                }}
            />
            <CustomInput 
                name='password-repeat'
                control={control}
                placeholder='repeat password'  
                secureTextEntry={true}
                rules={{
                    validate: value => 
                    value === pwd ? true : 'password do not match',
                }}
            />

            <CustomButton
                text={loading ? 'Loading...' : 'Register'}
                onPress={handleSubmit(onRegisterPressed)}
            />

            <Text 
                style={styles.text}>By registering, you confirm that you accept our{' '}   
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>.
            </Text> 

            <SocialSignInButtons /> 

            <CustomButton
                text="Have an account? Sign in!"
                onPress={onSignInPressed}
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
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        marginVertical: 40,
        fontFamily: 'Outfit-Regular',
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