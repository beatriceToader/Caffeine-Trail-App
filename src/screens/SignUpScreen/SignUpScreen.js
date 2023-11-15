import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

const SignUpScreen = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const navigation = useNavigation()

    const onRegisterPressed = () => {
        navigation.navigate('ConfirmEmail')
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
                text="Have an account? Sing in!"
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
        fontFamily: 'Cooper',
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