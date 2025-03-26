import { initializeApp } from "./../node_modules/firebase/firebase-app.js";
import { getFirestore } from "./../node_modules/firebase/firebase-firestore.js";
import { getAuth, onAuthStateChanged, getRedirectResult, signInAnonymously } from "./../node_modules/firebase/firebase-auth.js";

// Firebase config goes here
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

//const auth = getAuth(firebaseApp);
//signInAnonymously(auth).catch(console.error);

export { db };
