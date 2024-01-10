import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Ionicons } from '@expo/vector-icons'

export default function SearchBar({searchedLocation}){
    return(
        <View style={styles.container}>
            <Ionicons name="location-sharp" size={26} color="#73be73" style={{paddingTop:10}} />
            <GooglePlacesAutocomplete
                placeholder='Search coffee shop'
                enablePoweredByContainer={false}
                fetchDetails={true}
                onPress={(data, details = null) => {
                
                    searchedLocation(details?.geometry?.location)
                }}
                query={{
                    key: 'AIzaSyBfxYCQml7GQ7AJOm7kQbzzfUvpTtoERYw',
                    language: 'en',
                }}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        marginTop:10,
        paddingHorizontal:5,
        borderRadius:6,
        backgroundColor:'#ffffff'
    }
})