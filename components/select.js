import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  FlatList,
  Image,
} from "react-native";

export default function Select({}) {
  const [watched, setWatched] = useState(false);

  //color
  // red - false
  // green - true

  return (
    <View style={styles.btnlist}>
      <View style={styles.margin}>
        <Button
          title="Watched"
          color={watched ? "green" : "red"}
          onPress={() => setWatched(!watched)}
          //     style={{ color: watched ? "red" : "yellow" }}
        />
      </View>
      <View style={styles.margin}>
        <Button
          title="NOT Watched"
          color={!watched ? "green" : "red"}
          onPress={() => setWatched(!watched)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnlist: {
    flexDirection: "row",
    justifyContent: "center",
  },
  margin: {
    margin: 10,
  },
});