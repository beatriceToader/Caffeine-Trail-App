import React, {useEffect, useState} from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import NewPasswordScreen from '../screens/NewPasswordScreen'
import HomeScreen from "../screens/HomeScreen/HomeScreen"
import { Auth, Hub } from "aws-amplify"
import { ActivityIndicator } from "react-native"
import { View } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNavigation from "./TabNavigaton"



const Stack = createNativeStackNavigator()

const Tab= createBottomTabNavigator()

const Navigation = () => {

    const [user, setUser] = useState(undefined)

    const checkUser = async () =>{
        try{
            const authUser= await Auth.currentAuthenticatedUser({bypassCache: true});
            setUser(authUser);
        }
        catch (e){
            setUser(null);
        }
        
    }

    useEffect(()=>{
        checkUser();
    },[]);

    useEffect(()=>{
        const listener = (data) => {
            if(data.payload.event === 'signIn' || data.payload.event === 'signOut'){
               checkUser(); 
            }
        }

        Hub.listen('auth',listener);

        return () => Hub.remove('auth',listener);
    }, [])

    if(user === undefined){
        return(
            <View style={{flex:1, justifyContent:'center', alignIntems:'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={ {headerShown: false}}>
                {user ? (
                    <Stack.Screen name="TabNavigation" component={TabNavigation}/>
                ):(
                    <>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="SignIn" component={SignInScreen}/>
                    <Stack.Screen name="SignUp" component={SignUpScreen}/>
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
                    </>
                )}
               
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation