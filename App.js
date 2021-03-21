import { StatusBar } from "expo-status-bar";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  Image,
} from "react-native";

import faker from "faker";

faker.seed(10);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DATA2 = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    name: faker.first_name(),
  };
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Movie Tracker App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
