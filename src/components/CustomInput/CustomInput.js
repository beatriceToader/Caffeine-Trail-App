import React, {useState} from "react"
import { View, Text, TextInput, StyleSheet, useWindowDimensions } from 'react-native'
import {Controller} from 'react-hook-form'

const CustomInput = ({control, name, placeholder, rules={}, secureTextEntry}) => {

    const {height} = useWindowDimensions()

    return (
        <Controller 
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View style={[styles.container, {borderColor: error ? 'red' : '#6f5e55'}]}>
                    <TextInput 
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        style={[styles.input, {height: height * 0.035}, {}]}
                        secureTextEntry={secureTextEntry}
                    />
                    </View>
                    {error && (
                        <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                    )}
                </>
            )}
        />
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
      width: '100%',
      maxWidth: 300,
      maxHeight: 200,
    },
})

export default CustomInput