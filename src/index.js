import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { firebase as firebaseApp } from "./firebase/config";
import { FirebaseContext } from "./store/firebaseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext.Provider value={{ firebase: firebaseApp }}>
    <App />
  </FirebaseContext.Provider>
);
