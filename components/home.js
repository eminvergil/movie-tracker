import React , {useState,useEffect} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {ARRAY_LENGTH, BG_IMG} from "../data/helpers";
import {Movies, Select} from "./index";
import DATA from "../data/context-filmovie.json";
import WATCHED from "../data/watched.json";
import firebase from "firebase";

const Home = ({userState,name,password,email,user,userId}) => {
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
        //TODO: Buradaki initial data bilgilerini firestore dan al
        console.log("user state: " + userState);

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
        // init clicked state to firestore
        let docExists = false;
        const db = firebase.firestore();
        let userID2 = firebase.auth().currentUser.uid;

        db.collection('movies').doc(userID2).get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    if(docSnapshot.get("clicked").data !== null){
                        docExists = true;
                        console.log("clicked array exists!");
                    }
                    docExists = false;
                }
            }).catch(err => {
                console.log('Error getting document', err);
            });

        if(!docExists){
            db.collection("movies").doc(userID2).set({clicked
            }).then(() => {
                console.log('success setting movie data');
            }).catch(err => {
                console.log(err.message +" name: " + name +" email: " + email + " pass: " + password );
            })
        }
        else{
            db.collection("movies").doc(userID2).get().then(doc => setClicked(doc.data().clicked));
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
        <>
            <View style={[styles.container, { marginTop: 0,paddingVertical:24 }]}>
                <Image
                    source={{ uri: BG_IMG }}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={150}
                />
                <Text
                    style={{
                        fontSize: 32,
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
        </>

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

