import React from 'react'
import {View, Text, StyleSheet,Button,TouchableHighlight} from "react-native";


const NotFound = ({navigation}) => {

    return (
        <View style={styles.contain}>
            <Text style={[styles.login,{marginBottom: 50}]}>404 ERROR NOT FOUND</Text>

            <TouchableHighlight style={styles.button}>
                <Button
                    // onPress={}
                    style={{borderRadius:12}}
                    onPress={() => navigation.navigate('Login')}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="login button"
                />
            </TouchableHighlight>

            <TouchableHighlight style={styles.button}>
                <Button
                    // onPress={}
                    style={{borderRadius:12}}
                    onPress={() => navigation.navigate('SignUp')}
                    title="SignUp"
                    color="#841584"
                    accessibilityLabel="login button"
                />
            </TouchableHighlight>

        </View>
    );
};

export default NotFound;

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
