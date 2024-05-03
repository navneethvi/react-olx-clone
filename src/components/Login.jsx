import React, { useState } from 'react'
import Logo from "../olx-logo.png"
import { Link } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) =>{
        e.preventDefault()
        console.log(email, password);
    }
  
       return (
    <div>
      <div className="loginParentDiv">
      <img width="200px" height="200px" style={{display:'flex', justifyContent: "center", alignItems:"center", marginLeft : "50px"}} src={Logo} alt='Logo'></img>
        <form onSubmit={handleLogin}>
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
          <button>Login</button>
        </form>
        <Link to={"/signup"} style={{textDecoration: "none", color : "inherit"}}><h4 className='dont-have' >Dont have an account? SignUp</h4></Link>
      </div>
    </div>
  );
 
}

export default Login
