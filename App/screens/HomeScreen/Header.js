import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo' 
import { FontAwesome } from '@expo/vector-icons'; 

export default function Header(){
    const {user}=useUser();

    return(
        <View style={styles.container}>
            <Image source={{uri:user?.imageUrl}} style={{width:40, height:40, borderRadius:99}}/>
            <Image source={require('./../../../assets/images/transparent-logo.png')} style={{width:200, height:45, borderRadius:99, objectFit:'contain'}}/>
            <FontAwesome name="filter" size={24} color="black" />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        //backgroundColor: 'rgba(255, 255, 255, 0.0)'
        //backgroundColor:'#C9BB8E',
        //paddingTop:9
    }
})