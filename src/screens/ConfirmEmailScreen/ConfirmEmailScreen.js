import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

const ConfirmEmailScreen = () => {

    const [code, setCode] = useState('')

    const navigation = useNavigation()

    const onConfirmPressed = () => {
        //to be changed
        navigation.navigate('Home')
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn')
    }

    const onResendPressed = () => {
        console.warn('onResendPressed')
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
                placeholder='Enter your confirmation code'
                value={code} 
                setValue={setCode}
            />
           
            <CustomButton
                text='Confirm'
                onPress={onConfirmPressed}
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