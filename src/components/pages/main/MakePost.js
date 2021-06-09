import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import api from "../../../api";

function MakePost (props){
  const user = localStorage.getItem('user')
    const [description, setDescription] = useState("")
    const [picture, setPicture] = useState(null);
    

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
          document.querySelector('#imgtest').click();
      }

    const handleChange=(e) => {
        
        setDescription(e.target.value)
        
 };

    const handleSubmit = (e) =>{
        e.preventDefault()
        api.createPost({description,picture,user})
        .then(()=>{
          
          window.location.pathname = "/feed"
          
          // function sendData(){
          //   props.postsData(posts);
          // }
          // sendData()
          
          
          //console.log(res.data)
        })
        .catch(err=>console.log(err))
       
    }
    //console.log(posts)

    // SEND POSTS TO MAINPAGE
    // function sendData(){
    //   props.postsData(posts);
    // }

    // sendData()

    


    return (
        <div className="my-5 makepost">
        <Form  onSubmit={handleSubmit} className="d-flex my-3 flex-column align-items-center" encType="multipart/form-data">
            
            
            <Form.Group>
                <Form.Control as="textarea" rows={3}  value={description} onChange={handleChange} type="text" placeholder="What to post?"></Form.Control>
            </Form.Group>
            <div className="makepostbtn">
            
            
            
            <Form.Control type="file" accept='image/*' onChange={onChangePicture} id="imgtest" name="nevoias[poza]"  />
            <button type="button" className="btn poza" onClick={clickButton}>
                Alege poză
                </button>
                <Button type="submit"  className="">Make a post</Button>
                </div>
                
            
        </Form>
        <div className="previewPostPic">
                <img className="post_pic" alt="" src={picture} />
              </div>
        

        
        </div>

    );
}

export default MakePost;