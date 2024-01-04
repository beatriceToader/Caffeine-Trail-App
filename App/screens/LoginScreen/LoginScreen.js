import {View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {

  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
  const onPress=async()=>{
    try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
   
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
  }

  return (
    <View style={styles.container} >

        <Image style={styles.logoImage} source={require('../../../assets/images/logo3.png')}/>

        <Image style={styles.shopImage} source={require('../../../assets/images/shop3.png')}/>

        <View style={styles.textContainer}>
            <Text style={styles.heading}>Choose your coffee adventure with Caffeine Trail!</Text>
            <TouchableOpacity style={styles.button}
                onPress={onPress}>
                <Text style={styles.buttonText}>Login with Google</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },

  logoImage:{
    width: '60%',
    height: '30%',
    objectFit: 'contain',
    marginBottom: -40
  },

  shopImage:{
    width: '100%',
    height: '49%',
    objectFit: 'cover'
  },

  textContainer:{
    padding: 20
  },

  heading:{
    fontSize: 22,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
    marginTop: -5
  },

  button:{
    backgroundColor: '#29AB87',
    padding: 16,
    display: 'flex',
    borderRadius: 99,
    marginTop: 20
  },

  buttonText:{
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    fontSize: 17,
  }

  
});
