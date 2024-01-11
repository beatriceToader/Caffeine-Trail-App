import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify'

const NewPasswordScreen = () => {

    const {control, handleSubmit} = useForm()

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false);

    const onSubmitPressed = async (data) => {

        if(loading){
            return;
        }

        setLoading(true);

        try {
            await Auth.forgotPasswordSubmit(data.username, data.code, data.password)
            navigation.navigate('SignIn')
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
                name='username'
                control={control}
                placeholder='username'
                rules={{
                    required: 'username is required', 
                }}
            />

            <CustomInput 
                name='code'
                control={control}
                placeholder='code'
                rules={{
                    required: 'code is required', 
                }}
            />

            <CustomInput 
                name='password'
                control={control}
                placeholder='enter your new password' 
                secureTextEntry={true}
                rules={{
                    required: 'password is required', 
                    minLength: {value: 8, message: 'password should be minimum 8 characters long'},
                }}
            />

            <CustomButton
                text={loading ? 'Loading...' : 'Submit'}
                onPress={handleSubmit(onSubmitPressed)}
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

export default NewPasswordScreen