import React, { useEffect } from "react";

import { Home, LoginExample ,SignOrLogin, SignUp , NotFound} from ".";

// import { NativeRouter, Route, Link } from "react-router-native";
import firebase from 'firebase/app';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import { firebaseConfig } from "../data/context";

export default function ContainerApp() {

    useEffect(() => {
        try {
            firebase.initializeApp(firebaseConfig);
        }catch (e) {
            console.log("unexpected error : ", e)
        }
    },[])

    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SignOrLogin">
                    <Stack.Screen name="Home" component={Home} options={{ headerLeft: ()=> null,title:"", headerVisible: false,
                        headerMode: 'none',headerShown:false}}  />
                    <Stack.Screen name="Login" component={LoginExample} options={{ headerLeft: ()=> null,title:"", headerVisible: false,
                        headerMode: 'none',headerShown:false}} />
                    <Stack.Screen name="SignOrLogin" component={SignOrLogin} options={{ headerLeft: ()=> null,title:"", headerVisible: false,
                        headerMode: 'none',headerShown:false}} />
                    <Stack.Screen name="SignUp" component={SignUp} options={{ headerLeft: ()=> null,title:"", headerVisible: false,
                        headerMode: 'none',headerShown:false}} />
                    <Stack.Screen name="NotFound" component={NotFound} options={{ headerLeft: ()=> null,title:"", headerVisible: false,
                        headerMode: 'none',headerShown:false}} />
                </Stack.Navigator>
            </NavigationContainer>
    );
}

