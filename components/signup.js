import React ,  {useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput,Button,TouchableHighlight} from "react-native";

import firebase from 'firebase';

import "firebase/firestore"



const SignUp = ({navigation}) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [user, setUser] = useState();

    const Sign = () => {
        const db = firebase.firestore();
        firebase.database.enableLogging(true);

        firebase.auth().createUserWithEmailAndPassword(email,password).then(cred => {
            return db.collection("users").doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password,
            }).then(() => {
                console.log('success signup component');
                navigation.navigate('Login');
                setUser(true);
            }).catch(err => {
                console.log(err.message +" name: " + name +" email: " + email + " pass: " + password );
                setUser(false);
            })

        }).catch((err) => {
            console.log(err.message +" name: " + name +" email: " + email + " pass: " + password );
            navigation.navigate('NotFound');
            setUser(null);
        })
    }

    useEffect(() => {
    }, []);

    return (
        <View style={styles.contain}>
            <Text style={[styles.login,{marginBottom: 50}]}>SignUp</Text>

            <TextInput placeholder="Name" maxWidth={300} width={250}  autoCompleteType="name" style={styles.input}  value={name} onChangeText={setName} />
            <TextInput placeholder="Email" maxWidth={300} width={250}  autoCompleteType="email" style={styles.input}  value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password"  maxWidth={300} width={250} autoCompleteType="password"  style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword}/>
            <TouchableHighlight style={styles.button}>
                <Button
                    style={{borderRadius:12}}
                    onPress={async () => {
                        await Sign();
                        if(user) navigation.navigate('Login',{user,name,email,password});
                        if (user === false) navigation.navigate('NotFound');
                    }}
                    title="SignUp"
                    color="#841584"
                    accessibilityLabel="login button"
                />
            </TouchableHighlight>

        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    contain: {
        // flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
        margin: 50,
        marginVertical: "50%",
    },
    margin: {
        margin: 10,
    },
    login:{
        fontSize:28,
        textAlign:"center",
        fontWeight:"bold",
        marginBottom: 10,
    },
    button:{
        fontSize:32,
        borderRadius: 12,
        width: 200,
        height: 40
    },
    input:{
        fontSize:24,
        borderRadius:12,
        borderColor:"#f38eed",
        borderWidth:2,
        padding:10,
        marginBottom: 15,
    }
});
