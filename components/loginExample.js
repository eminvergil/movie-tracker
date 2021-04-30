import React ,  {useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput,Button,TouchableHighlight} from "react-native";

import firebase from 'firebase';





const LoginExample = ({navigation}) => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
       firebase.auth().onAuthStateChanged(us => {
           console.log("signed in : ", us);
       })
    }, []);

    // if (initializing) return null;

    return (
        <View style={styles.contain}>

            <Text style={styles.login}>Welcome to this app</Text>
            <Text style={[styles.login,{marginBottom: 50}]}>Please Login</Text>

            <TextInput placeholder="Your name" maxWidth={300} width={250} textContentType="username" autoCompleteType="username" style={styles.input}/>
            <TextInput placeholder="Password"  maxWidth={300} width={250} autoCompleteType="password" textContentType="password" style={styles.input} secureTextEntry={true}/>
            <TouchableHighlight style={styles.button}>
                <Button
                    // onPress={}
                    style={{borderRadius:12}}
                    onPress={() => {
                        if(!user) navigation.navigate('Home')
                        console.log("user not found - error login component");
                    }}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="login button"
                />
            </TouchableHighlight>

        </View>
    );
};

export default LoginExample;

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
