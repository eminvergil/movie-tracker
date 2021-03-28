import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { Select, Movies } from "./components";

import {
  windowHeight,
  windowWidth,
  ARRAY_LENG,
  DATA,
  BG_IMG,
} from "./data/helpers";

export default function App() {
  const [clicked, setClicked] = useState([{ key: "", click: "", name: "" }]);

  useEffect(() => {
    //assigning DATA array to state
    for (let i = 0; i < ARRAY_LENG; i++) {
      clicked[i] = { key: DATA[i].key, click: false, name: DATA[i].name };
    }
  }, []);

  return (
    <View style={[styles.container, { marginTop: 32 }]}>
      <Image
        source={{ uri: BG_IMG }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={150}
      />
      <Text
        style={{
          fontSize: 32,
          justifySelf: "center",
          // textAlign: "start",
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Movie Tracker App
      </Text>

      <Select />

      <Movies clicked={clicked} setClicked={setClicked} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
  },
});
