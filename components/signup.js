import React ,  {useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput,Button,TouchableHighlight} from "react-native";

import firebase from 'firebase';

const SignUp = ({navigation}) => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [user, setUser] = useState();


    const Sign = () => {
        firebase.auth().createUserWithEmailAndPassword(email,password).then(cred => {
            return firebase.db().collection("users").doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password,
            }).then(() => {
                console.log('success signup component');
            }).catch(err => {
                console.log(err.message +" name: " + name +" email: " + email + " pass: " + password );
            })

        }).catch((err) => {
            console.log(err.message +" name: " + name +" email: " + email + " pass: " + password );
        })
    }

    useEffect(() => {
       // firebase.auth().onAuthStateChanged(us => {
       //     console.log("signed in : ", us);
       // })
    }, []);

    return (
        <View style={styles.contain}>

            <Text style={[styles.login,{marginBottom: 50}]}>SignUp</Text>

            <TextInput placeholder="Your name" maxWidth={300} width={250} textContentType="Name" autoCompleteType="name" style={styles.input}  value={name} onChangeText={setName} />
            <TextInput placeholder="Your name" maxWidth={300} width={250} textContentType="Email" autoCompleteType="email" style={styles.input}  value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password"  maxWidth={300} width={250} autoCompleteType="password" textContentType="password" style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword}/>
            <TouchableHighlight style={styles.button}>
                <Button
                    // onPress={}
                    style={{borderRadius:12}}
                    onPress={() => {
                        if(!user) navigation.navigate('Login');
                        Sign();
                        // console.log("user not found - error login component");
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
