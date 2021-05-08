import React ,  {useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput,Button,TouchableHighlight} from "react-native";

import firebase from 'firebase';

const LoginExample = ({navigation}) => {

    const [user, setUser] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      console.log("user state: ", user);
    }, [user]);

    const LoginFirebase = async (e) => {
        e.preventDefault();

         await firebase.auth().signInWithEmailAndPassword(email, password).then(async () => {
             await (!user) ?  setUser(true) : console.log("user state is already : " ,user);
             await console.log('login success :' +" email: " + email + " pass: " + password);
        }).catch(async err => {
            await (user === true || user === null)  ? setUser(null) : "";
            console.log(err.message +" email: " + email + " pass: " + password );
        })
    }

    return (
        <View style={styles.contain}>
            <Text style={styles.login}>Welcome to this app</Text>
            <Text style={[styles.login,{marginBottom: 50}]}>Please Login</Text>

            <TextInput placeholder="Email" maxWidth={300} width={250}  autoCompleteType="email" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password"  maxWidth={300} width={250} autoCompleteType="password"  style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} />
            <TouchableHighlight style={styles.button}>
                <Button
                    style={{borderRadius:12}}
                    onPress={async (e) => {
                        await LoginFirebase(e);
                        if (user) navigation.navigate('Home')
                        if (user === false) navigation.navigate('NotFound');
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
