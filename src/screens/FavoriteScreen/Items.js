import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import GlobalApi from './../../../utils/GlobalApi'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Linking } from 'react-native'
import { API, graphqlOperation } from 'aws-amplify'
import { Auth } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { createCoffeeShop, deleteCoffeeShop } from '../../graphql/mutations'




export default function Items({place, onRemoveCoffeeShop}){

    const PLACE_PHOTO_BASE_URL="https://places.googleapis.com/v1/"

    const [refreshPage, setRefreshPage] = useState(false);

    const [isFavorite, setIsFavorite] = useState(false);

    const openGoogleMaps = () => {
        // Construct the Google Maps URL with the locationText
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          place.shortFormattedAddress
        )}`;
    
        // Open the Google Maps app or a web browser with the specified location
        Linking.openURL(mapsUrl);
    };

    //Obtain the current user ID
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserId = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setUserId(''+user.attributes.sub);
        } catch (error) {
            console.error('Error fetching user ID', error);
        }
    };

        fetchUserId();
    }, []);

    useEffect(() => {
        
        const checkExistingCoffeeShop = async () => {
            const query = `
                query GetExistingCoffeeShop($name: String!, $address: String!, $userId: String!) {
                    listCoffeeShops(filter: { name: { eq: $name }, address: { eq: $address }, userId: { eq: $userId } }) {
                        items {
                            id
                        }
                    }
                }
            `;
        
            const variables={
                "name":place.name,
                "address": place.address,
                "userId": userId,
            }
    
        
            const existingCoffeeShops = await API.graphql(graphqlOperation(query, variables));
    
            if(existingCoffeeShops.data.listCoffeeShops.items.length > 0){
                setIsFavorite(true);
                return existingCoffeeShops.data.listCoffeeShops.items.length;
            }
            else{
                return 0;
            }
        };
        checkExistingCoffeeShop();

      }, []);

    const removeFavoriteCoffeeShop = async () => {
        const query = `
                query GetExistingCoffeeShop($name: String!, $address: String!, $userId: String!) {
                    listCoffeeShops(filter: { name: { eq: $name }, address: { eq: $address }, userId: { eq: $userId } }) {
                        items {
                            id
                        }
                    }
                }
            `;
        
            const variables={
                "name":place.name,
                "address": place.address,
                "userId": userId,
            }
    
        
            const existingCoffeeShops = await API.graphql(graphqlOperation(query, variables));

            if (existingCoffeeShops.data.listCoffeeShops.items.length === 0) {
                // No matching coffee shop found
                console.error("No matching coffee shop found");
                return;
            }
            else{
                const coffeeShopToDelete = {"id":existingCoffeeShops.data.listCoffeeShops.items[0].id};
                await API.graphql({query: deleteCoffeeShop, variables:{input:coffeeShopToDelete}});
                setIsFavorite(false);
                console.log("User removed!");
                if (onRemoveCoffeeShop) {
                    onRemoveCoffeeShop();
                }
            }
    };

    


    return(
        <View style={styles.container}>
            <LinearGradient colors={['transparent','#ffffff','#ffffff']}>

                <Pressable style={styles.heartContainer} onPress={removeFavoriteCoffeeShop}>
                    <Ionicons name={"heart"} size={24} color="red" />
                </Pressable>

                <Image source={
                    ((place.image)==='')?
                    require('./../../../assets/images/shop.png')
                    :{uri:place.image}} 
                    style={{width:'100%', borderRadius:10, height:160, zIndex:-1}}
                />
                <View style={{padding:15}}>
                    <Text style={styles.nameText}>{place.name}</Text>
                    <Text style={styles.locationText}>{place.address}</Text>
                </View>
                <Pressable style={styles.arrowContainer} onPress={openGoogleMaps}>
                    <FontAwesome name="location-arrow" size={24} color="white" />
                </Pressable>
            </LinearGradient>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        margin:15,
        borderRadius:10,
        width:Dimensions.get('screen').width*0.9
    },
    heartContainer:{
        position:'absolute',
        right:0,
        margin:5
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
        backgroundColor:'#73be73',
        borderRadius:6,
        paddingHorizontal:14,
        top:-5,
        right:-300,
        alignItems: 'center',
        justifyContent:'center'
    }
})