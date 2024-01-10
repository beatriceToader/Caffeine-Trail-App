import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CoffeeList from '../screens/CoffeeList/CoffeeList'
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location'
import { UserLocationContext } from "../context/UserLocationContext"
import { useState,useEffect } from 'react'


const Tab= createBottomTabNavigator()

export default function TabNavigation(){

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

    return(
        <UserLocationContext.Provider value={{location,setLocation}}>
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name='CoffeeList' 
            component={CoffeeList}
            options={{
                tabBarLabel:'Search',
                tabBarActiveTintColor:'#73be73',
                tabBarIcon:({color,size})=>(
                    <Ionicons name="ios-search" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name='FavoriteScreen' 
            component={FavoriteScreen}
            options={{
                tabBarLabel:'Favorite',
                tabBarActiveTintColor:'#73be73',
                tabBarIcon:({color,size})=>(
                   <Ionicons name="ios-heart" size={size} color={color} />                )
            }}/>
            <Tab.Screen name='ProfileScreen' 
            component={ProfileScreen}
            options={{
                tabBarLabel:'Profile',
                tabBarActiveTintColor:'#73be73',
                tabBarIcon:({color,size})=>(
                    <FontAwesome name="user-circle" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
        </UserLocationContext.Provider>
    )
}