import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useHistory();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
          });

          const json = await response.json()
          console.log(json);
          if (json.success){
              // save the auth token and redirect
              localStorage.setItem("authtoken", json.authtoken);
              history.push("/")
              props.showAlert("Logged in successfully","success")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
                    <small id="emailHelp" class ="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="pasword">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="pasword" name="password" onChange={onChange} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary my-3" >Submit</button>
            </form>
        </div>
    )
}

export default Login
