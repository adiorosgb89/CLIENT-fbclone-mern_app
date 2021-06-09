
// https://codesandbox.io/s/red-cherry-xjbul?file=/src/App.js:89-512 Picture prefiew


import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import './Settings.css'
import api from "../../../api";

function Settings(props){
  const user = JSON.parse(props.user)
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [picture, setPicture] = useState(user.profile_pic.url);
  

  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPicture(reader.result);
        
      });
      reader.readAsDataURL(e.target.files[0]);
      
    }
  };

  const clickButton = () => {
    document.querySelector('#profilePic').click();
}

const handleSubmit = async (e) =>{
  e.preventDefault();
  
  // const blobPic = URL.createObjectURL(new Blob([picture]))
  


  api.updateUser(user._id,{name,email,picture}).then(res=>{
    //console.log(res.data)
    
    const updatedUser = res.data
     localStorage.setItem('user', JSON.stringify(updatedUser))
     setName(res.data.name)
     setEmail(res.data.email)
    setPicture(res.data.profile_pic.url)
    window.location.reload()
    //console.log(updatedUser)

  })
  .catch(err => console.log(err))
}

function logOut(){
  console.log(document.cookie)
  api.logOutUser()
  .then(()=>{
    localStorage.clear();
    
    window.location.pathname="/"
  })
  .catch(err => console.log(err))
}

function deleteAccount(){
  
  api.deleteUser(user._id)
  .then(()=>{
    localStorage.clear();
    window.location.pathname = "/"
  })
  .catch(err => console.log(err))
}

    return (
    <div className="w-100">
        
        <div className="h-50 w-100">
        <h1 className="align-self-center mb-3">Settings</h1>
        <Form.Group size="lg"  controlId="email">
        
          <Form.Label>Full Name: </Form.Label>
          <Form.Control
            
            type="text"            
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </Form.Group>
        <Form.Group size="lg" className="mb-3" controlId="password">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </Form.Group>
        <Form.Group size="lg" className=" d-flex flex-column"  controlId="password">
        
                <input id="profilePic"  type="file" onChange={onChangePicture} />
              
              <div className="previewProfilePic">
                <img className="profile_pic" alt="" src={picture} />
              </div>
              <button type="button" className="btn poza my-3" onClick={clickButton}>
                Choose picture
                </button>
        </Form.Group>
        
        <Button block size="md" className="align-self-center my-3 " onClick={handleSubmit} type="button" >
          Save
        </Button>
        
            
            <Button block size="md" className="align-self-center my-3  logout" onClick={logOut} type="button" >
          Log out
        </Button>
        
        
        <Button block size="md" className="align-self-center my-3  delete" onClick={deleteAccount} type="button" >
         Delete account
        </Button>
            
        </div>    
    </div>);
}


export default Settings;