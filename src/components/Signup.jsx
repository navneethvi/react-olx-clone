import React, { useState } from 'react'
import Logo from "../olx-logo.png"
import {firebase as app} from "../firebase/config"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"


function Signup() {

const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [phone, setPhone] = useState()
const [password, setPassword] = useState("")

const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, email, phone, password);
    const auth = getAuth(app)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user = userCredential.user
      console.log("User created : ",user);
    })
    .catch((error)=>{
      console.log("Error creating user : ", error);
    })
}
  return (
    <div>
          <div className="signupParentDiv">
        <img width="200px" height="200px" style={{display:'flex', justifyContent: "center", alignItems:"center", marginLeft: "75px"}} src={Logo} alt='Logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e)=>{
                setUsername(e.target.value)
            }}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>{
                setPhone(e.target.valueAsNumber)
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
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <text>Login</text>
      </div>
    </div>
  )
}

export default Signup
