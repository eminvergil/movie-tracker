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
import {windowHeight} from "../data/helpers";


export default function Movies({
  clicked,
  setClicked,
  watched,
  setWatched,
  filtered,
  setFiltered,
  selectWatched,
    db,userID2
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

   let handleMovieDataChange = (item) => {
        const _item = clicked.findIndex((it) => it.key == item.key && it.name == item.name && it.title == item.title);
        console.log("#### CLICKED BUTTON #########");


        let new_copy = [...clicked];

        new_copy[_item] = {
            ...new_copy[_item],
            click: selectWatched ? true : false,
        };

        setClicked(new_copy);
        if(selectWatched){
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
        }else{
            let _index = watched.findIndex((it) => it.key == item.key && it.name == item.name && it.title == item.title);
            let watched_copy = [...watched];
            watched_copy.splice(_index,1);
            setWatched(watched_copy);
        }


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

    }

    let handleWatchedMovieDataChange = (item) => {
        const _item = clicked.findIndex((it) => it.key == item.key);

        let new_copy = [...clicked];

        new_copy[_item] = {
            ...new_copy[_item],
            click: false,
        };

        setClicked(new_copy);

        let watched_copy = [...watched];
        watched_copy.splice(_item,1);
        setWatched(watched_copy);

        // setWatched([
        //     ...watched,
        //     {
        //         key: new_copy[_item].key,
        //         title: new_copy[_item].title,
        //         click: new_copy[_item].click,
        //         image: new_copy[_item].image,
        //         description: new_copy[_item].description,
        //         release_date: new_copy[_item].release_date,
        //     },
        // ]);

        // db.collection('watched').doc(userID2).get()
        //     .then((doc) => {
        //         if (doc.exists) {
        //             console.log("### watched collection updated!");
        //             db.collection("watched")
        //                 .doc(userID2)
        //                 .set({watched}).then(() => {
        //                 console.log('success updating watched data');
        //             }).catch(err => {
        //                 console.log("updating watched data ERROR: ",err.message );
        //             })
        //         }
        //     }).catch(err => {
        //     console.log("### watched collection update ERROR: ", err);
        // });
        //
        // db.collection('movies').doc(userID2).get()
        //     .then((doc) => {
        //         if (doc.exists) {
        //             console.log("### MOVIES COLLECTION updated!");
        //             db.collection("movies")
        //                 .doc(userID2)
        //                 .set({clicked}).then(() => {
        //                 console.log('success updating movies data');
        //             }).catch(err => {
        //                 console.log("updating watched data ERROR: ",err.message );
        //             })
        //         }
        //
        //     }).catch(err => {
        //     console.log('### MOVIES COLLECTION ERROR: ', err);
        // });

    }

    return (
    <>
      <View style={styles.movielist}>
        <FlatList
            style={{ maxHeight:windowHeight - windowHeight*20/100 }}
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
                    backgroundColor: selectWatched ? "lightblue" : "lightgreen", //item && item.click ? "lightblue" : "lightgreen",
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
                  value={selectWatched ? item.click : !item.click}
                  onValueChange={() => {
                    handleMovieDataChange(item);
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
