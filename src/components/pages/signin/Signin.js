import React, { useState } from "react";
import { Link} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import api from "../../../api";

// import api from '../../../api/'

export default function Signin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect( () => {
  //   async function fetchData() {
  //     return await api.createUser()
  //   }
    
  //   fetchData()
  // }, [])
  

  

  const  handleSubmit = async (e)=> {
    e.preventDefault();

    //  new Promise((resolve) => {
    //     api.createUser().then(res => {console.log(res)}) 
    //     resolve();
    //   }).catch(e => console.log(e));
    // });


      api.logUser({username,password})
      .then((res) => {
      
      console.log(res.data)
      const user = res.data
      localStorage.setItem('user', JSON.stringify(user))
      })
      .then(()=> window.location.pathname = "/feed")
      .catch(err => console.log(err))
        
      
    // axios({
    //   method: "POST",
    //   data: {
    //     username: registerUsername,
    //     password: registerPassword,
    //   },
    //   withCredentials: true,
    //   url: "http://localhost:3000/register",
    // }).then((res) => console.log(res));
    
    
    // await axios({
    //   url:"/login",
    //   method: "POST",
      
    //   mode: 'no-cors',
    //   withCredentials: true,
      
      
    // })
    //   .then((res)=>{
    //     props.history.push("/feed");
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
      <Form  onSubmit={handleSubmit} className="d-flex h-25 mb-2 flex-column justify-content-center">
        <h2 className="align-self-center mb-3">Sign In</h2>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control required
            autoFocus
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <Button block size="lg" className="align-self-center mt-3" type="submit"> 
        Sign In
        </Button>
        
      </Form>

      <Link className="signupbtn" to="/register">You don't have an account? Sign Up</Link>
    </div>
  );
}