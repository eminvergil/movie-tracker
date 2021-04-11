import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, Image} from "react-native";

import {Select, Movies, Login} from "./components";

import {
    ARRAY_LENGTH,
    BG_IMG,
} from "./data/helpers";

import DATA from "./data/context-filmovie.json"
import WATCHED from "./data/watched.json"

export default function App() {
    const [clicked, setClicked] = useState([{
        key: "",
        click: "",
        title: "",
        description: "",
        image: "",
        release_date: ""
    }]);

    useEffect(() => {
        //assigning DATA array to state
        for (let i = 0; i < ARRAY_LENGTH; i++) {
            clicked[i] = {
                key: DATA[i].key,
                click: false,
                title: DATA[i].title,
                description: DATA[i].description,
                image: DATA[i].image,
                release_date: DATA[i].release_date
            };
        }
    }, []);

    return (
        <View style={[styles.container, {marginTop: 32}]}>
            <Image
                source={{uri: BG_IMG}}
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
                Movie Tracker
            </Text>

            {/*<Login/>*/}

            <Select/>

            <Movies clicked={clicked} setClicked={setClicked} watched={WATCHED}/>
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
