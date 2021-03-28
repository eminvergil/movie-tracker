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

export default function Movies({ clicked, setClicked }) {
  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
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
