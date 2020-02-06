import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD5cexdURutibfviuro5a2ug2My0Vg2Trs",
  authDomain: "well-clothed-db.firebaseapp.com",
  databaseURL: "https://well-clothed-db.firebaseio.com",
  projectId: "well-clothed-db",
  storageBucket: "well-clothed-db.appspot.com",
  messagingSenderId: "392409430961",
  appId: "1:392409430961:web:91cab5c76f7ceb72279b90"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

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
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account " });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
