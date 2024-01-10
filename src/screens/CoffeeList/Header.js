import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react' 

export default function Header(){

    return(
        <View style={styles.container}>
            <Image source={require('./../../../assets/images/transparent-logo.png')} style={{width:200, height:45, borderRadius:99, marginTop:25, objectFit:"contain"}}/>
            
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
    },
})