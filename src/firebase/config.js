import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4jpt2jouF3m3NWVuACNB9UacA3rM-KUo",
  authDomain: "olx-clone-fafd5.firebaseapp.com",
  projectId: "olx-clone-fafd5",
  storageBucket: "olx-clone-fafd5.appspot.com",
  messagingSenderId: "173151682126",
  appId: "1:173151682126:web:b91a41da633e6035770d1f",
  measurementId: "G-GN27XJ6HGC"
};

const app = initializeApp(firebaseConfig);

export {app as firebase}