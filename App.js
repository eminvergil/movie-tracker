import { StatusBar } from "expo-status-bar";

import React , {useState,useEffect}from "react";
import {
  StyleSheet,
  Text,
  View,Button,
  TextInput,
  Dimensions,
  FlatList,
  Image,
} from "react-native";

import faker from "faker";

faker.seed(10);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// key , name
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    name: faker.name.firstName(),
  };
});

export default function App() {
  const [clicked,setClicked] = useState({key:"",click: false});

  return (
    <View style={[styles.container,{marginTop:32}]}>

      <Text style={{fontSize:24,justifySelf:"center"}}>Movie Tracker App</Text>

      <View style={styles.movielist}>
        <FlatList data={DATA}
                  // horizontal
                  showHorizontalScrollIndicator={false}
                  contentContainerStyle={{   }}
                  keyExtractor={(item) => item.key}
                  renderItem={({item}) => {
                    return (
                        <View
                            key={item.key}
                            style={[styles.filmitem,{
                              backgroundColor: clicked.click ? "lightblue" : "green"}]}
                        >
                      <Text style={{fontSize:16,fontWeight:"bold",marginRight:"auto"}}>{item.name}</Text>
                      <Button
                          style={{marginRight: "auto" ,height:48, width:64 , alignSelf: "end"}}
                          title="Press me"
                          onPress={() => {
                            setClicked({key: item.key, click: !clicked.click});
                            console.log(clicked);
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
  movielist:{
    margin: 12,
    marginHorizontal: 16,
    // backgroundColor: "#cc35"
  },
  filmitem:{
    height: 150,
    display:"flex",
    flexDirection: "row",
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
  }
});
