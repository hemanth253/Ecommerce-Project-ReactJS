import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDc2IpVlFU0f20_rBWQn9dHx9l-jL3q1rQ",
  authDomain: "crwn-db-764c1.firebaseapp.com",
  projectId: "crwn-db-764c1",
  storageBucket: "crwn-db-764c1.appspot.com",
  messagingSenderId: "903884598969",
  appId: "1:903884598969:web:6e7555b4b67af6184db568",
  measurementId: "G-0KG1HGYRFJ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // This returns a firestore object-we get object even though that does not wxist in DB
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// this gives acces to GoogleAuthProvider class from authenticstion library
const provider = new firebase.auth.GoogleAuthProvider();
// What this means is that we want to always trigger the Google pop up whenever we use this GoogleAuthProvider
// for authentication and SignIn
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Facebook
// const provider2 = new firebase.auth.FacebookAuthProvider();
// provider2.setCustomParameters({ prompt: "select_account" });
// export const signInWithFacebook = () => auth.signInWithPopup(provider2);

export default firebase;
