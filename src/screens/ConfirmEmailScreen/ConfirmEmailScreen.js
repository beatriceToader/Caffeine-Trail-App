import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useFonts } from 'expo-font'
import { useNavigation, useRoute } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify'

const ConfirmEmailScreen = () => {

    const route=useRoute();

    const [loading, setLoading] = useState(false);

    const [loadingCode, setLoadingCode] = useState(false);

    const {control, handleSubmit, watch} = useForm({defaultValues: {username: route?.params?.username,
    }});

    const username = watch('username')

    const navigation = useNavigation()

    const onConfirmPressed = async(data) => {

        if(loading){
            return;
        }

        setLoading(true);

        try {
            await Auth.confirmSignUp(data.username, data.code)
            Alert.alert('Success', 'Your email was confirmed')
            navigation.navigate('SignIn')
        } catch(e) {
            Alert.alert('Oops', e.message)
        }

        setLoading(false);
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    const onResendPressed = async () => {
        if(loadingCode){
            return;
        }

        setLoadingCode(true);


        try {
            await Auth.resendSignUp(username)
            Alert.alert('Success', 'Code was resent to your email')
        } catch(e) {
            Alert.alert('Oops', e.message)
        }

        setLoadingCode(false);
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
                text={loading ? 'Loading...' : 'Confirm'}
                onPress={handleSubmit(onConfirmPressed)}
            />

            <CustomButton
                text={loadingCode ? 'Loading...' : 'Resend Code'}
                onPress={onResendPressed}
                type='SECONDARY'
            /> 

            <CustomButton
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
        paddingTop:130
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

export default ConfirmEmailScreen