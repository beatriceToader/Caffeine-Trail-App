import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

  const [loaded] = useFonts({
    Cooper: require('../../../assets/fonts/CooperLightBT.ttf'),
  });

  if (!loaded) {
    return null; //return null or a loading indicator while the font is loading
  }

  const onStartPressed = () => {
    navigation.navigate('SignIn')
  }

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <Image style={styles.logo} source={require('../../../assets/images/Event-Finder-logo.png')} />
        </View>
        <Text style={styles.textCustomizer}>Get in touch with a new fun experience!</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onStartPressed}>
          <Text style={styles.buttonText}>Get started</Text>
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

  imageContainer: {
    paddingTop: 40,
  },

  logo: {
    width: 200,
    height: 200,
  },

  textCustomizer: {
    color: '#464941',
    fontFamily: 'Cooper',
    fontSize: 16
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