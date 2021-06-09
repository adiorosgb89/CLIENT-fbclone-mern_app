import React, {useState, useEffect} from 'react';
import './Main.css'
import Post from './Post'
import MakePost from './MakePost'
import api from "../../../api";


function MainPage(props){
  const currentUserId = JSON.parse(props.user)._id

    const [posts, setPosts] = useState([])

    // useEffect(() => {
    //   console.log(data)
    // }, [data])
    // const user = JSON.parse(localStorage.user)
    // const handleData = () =>{
    //   const user = JSON.parse(localStorage.user)
    //   console.log(user)
    // //  // setData(oldData => [...oldData, data])
    // //  setData(data=>([...data, newData]))
     
     
    // }

    //setPosts([...posts, data])
    useEffect(() => {
      async function getPosts() {
      await api.showPosts().then(res=>{
        //console.log(res.data)
        setPosts([...posts,res.data])
      })
      .catch(err=>console.log(err))
    }
    getPosts()
    }, []);

    // for (let i = 0; i < posts.length; i++) {
    //   console.log(posts[i])
      
    // }

    // if(posts.length){
    //   for(let post of posts[0]){
    //     console.log(post)
    //   }
    // }
    
    // if(posts.length){
    //   posts[0].map((post)=>console.log(post.author))
    // }

    // function displayPosts(){
    //   if(posts.length){
    //     return (
    //       <>
    //       {posts[0].map((post)=>(
    //         <Post desc={post}/>
    //       ))}
    //       </>
    //     );
    //   }
    // }

    

    

    //console.log(posts)
    return (
        <div className="main w-100">
          <MakePost  />

          
        
        
          
          {posts.length > 0 && posts[0].reverse().map((post)=>(
            <Post 
            currentUserId={currentUserId}
            key={post._id} 
            postId={post._id}
            author={post.author} 
            description={post.description ? post.description : ''}
            picture={post.picture ? post.picture : ''}
            />
          ))}
        
      </div>
      
    );
}


export default MainPage;