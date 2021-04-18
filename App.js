import React, { useState, useEffect } from "react";

import { Home, LoginExample} from "./components";
// import { NativeRouter, Route, Link } from "react-router-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} options={{ headerLeft: ()=> null,title:"", headerVisible: false,
                headerMode: 'none',headerShown:false}}  />
            <Stack.Screen name="Login" component={LoginExample} options={{ headerLeft: ()=> null}} />
            {/*<LoginExample />*/}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

