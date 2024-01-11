import React from 'react'
import { View, Text, StyleSheet, Pressable} from 'react-native'
import { useFonts } from 'expo-font'

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor }) => {

    const [loaded] = useFonts({
        Cooper: require('../../../assets/fonts/CooperLightBT.ttf'),
    });
    
    if (!loaded) {
     return null; //return null or a loading indicator while the font is loading
    }

    return (
        <Pressable 
            onPress={onPress} 
            style={[styles.container, styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {}
            ]}>
            <Text 
                style={[styles.text, 
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
                ]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create ( {
    container: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },

    container_PRIMARY: {
        backgroundColor: '#00524b',
    },

    container_SECONDARY: {
        borderColor: '#00524b',
        borderWidth: 2, 
    },

    container_SPECIAL: {
        backgroundColor: 'gray',
    },

    text: {
        color: '#FAF2DE',
        textAlign: 'center',
        fontFamily: 'Outfit-Regular',
    },

    text_TERTIARY: {
        color: 'white',
    },

    text_SECONDARY: {
        color: '#00524b',
    }
})

export default CustomButton