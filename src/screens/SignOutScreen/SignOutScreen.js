import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'

const SignOutScreen = () => {

  const [loaded] = useFonts({
    Cooper: require('../../../assets/fonts/CooperLightBT.ttf'),
  });

  if (!loaded) {
    return null; //return null or a loading indicator while the font is loading
  }

  const onSignOutPressed = () => {
    navigation.navigate('Home')
  }

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.body}>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSignOutPressed}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create ( {
  container: {
    flex: 1,
    backgroundColor: '#73be73',
    alignItems: 'center',
    justifyContent: 'center',
  },

  body: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    marginTop: 220,
  },

  button: {
    backgroundColor: '#6f5e55',
    padding: 12,
    borderRadius: 7,
  },

  buttonText: {
    color: '#FAF2DE',
    textAlign: 'center',
    fontFamily: 'Cooper',
  }
})

export default HomeScreen