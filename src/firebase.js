import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_t6a3jwlrmLTuWHloh-JoCKDUrEuepZE",
    authDomain: "r-tracker-e507e.firebaseapp.com",
    databaseURL: "https://r-tracker-e507e-default-rtdb.firebaseio.com",
    projectId: "r-tracker-e507e",
    storageBucket: "r-tracker-e507e.firebasestorage.app",
    messagingSenderId: "1064297603945",
    appId: "1:1064297603945:web:78dde1da955145012613f8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy };
