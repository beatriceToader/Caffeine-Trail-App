import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

const ForgotPasswordScreen = () => {

    const [username, setUsername] = useState('')

    const navigation = useNavigation()

    const onSendPressed = () => {
        navigation.navigate('NewPassword')
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
                placeholder='Username'
                value={username} 
                setValue={setUsername}
            />

            <CustomButton
                style={styles.buttonSend}
                text='Send'
                onPress={onSendPressed}
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

export default ForgotPasswordScreen