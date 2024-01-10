import React, { useState } from 'react'
import { View, Text, StyleSheet,Alert, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify'

const ForgotPasswordScreen = () => {

    const {control, handleSubmit} = useForm()

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false);

    const onSendPressed = async (data) => {

        if(loading){
            return;
        }

        setLoading(true);

        try {
            await Auth.forgotPassword(data.username)
            navigation.navigate('NewPassword')
        } catch(e) {
            Alert.alert('Oops', e.message)
        } 

        setLoading(false);
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
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
                style={styles.title}>Reset your password
            </Text>

            <CustomInput 
                style={styles.input}
                name='username'
                control={control}
                placeholder='username'
                rules={{
                    required: 'username is required', 
                }}
            />

            <CustomButton
                style={styles.buttonSend}
                text={loading ? 'Loading...' : 'Send'}
                onPress={handleSubmit(onSendPressed)}
            />

            <CustomButton
                style={styles.buttonSignIn}
                text="Back to Sign in"
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

export default ForgotPasswordScreen