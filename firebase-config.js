// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  initializeFirestore,
} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {firestore} from 'firebase/firestore';

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  databaseURL: 'https://partner-app-18899.firebaseio.com',
  apiKey: 'AIzaSyB-5DqBejHqq71IZ77EbEMpoODMVYqVN9M',
  authDomain: 'prtnr-3d97e.firebaseapp.com',
  projectId: 'prtnr-3d97e',
  storageBucket: 'prtnr-3d97e.appspot.com',
  messagingSenderId: '243216815010',
  appId: '1:243216815010:web:8635e1cf0623a5672a18fb',
  measurementId: 'G-CGLW1CPTML',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);'
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

//const db = getFirestore(app);

const storage = getStorage(app);
export {db, storage, firebaseConfig};

