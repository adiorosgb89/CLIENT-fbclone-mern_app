import React,{ useState } from 'react';
import {Card, Button} from 'react-bootstrap';
import api from '../../../api'

function Post(props){
//console.log(props)
const selectedPost = JSON.parse(localStorage.getItem('selectedPost'))

const [color, setColor] = useState(false);

const [description, setDescription] = useState(selectedPost.description)
const [picture, setPicture] = useState(selectedPost.picture.url ? selectedPost.picture.url : "");

function toggleColor(e) {
  setColor(color === false ? true : false);
  
    // To verify if exists next or previous sibling
  const nextS = e.target.nextSibling;
  const prevS = e.target.previousSibling;


  if(color === true){
    e.target.style.color = "#4267B2";
    if(nextS && !prevS){
      nextS.style.color = "#4267B2";
    } else if(!nextS && prevS) {
      prevS.style.color = "#4267B2";
    }
    for(let el of e.target.children){
      el.style.color = "#4267B2";
    } 
  } else {
    e.target.style.color = "#616771";
    if(nextS && !prevS){
      nextS.style.color = "#616771";
    } else if(!nextS && prevS) {
      prevS.style.color = "#616771";
    }
    for(let el of e.target.children){
      el.style.color = "#616771";
    }
  }
}

  function changeColor(e){
    if(e.target.classList.contains("col") && e.target.children){
      
      e.target.style.backgroundColor= "#E9EBEE";
    } else if(e.target.parentNode.classList.contains("col") ){
      e.target.parentNode.style.backgroundColor= "#E9EBEE";
    }
  }
  const handleChange=(e) => {
        
    setDescription(e.target.value)
    
};
  
  

  function removeColor(e){
    e.target.style.backgroundColor= "initial";
    if(e.target.classList.contains("col") && e.target.children){
      
      e.target.style.backgroundColor= "initial";
    } else if(e.target.parentNode.classList.contains("col") ){
      e.target.parentNode.style.backgroundColor= "initial";
    }
  }

  function updateSelectedPost(){
    api.updateSelectedPost(selectedPost.postId, {description, picture})
    .then(()=>{
        localStorage.removeItem('selectedPost')
        window.location.pathname = "/feed"
      })
      .catch(err=>console.log(err))
  }

  function deleteSelectedPost(){
    api.deletePost(selectedPost.postId)
    .then(()=>{
      localStorage.removeItem('selectedPost')
      window.location.pathname = "/feed"
    })
    .catch(err=>console.log(err))
  }

  const clickButton = () => {
    document.querySelector('#postPic').click();
}
  
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

    return (
    <Card style={{ width: '100%', margin: '10px 0' }}>
  
  <Card.Body className="h-auto w-100 align-items-start">
    <div className="d-flex mb-2 flex-row justify-content-start align-items-center">
        <img className="w img-fluid" alt="" src={selectedPost.author.profile_pic.url}/>
        <p className="m-0 card-title h5">{selectedPost.author.name}</p>
    </div>
    <Card.Text as="textarea" rows={3}  value={description} onChange={handleChange}>
      
    </Card.Text>
  </Card.Body>
  <input id="postPic"  type="file" onChange={onChangePicture} />
  { picture.length > 0 &&
  <Card.Img variant="top" alt="" src={picture} />}
  <div className="w-100 d-flex justify-content-evenly flex-row">
  <button type="button" className="btn poza my-3" onClick={clickButton}>
  Choose picture
                </button>
  <Button block size="md" className="align-self-center my-3 " onClick={updateSelectedPost}  type="button" >
          Save
        </Button>
        <Button block size="md" className="align-self-center my-3  delete" onClick={deleteSelectedPost}  type="button" >
         Delete post
        </Button>
  </div>
  <Card.Body className="w-100 p-0">
    <div  className="post-info justify-content-between align-items-end h-50 d-flex flex-row">
      <p className="mb-0">50 Likes</p>
      <p className="mb-0">3 Shares</p>
    </div>
    <div className="post-buttons row h-50 m-0 d-flex w-100">
      <div onClick={toggleColor} onMouseEnter={changeColor} onMouseLeave={removeColor} className="col d-flex flex-row align-items-center justify-content-center">
        <i onClick={toggleColor} className="far fa-thumbs-up me-2"></i>
        <p onClick={toggleColor} className="mb-0">Like</p>
      </div>
      <div  onMouseEnter={changeColor} onMouseLeave={removeColor} className=" col d-flex flex-row align-items-center justify-content-center">
        <i className="far fa-comment-alt me-2"></i>
        <p className="mb-0">Comment</p>

      </div>
      <div onClick={toggleColor}  onMouseEnter={changeColor} onMouseLeave={removeColor} className=" col d-flex flex-row align-items-center justify-content-center">
        <i onClick={toggleColor} className="fas fa-share me-2"></i>
        <p onClick={toggleColor} className="mb-0">Share</p>
      </div>
    
    </div>
    
    
  </Card.Body>
  
</Card>
    );
}

export default Post;
