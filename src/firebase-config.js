import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgqY5X3Dc3Qup3t16eDGm31VF2k8a5omM",
    authDomain: "geolocate-react-10952.firebaseapp.com",
    projectId: "geolocate-react-10952",
    storageBucket: "geolocate-react-10952.appspot.com",
    messagingSenderId: "805725548274",
    appId: "1:805725548274:web:e5dc61e9a329dd24542a6b",
    measurementId: "G-2MQNPDKX1G"
  };
  
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)