import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey:"AIzaSyCpZ9W1zt9znShCBWJYg1O97nIvLuIctJw",
  authDomain: "masheed-d942d.firebaseapp.com",
  databaseURL: "https://masheed-d942d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "masheed-d942d",
  storageBucket: "masheed-d942d.appspot.com",
  messagingSenderId: "564275998549",
  appId: "1:564275998549:web:3149406430ddb9d68389dc",
  measurementId: "G-573VG9CRSJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
