import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function ProfileBar(){
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require('./../../../assets/images/coffee-beans.png')}/>
            <Text style={styles.title}>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginTop:25
    },
    image:{
        width:50,
        height:50,
        alignSelf: 'flex-start',
        margin: 20,
        marginRight: 6
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      padding:10, 
      paddingLeft:7,
      paddingTop:7,
      fontFamily:'Outfit-Bold',
      fontSize:30
    },
  });
  