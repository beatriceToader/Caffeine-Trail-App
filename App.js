import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import LoginScreen from './App/screens/LoginScreen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store';
import TabNavigation from './App/navigation/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserLocationContext } from './App/context/UserLocationContent';
import * as Location from 'expo-location';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


export default function App() {

  const [fontsLoaded] = useFonts({
    'Outfit-Regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit-SemiBold': require('./assets/fonts/Outfit-SemiBold.ttf'),
  });

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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={'pk_test_c3BsZW5kaWQta2l3aS01Mi5jbGVyay5hY2NvdW50cy5kZXYk'}
    >
    
    <UserLocationContext.Provider value={{location,setLocation}}>

    <View style={styles.container} onLayout={onLayoutRootView}>

      <SignedIn>
        <NavigationContainer>
          <TabNavigation/>
        </NavigationContainer> 
      </SignedIn>

      <SignedOut>
          <LoginScreen/>
      </SignedOut>
      
    </View>

    </UserLocationContext.Provider>

    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
  text:{
    fontSize: 20,
    fontFamily: 'Outfit-Regular'
  },
});
