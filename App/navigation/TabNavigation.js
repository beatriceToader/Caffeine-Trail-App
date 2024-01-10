import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';


const Tab= createBottomTabNavigator()

export default function TabNavigation(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name='HomeScreen' 
            component={HomeScreen}
            options={{
                tabBarLabel:'Search',
                tabBarActiveTintColor:'#29AB87',
                tabBarIcon:({color,size})=>(
                    <Ionicons name="ios-search" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name='FavoriteScreen' 
            component={FavoriteScreen}
            options={{
                tabBarLabel:'Favorite',
                tabBarActiveTintColor:'#29AB87',
                tabBarIcon:({color,size})=>(
                   <Ionicons name="ios-heart" size={size} color={color} />                )
            }}/>
            <Tab.Screen name='ProfileScreen' 
            component={ProfileScreen}
            options={{
                tabBarLabel:'Profile',
                tabBarActiveTintColor:'#29AB87',
                tabBarIcon:({color,size})=>(
                    <FontAwesome name="user-circle" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
    )
}