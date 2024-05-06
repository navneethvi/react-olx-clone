import React, { useContext, useState } from "react";
import Logo from "../olx-logo.png";
import { Link } from "react-router-dom";
import { FirebaseContext } from '../store/firebaseContext'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  // const firebase = useContext(FirebaseContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const {firebase} = useContext(FirebaseContext)


  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        successMessage()
        const user = userCredential.user;
        console.log("User logged in:", user);
        navigate("/")
      })
      .catch((error) => {
        failureMessage()
        console.error("Error signing in:", error);
      });
  };

  const successMessage = () => toast.success("Login Successfull");
  const failureMessage = () => toast.error("Login Failed");

  return (
    <div>
      <div className="loginParentDiv">
        <img
          width="200px"
          height="200px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "50px",
          }}
          src={Logo}
          alt="Logo"
        ></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link
          to={"/signup"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h4 className="dont-have">Dont have an account? SignUp</h4>
        </Link>
      </div>
    </div>
  );
}

export default Login;
