import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import GlobalApi from '../../utils/GlobalApi'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons';

export default function PlaceItem({place}){

    const PLACE_PHOTO_BASE_URL="https://places.googleapis.com/v1/"

    return(
        <View style={styles.container}>
            <LinearGradient colors={['transparent','#ffffff','#ffffff']}>
                <Image source={
                    place?.photos?
                    {uri:PLACE_PHOTO_BASE_URL+place?.photos[0]?.name+
                    "/media?key="+GlobalApi.API_KEY+"&maxHeightPx=800&maxWidthPx=1200"}
                    :require('./../../../assets/images/shop.png')} 
                    style={{width:'100%', borderRadius:10, height:160, zIndex:-1}}
                />
                <View style={{padding:15}}>
                    <Text style={styles.nameText}>{place.displayName?.text}</Text>
                    <Text style={styles.locationText}>{place?.shortFormattedAddress}</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <FontAwesome name="location-arrow" size={24} color="white" />
                </View>
            </LinearGradient>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        margin:19.5,
        borderRadius:10,
        width:Dimensions.get('screen').width*0.9
    },
    nameText:{
        fontSize:23,
        fontFamily:'Outfit-SemiBold'
    },
    locationText:{
        color:'#808080',
        fontFamily:'Outfit-Regular'
    },
    arrowContainer:{
        width:46,
        height:46,
        backgroundColor:'#29AB87',
        borderRadius:6,
        paddingHorizontal:14,
        top:-5,
        right:-300,
        alignItems: 'center',
        justifyContent:'center'
    }
})