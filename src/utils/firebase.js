import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAzH2Dn8B2cx9wBHvvvOWaOlgr6DvLey6A",
    authDomain: "gamesource-2ea61.firebaseapp.com",
    projectId: "gamesource-2ea61",
    storageBucket: "gamesource-2ea61.appspot.com",
    messagingSenderId: "578368231875",
    appId: "1:578368231875:web:ce9967ce78a6d26d768576",
    measurementId: "G-R5PFTSJLGX"
  };

  initializeApp(firebaseConfig);

  const DB = getFirestore();
  const AUTH = getAuth();

  export {DB, AUTH};