import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  CheckBox,
  Image,
} from "react-native";
import firebase from "firebase";


export default function Movies({
  clicked,
  setClicked,
  watched,
  setWatched,
  filtered,
  setFiltered,
  selectWatched,
}) {

  useEffect(() => {


    let filteredMovies = clicked.filter(function (array_el) {
      return (
        watched.filter(function (anotherOne_el) {
          return anotherOne_el.key == array_el.key;
        }).length == 0
      );
    });

      setFiltered(filteredMovies);



  }, [watched]);

  return (
    <>
      <View style={styles.movielist}>
        <FlatList
          data={selectWatched ? filtered : watched}
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
                    backgroundColor: item && item.click ? "lightblue" : "lightgreen",
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
                    source={{ uri: item ? item.image : "not-empty-string" }}
                    style={{ width: 150, height: 100 }}
                  />
                </View>

                <CheckBox
                  style={{
                    marginLeft: "auto",
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                  // title="Press me"
                  value={item && item.click}
                  onValueChange={() => {
                    const _item = clicked.findIndex((it) => it.key == item.key);

                    let new_copy = [...clicked];

                    new_copy[_item] = {
                      ...new_copy[_item],
                      click: true,
                    };
                    // console.log(new_copy[_item].title,new_copy[_item].click);

                    setClicked(new_copy);
                    //todo:setleme kısmını hem state e hem firestore a atliacak(firestore dogru calisirsa state iptal edilecek)
                    setWatched([
                      ...watched,
                      {
                        key: new_copy[_item].key,
                        title: new_copy[_item].title,
                        click: new_copy[_item].click,
                      image: new_copy[_item].image,
                          description: new_copy[_item].description,
                          release_date: new_copy[_item].release_date,
                      },
                    ]);

                      const db = firebase.firestore();
                      let userID2 = firebase.auth().currentUser.uid;
                      db.collection('watched').doc(userID2).get()
                          .then((doc) => {
                              if (doc.exists) {
                                  console.log("### watched collection updated!");
                                  db.collection("watched")
                                      .doc(userID2)
                                      .set({watched}).then(() => {
                                      console.log('success updating watched data');
                                  }).catch(err => {
                                      console.log("updating watched data ERROR: ",err.message );
                                  })
                              }
                          }).catch(err => {
                            console.log("### watched collection update ERROR: ", err);
                      });

                      db.collection('movies').doc(userID2).get()
                          .then((doc) => {
                              if (doc.exists) {
                                  console.log("### MOVIES COLLECTION updated!");
                                  db.collection("movies")
                                      .doc(userID2)
                                      .set({clicked}).then(() => {
                                      console.log('success updating movies data');
                                  }).catch(err => {
                                      console.log("updating watched data ERROR: ",err.message );
                                  })
                              }

                          }).catch(err => {
                            console.log('### MOVIES COLLECTION ERROR: ', err);
                      });

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
    // height: 150,
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
  },
});
