
import {createContext} from "react";

export const firebaseConfig = {
    apiKey: "AIzaSyCfevNPNIz2nsx7LheF0nxzlkMIBJ_C4-4",
    authDomain: "auth-6b119.firebaseapp.com",
    projectId: "auth-6b119",
    storageBucket: "auth-6b119.appspot.com",
    messagingSenderId: "34641101515",
    appId: "1:34641101515:web:6dba323a7985d6d177d14e",
    measurementId: 'G-measurement-id',
    databaseURL: 'https://auth-6b119-default-rtdb.europe-west1.firebasedatabase.app/',

};

const userContext = {
    email: "init",
    password: "init"
}

// export const FirebaseContext = createContext(firebaseConfig);
export const UserContext = createContext(userContext);