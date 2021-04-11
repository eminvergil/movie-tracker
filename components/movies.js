import React, { useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  CheckBox,
  Image,
} from "react-native";

export default function Movies({ clicked, setClicked, watched }) {
  const filteredMovies = clicked.filter(function (array_el) {
    return (
      watched.filter(function (anotherOne_el) {
        return anotherOne_el.key == array_el.key;
      }).length == 0
    );
  });

  const filteredMovies2 = clicked.filter(function (array_el) {
    return watched.filter(function (anotherOne_el) {
      return array_el.key !== anotherOne_el.key;
    });
  });
  useEffect(() => {
    // const filteredMovies = clicked.filter(function (array_el) {
    //   return (
    //     watched.filter(function (anotherOne_el) {
    //       return anotherOne_el.key == array_el.key;
    //     }).length == 0
    //   );
    // });

    // const filteredMovies2 = clicked.filter(function (array_el) {
    //   return (
    //     watched.filter(function (anotherOne_el) {
    //       return anotherOne_el.key == array_el.key;
    //     }).length == -1
    //   );
    // });

    // console.log(filteredMovies);

    console.log(filteredMovies2);
  }, []);

  return (
    <>
      <View style={styles.movielist}>
        <FlatList
          data={filteredMovies}
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
                <View style={{ marginRight: "auto" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginRight: "auto",
                      width: 180,
                      marginBottom: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "normal",
                      marginRight: "auto",
                      marginBottom: 5,
                    }}
                  >
                    {item.release_date}
                  </Text>
                  <Image
                    source={{ uri: item ? item.image : "none" }}
                    style={{ width: 150, height: 100 }}
                  />
                </View>

                <CheckBox
                  style={{
                    marginLeft: "auto",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                  title="Press me"
                  //   value={item.click}
                  //   onValueChange={() => {
                  //     const _item = clicked.findIndex((it) => it.key == item.key);

                  //     let new_copy = [...clicked];

                  //     new_copy[_item] = {
                  //       ...new_copy[_item],
                  //       click: !new_copy[_item].click,
                  //     };

                  //     setClicked(new_copy);
                  //   }}
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
    // height: 150,
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
  },
});
