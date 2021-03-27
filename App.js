import { StatusBar } from "expo-status-bar";

import React, { useState, useEffect } from "react";
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

import faker from "faker";
import { Select } from "./components";

faker.seed(10);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ARRAY_LENG = 10;

// key , name
const DATA = [...Array(ARRAY_LENG).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    name: faker.name.firstName(),
  };
});

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
      <Text
        style={{
          fontSize: 32,
          justifySelf: "center",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Movie Tracker App
      </Text>

      <Select />

      <View style={styles.movielist}>
        <FlatList
          data={clicked}
          // horizontal
          showHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <View
                key={item.key}
                style={[
                  styles.filmitem,
                  {
                    backgroundColor: item.click ? "lightblue" : "green",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginRight: "auto",
                  }}
                >
                  {item.name}
                </Text>
                <Button
                  style={{
                    marginRight: "auto",
                    height: 48,
                    width: 64,
                    alignSelf: "end",
                  }}
                  title="Press me"
                  onPress={() => {
                    const _item = clicked.findIndex((it) => it.key == item.key);

                    // console.log(_item);

                    let new_copy = [...clicked];

                    new_copy[_item] = {
                      ...new_copy[_item],
                      click: !new_copy[_item].click,
                    };

                    setClicked(new_copy);
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  movielist: {
    margin: 12,
    marginHorizontal: 16,
    // backgroundColor: "#cc35"
  },
  filmitem: {
    height: 150,
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
  },
});
