// https://usehooks.com/useOnClickOutside/

import React, {useState,useEffect, useRef} from 'react';
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'
//import profilePlaceHolder from '../../assets/img.png'
import './navComp.css';



function NavComp(props){
  const user = JSON.parse(props.user)
  
  const ref = useRef();
  const [display, setDisplay] = useState(false);
  const [input, setInput] = useState("");

 

  useOnClickOutside(ref, () => setDisplay(false));

  function toggleDisplay() {
    setDisplay(display === false ? true : false);
  }

  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          
          if (!ref.current || ref.current.contains(event.target)) {
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

  

  
  

    return (
        <div className={`${props.titlu === "main" ? "overflow-scroll" : ""} w-100 d-block`}>
        <div className=" top-nav position-absolute fixed-top w-100 justify-content-center h-auto">
            <div className="d-flex mb-1 mt-1 flex-row justify-content-around">
            <div className=" align-items-start w-50">
                <h1 className="ms-2 mb-0 logo"><Link className="text-decoration-none text-white  " to="/feed">Fakebuck</Link></h1>
            </div>
            <div className="d-flex w-50 flex-row align-items-center justify-content-evenly">
                <i  className={`fas fa-search ${display === false ? "d-block" : "d-none"}`} onClick={toggleDisplay}></i>
                <input ref={ref} className={display === false ? "d-none" : "d-block"}
                value={input}
                onChange={(e) => setInput(e.target.value)}/>
                <div className="d-flex flex-row align-items-center">
                <img className="w" alt="" src={user.profile_pic.url}/>
                <p  className="m-0 nameclass"><Link className="text-decoration-none  " to="/settings">{user.name}</Link></p>
                </div>
            </div>
            </div>
        </div>
        <div className={`align h-100 ${props.titlu === "main" ? "my-5 fitContent" : ""} `} >{props.content}</div>
        
        <Nav defaultActiveKey="/home" className=" fixed-bottom  w-100 justify-content-around" as="ul">
        <Nav.Item  as="li">
        {/* <Link className={props.titlu === "main" ? `active ` : ""} to="/main">Main</Link> */}
          <Nav.Link  className={props.titlu === "main" ? `${props.active}` : ""} href="/feed">Main</Nav.Link>
        </Nav.Item>
        <Nav.Item className="disabled" as="li">
          <Nav.Link className=" disabled"href="#">Market</Nav.Link>
        </Nav.Item>
        <Nav.Item  as="li">
          {/* <Link className={props.titlu === "settings" ? `active ` : ""} to="/settings">Settings</Link> */}
        <Nav.Link  className={props.titlu === "settings" ? `${props.active} ` : ""} href="/settings" >Settings</Nav.Link>
        </Nav.Item>
      </Nav>
      </div>
      
    );
}


export default NavComp;