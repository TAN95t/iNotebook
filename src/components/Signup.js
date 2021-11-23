import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""})
    let history = useHistory();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email,password })
          });
          const json = await response.json()
          console.log(json)
          if (json.success){
              // save the authtoken and redirect
              localStorage.setItem("authtoken", json.authtoken);
              history.push("/")
              props.showAlert("Account created successfully","success")
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
                    <label htmlFor="name">Name</label>
                    <input type="name" className="form-control" name="name" onChange={onChange}id="name" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class ="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={onChange}id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class ="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} id="password" minLength={5} required placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Signup
