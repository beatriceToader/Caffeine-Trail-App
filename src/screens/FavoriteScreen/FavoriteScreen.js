import { View, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { API, graphql } from 'aws-amplify';
import { graphqlOperation } from 'aws-amplify';
import PlaceItem from '../CoffeeList/PlaceItem';
import Items from './Items';
import { useIsFocused } from '@react-navigation/native';
import { useCallback } from 'react';
import { VirtualizedList } from 'react-native-web';


export default function FavoriteScreen(){

    const [faveList, setFaveList]=useState([]);

    //Obtain the current user ID
    const [userId, setUserId] = useState('');
    const isFocused = useIsFocused();

    const [refreshPage, setRefreshPage] = useState(false);

    const removeCoffeeShopHandler = useCallback(() => {
        // Function to refresh the favorite list
        setRefreshPage(prevState => !prevState);
      }, []);

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
        if(isFocused){
       if(userId){ 
        const getFavoriteCoffeeShops = async () => {
            const query = `
                query GetFavoriteCoffeeShops($userId: String!) {
                    listCoffeeShops(filter: { userId: { eq: $userId } }) {
                        items {
                            id
                            image
                            name
                            address
                        }
                    }
                }
            `;

            console.log(userId);

            try {
                const response = await API.graphql(graphqlOperation(query, { userId }));
                const coffeeShops = response.data.listCoffeeShops.items;
                setFaveList(coffeeShops);
                console.log('!!!!!!!!!coffee ',coffeeShops);
                console.log(faveList);
                // Now 'coffeeShops' contains an array of objects with id, name, and address
              } catch (error) {
                console.error("Error fetching favorite coffee shops:", error);
              }
            

        };
        getFavoriteCoffeeShops();
      }
    }
    }, [userId,isFocused, refreshPage]);


    return(
        <View style={{backgroundColor:'#73be73', flex:1}}>
        <View style={styles.mainContainer}>
            {!faveList?<View style={styles.activityContainer}>
                <ActivityIndicator
                size={'large'}
                color={'gray'}
                />
            </View>:null}

            <FlatList
                data={faveList}
                renderItem={({item, index})=>(
                    <Items place={item} onRemoveCoffeeShop={removeCoffeeShopHandler}/>
                )}
            />
        </View>
        </View>       
    )
}

const styles=StyleSheet.create({
    mainContainer:{
        paddingTop:35,
        alignItems: 'center'
    },
    activityContainer:{
        height:'100%',
        display:'flex',
        alignItmes:'center',
        justifyContent:'center',
        backgroundColor:'#73be73'
    }
})