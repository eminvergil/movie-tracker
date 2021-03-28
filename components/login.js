import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import auth from "@react-native-firebase/auth";

export default function login() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View>
      <Text>hello from login comp</Text>
    </View>
  );
}
