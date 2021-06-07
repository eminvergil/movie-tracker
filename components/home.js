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


    const db = firebase.firestore();
    let userID2 = firebase.auth().currentUser.uid;

    useEffect(() => {
        //TODO: Buradaki initial data bilgilerini firestore dan al
        console.log("user state: " + userState);

        // init data
        //assigning DATA array to state
        for (let i = 0 ; i < ARRAY_LENGTH; i++) {
            clicked[i] = {
                key: DATA[i].key,
                click: false,
                title: DATA[i].title,
                description: DATA[i].description,
                image: DATA[i].image,
                release_date: DATA[i].release_date,
            };
        }
        // init MOVIES COLLECTION state to firestore
        let docExists = false;

        db.collection('movies').doc(userID2).get()
            .then((doc) => {
                if (doc.exists) {
                        docExists = true;
                        console.log("### MOVIES COLLECTION exists!");
                        setClicked(doc.data().clicked);
                    }else{
                        docExists = false;
                        db.collection("movies").doc(userID2).set({clicked
                        }).then(() => {
                            console.log('success setting movie data');
                        }).catch(err => {
                            console.log("setting movie data ERROR: ",err.message );
                        })
                    }

            }).catch(err => {
                console.log('### MOVIES COLLECTION  ERROR: ', err);
            });



        // init WATCHED COLLECTION data
        for (let i = 0; i < WATCHED.length; i++) {
            watched[i] = {
                key: WATCHED[i].key,
                title: WATCHED[i].title,
                click: WATCHED[i].click,
            }
        }

        db.collection('watched').doc(userID2).get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("### WATCHED collection exists!");
                    // console.log(doc.data().watched);
                    setWatched(doc.data().watched);
                }else{
                    console.log("### WATCHED collection  NOT exists!");
                    // doc.data().set({watched});
                    db.collection("watched")
                        .doc(userID2)
                        .set({watched}).then(() => {
                            console.log('success setting watched data');
                        }).catch(err => {
                            console.log("setting watched data ERROR: ",err.message );
                        })
                }
            }).catch(err => {
                console.log('### watched collection ERROR: ', err);
        });

        // INIT FILTERED COLLECTION DATA
        const filteredMovies = clicked.filter(function async (array_el) {
             return (
                 watched.filter(function (anotherOne_el) {
                    return anotherOne_el.key == array_el.key;
                }).length == 0
            );
        });

        setFiltered(filteredMovies);

        // db.collection('filtered').doc(userID2).get()
        //     .then(async (doc) => {
        //         if (doc.exists) {
        //             console.log("### FILTERED collection exists!");
        //             setFiltered(doc.data().filtered);
        //         }else{
        //             console.log("### FILTERED collection NOT exists!");
        //             // doc.data().set({filtered});
        //             await db.collection("filtered")
        //                 .doc(userID2)
        //                 .set({filtered}).then(() => {
        //                 console.log('success setting filtered data');
        //             }).catch(err => {
        //                 console.log("setting filtered data ERROR: ",err.message );
        //             })
        //         }
        //
        //     }).catch(err => {
        //         console.log('### filtered collection ERROR: ', err);
        // });

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
                        textAlign: "center",
                    }}
                >
                    Movie Tracker
                </Text>

                {/*<Login/>*/}

                <Select selectWatched={selectWatched} setSelectWatched={setSelectWatched}/>

                <Movies clicked={clicked} setClicked={setClicked} watched={watched} setWatched={setWatched} filtered={filtered} setFiltered={setFiltered} selectWatched={selectWatched} setSelectWatched={setSelectWatched} db={db} userID2={userID2}/>
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

