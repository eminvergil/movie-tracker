import React, {  useEffect } from "react";

import { ContainerApp } from "./components";
import firebase from 'firebase/app';

import { firebaseConfig } from "./data/context";

export default function App() {

    useEffect(() => {
        try {
          firebase.initializeApp(firebaseConfig);
        }catch (e) {
            console.log("unexpected error : ", e)
        }
    },[])

  return (
      <>
          <ContainerApp />
      </>);
}

