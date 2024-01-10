import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useFonts } from 'expo-font'
import { useNavigation, useRoute } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify'

const ConfirmEmailScreen = () => {

    const route = useRoute()

    const {control, handleSubmit, watch} = useForm({defaultValues: {username: route?.params?.username}, })

    const username = watch('username')

    const navigation = useNavigation()

    const onConfirmPressed = async (data) => {
        try {
            await Auth.confirmSignUp(data.username, data.code)
            Alert.alert('Success', 'Your email was confirmed')
            navigation.navigate('SignIn')
        } catch(e) {
            Alert.alert('Oops', e.message)
        }
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    const onResendPressed = async () => {
        try {
            await Auth.resendSignUp(username)
            Alert.alert('Success', 'Code was resent to your email')
        } catch(e) {
            Alert.alert('Oops', e.message)
        }
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
                style={styles.title}>Confirm your email
            </Text>

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
                name='code'
                control={control}
                placeholder='enter your confirmation code'
                rules={{
                    required: 'confirmation code is required', 
                }}
            />
           
            <CustomButton
                text='Confirm'
                onPress={handleSubmit(onConfirmPressed)}
            />

            <CustomButton
                text="Resend code"
                onPress={onResendPressed}
                type='SECONDARY'
            /> 

            <CustomButton
                text="Back to Sing in"
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
        marginVertical: 30,
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

export default ConfirmEmailScreen