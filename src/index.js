import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { firebase } from "./firebase/config";
import { FirebaseContext } from "./store/firebaseContext";
import Context from "./store/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
