import React,{ useState, useEffect, useRef } from 'react';
import {Card} from 'react-bootstrap';
import api from '../../../api'

function Post(props){
//console.log(props)
const ref = useRef()
const [color, setColor] = useState(false);
const [showMenu, setShowMenu] = useState(false);


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

  
  function showTheMenu(){
    setShowMenu(showMenu ? false : true)
  }

  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          
          if (!ref.current || ref.current.contains(event.target) || event.target.className === "post-setting"  ) {
            
            return;
          }

          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
  }

  useOnClickOutside(ref, () => setShowMenu(false));

  function removeColor(e){
    e.target.style.backgroundColor= "initial";
    if(e.target.classList.contains("col") && e.target.children){
      
      e.target.style.backgroundColor= "initial";
    } else if(e.target.parentNode.classList.contains("col") ){
      e.target.parentNode.style.backgroundColor= "initial";
    }
  }

  function deleteSelectedPost(){
    api.deletePost(props.postId)
    .then(()=>{
      localStorage.removeItem('selectedPost')
      window.location.pathname = "/feed"
    })
    .catch(err=>console.log(err))
  }

  function getSeletedPost(){
    
    localStorage.setItem('selectedPost', JSON.stringify(props))
    
     window.location.pathname = "/editselectedpost"
  }
  

    return (
    <Card style={{ width: '90%', margin: '10px 0' }}>
  
  <Card.Body className="h-auto align-items-start">
    <div className="d-flex flex-row justify-content-start align-items-center">
        <img className="w img-fluid" alt="" src={props.author.profile_pic.url}/>
        <p className="m-0 card-title h5">{props.author.name}</p>
        {props.currentUserId === props.author._id && <p  onClick={showTheMenu} className="post-setting">...</p>}
        {showMenu ? (<div ref={ref} className="post-setting-menu">
          <p onClick={getSeletedPost}> Edit post </p>
          <p onClick={deleteSelectedPost}> Delete </p>
        </div>) : (null)}
    </div>
    <Card.Text>
      {/* {props.sentData} */}
      {props.description}
    </Card.Text>
  </Card.Body>
  { props.picture &&
  <Card.Img variant="top" alt="" src={props.picture.url} />}
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
