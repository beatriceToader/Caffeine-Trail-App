import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import * as Location from 'expo-location';
import { UserLocationContext } from './src/context/UserLocationContext';
import { useCallback } from 'react';
import 'core-js/full/symbol/async-iterator';


Amplify.configure(config)

const App = () => {

  const [fontsLoaded] = useFonts({
    'Outfit-Regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    
      <SafeAreaView style={styles.root}>
        <Navigation/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#73be73',
  }, 
});

export default App