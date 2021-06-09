import React, { useState } from "react";
import { Link} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import axios from 'axios';
import api from '../../../api/'
import "./Signup.css";

export default function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  // useEffect(() => {
  //   async function fetchMyApi() {
  //     await api.createUser().then(data => {console.log(data)})
  //   }

  //   fetchMyApi()
  // });
  

  const  handleSubmit = async (e)=> {
    e.preventDefault();

    //  new Promise((resolve) => {
    //     api.createUser().then(res => {console.log(res)}) 
    //     resolve();
    //   }).catch(e => console.log(e));
    // });
    
    api.createUser({name,email,username,password})
    .then((res) => {
      console.log(res)
      const user = res.data
      localStorage.setItem('user', JSON.stringify(user))
      })
      .then(()=> window.location.pathname = "/feed")
      .catch(err=> console.log(err))
    
    
      
        
      
  //  await axios({
  //       method: "POST",
  //       body: JSON.stringify({name,email,username,password}),
  //       data: {
  //         name: name,
  //         email: email,
  //         username: username,
  //         password: password,
  //       },
  //       withCredentials: false,
  //       url: "http://localhost:3000/register",
  //     }).then((res) => console.log(res));
    
    
    // await axios({
    //   url:"http://localhost:3000/api/register",
    //   method: "POST",
    //   body: JSON.stringify({name,email,username,password}),
    //   mode: 'no-cors',
    //   withCredentials: true,
    //   data: {name,email,username,password},
      
    // })
    //   .then((res)=>{
        
    //      console.log("hello")
    //      console.log(res)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    
  
    }


  return (
    <div className="Login w-75">
      <h1 className="text-center mb-5 h-25 ">FakeBuck</h1>
      <Form onSubmit={handleSubmit} className="d-flex h-25 mb-2 flex-column justify-content-center">
        <h2 className="align-self-center mb-3">Sign Up</h2>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Full Name: </Form.Label>
          <Form.Control required
            autoFocus
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username: </Form.Label>
          <Form.Control required
            autoFocus
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control required
            autoFocus
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <Button block size="lg" className="align-self-center mt-3" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        
      </Form>
      <Link className="signinbtn" to="/login">You have an account? Sign In</Link>
    </div>
  );
}