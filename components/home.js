import React , {useState,useEffect} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {ARRAY_LENGTH, BG_IMG} from "../data/helpers";
import {Movies, Select} from "./index";
import DATA from "../data/context-filmovie.json";
import WATCHED from "../data/watched.json";

const Home = () => {
    const [clicked, setClicked] = useState([
        {
            key: "",
            click: "",
            title: "",
            description: "",
            image: "",
            release_date: "",
        },
    ]);

    const [filtered,setFiltered] = useState();
    const [watched,setWatched] = useState([]);
    const [selectWatched,setSelectWatched] = useState(true);

    useEffect(() => {
        // init data
        //assigning DATA array to state
        for (let i = 0; i < ARRAY_LENGTH; i++) {
            clicked[i] = {
                key: DATA[i].key,
                click: false,
                title: DATA[i].title,
                description: DATA[i].description,
                image: DATA[i].image,
                release_date: DATA[i].release_date,
            };
        }

        // init watched data
        for (let i = 0; i < WATCHED.length; i++) {
            watched[i] = {
                key: WATCHED[i].key,
                title: WATCHED[i].title,
                click: WATCHED[i].click,
            }
        }

        const filteredMovies = clicked.filter(function (array_el) {
            return (
                watched.filter(function (anotherOne_el) {
                    return anotherOne_el.key == array_el.key;
                }).length == 0
            );
        });


        setFiltered(filteredMovies);

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
                Movie Tracker
            </Text>

            {/*<Login/>*/}

            <Select selectWatched={selectWatched} setSelectWatched={setSelectWatched}/>

            <Movies clicked={clicked} setClicked={setClicked} watched={watched} setWatched={setWatched} filtered={filtered} setFiltered={setFiltered} selectWatched={selectWatched} setSelectWatched={setSelectWatched}/>
        </View>
    );
};

export default Home;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: 10,
    },
});

