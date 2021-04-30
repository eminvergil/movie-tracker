import React, { useState, useEffect } from "react";

import { Home, LoginExample} from "./components";
// import { NativeRouter, Route, Link } from "react-router-native";
import firebase from 'firebase/app';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import {firebaseConfig} from "./data/context";



export default function App() {

    useEffect(() => {
        try {
          firebase.initializeApp(firebaseConfig);
        }catch (e) {
            console.log("unexpected error : ", e)
        }

    },[])

  return (
      // <FirebaseContext>
         <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Home" component={Home} options={{ headerLeft: ()=> null,title:"", headerVisible: false,
                    headerMode: 'none',headerShown:false}}  />
                <Stack.Screen name="Login" component={LoginExample} options={{ headerLeft: ()=> null,title:"", headerVisible: false,
                    headerMode: 'none',headerShown:false}} />
                {/*<LoginExample />*/}
            </Stack.Navigator>
        </NavigationContainer>
      // </FirebaseContext>
  );
}

