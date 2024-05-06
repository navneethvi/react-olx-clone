import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Create from "./pages/Create";
import ViewPost from "./pages/ViewPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./store/AuthContext";
import { FirebaseContext } from "./store/firebaseContext";
import { getAuth } from "firebase/auth";
import Post from "./store/PostContext";

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(firebase);
    auth.onAuthStateChanged((user)=>{
      setUser(user)
      console.log(user);
      console.log("ho");
    })
  },[]);

  return (
    <div className="App">
      <Post>
        <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/product" element={<ViewPost/>}/>
        </Routes>
        <ToastContainer />
      </Router>
      </Post>
    </div>
  );
}

export default App;
