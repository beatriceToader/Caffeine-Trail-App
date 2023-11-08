import React, {useState} from "react"
import { View, Text, TextInput, StyleSheet, useWindowDimensions } from 'react-native'

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {

    const {height} = useWindowDimensions()

    return (
        <View style={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={[styles.input, {height: height * 0.035}]}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create ( {
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#6f5e55',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginVertical: 5
    },

    input: {
      width: '50%',
      maxWidth: 300,
      maxHeight: 200,
    },
})

export default CustomInput