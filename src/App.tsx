import React, { useState,useEffect } from "react";
import { Routes, Route,Link } from "react-router-dom";
import "./App.css";
import AddPost from "./components/AddPost";
import Home from "./components/Home";
import SignInOut from "./components/SignInOut";
import { post, user } from "./types";

const defaultPosts=[{
  txt:`hich don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
  image:'https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
  createdAt:`12 Jan 14:12`,
  lastEdited:``,
  user:`aman@gmail.com`,
},
{
  txt:`hich don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
  image:'https://images.unsplash.com/photo-1673271044466-b23ea152130f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  createdAt:`12 Jan 14:12`,
  lastEdited:``,
  user:`aman@gmail.com`,
},{
  txt:`hich don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
  image:'https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  createdAt:`12 Jan 14:12`,
  lastEdited:``,
  user:`aman@gmail.com`,
},{
  txt:`hich don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
  image:'https://images.unsplash.com/photo-1673529944909-93fa82415ad5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  createdAt:`12 Jan 14:12`,
  lastEdited:``,
  user:`aman@gmail.com`,
}]

function App() {
  const [users,setUsers]=useState<user[]>([])
  const [user,setUser]=useState<user|null>(null)
  const [post, setPost] = useState<post>();
  const [posts,setPosts]=useState<post[]>(defaultPosts)
  const [editIndex,setEditIndex]=useState<number>(-1)

    // Populating local storage values in state
  useEffect(()=>{
    let localUser=localStorage.getItem('blogUser')
    let localUsers=localStorage.getItem('blogUsers')
    let localPost=localStorage.getItem('post')
    let localPosts=localStorage.getItem('posts')

    if(localUser){
    setUser(JSON.parse(localUser))
    }
    if(localUsers){
      setUsers(JSON.parse(localUsers))
    }
    if(localPosts){
      setPosts(JSON.parse(localPosts))
    }
    if(localPost){
      setPost(JSON.parse(localPost))
    }
  },[])


  return (
    <div className="App position-relative">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to='/' className="text-decoration-none"><span className="navbar-brand"><i className="bi bi-pencil-square fs-4"></i> Blogzz</span></Link>
            <span>
              {user===null?<button type="button" className="btn border-0 text-white text-muted" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Sign in to add post">Add a Post</button>:<Link to='/addPost'><button className="btn border-0 text-white" >Add Post</button></Link>}
              {user===null?<Link to='/signInOut'><button className="btn border-0 text-white">Sign In</button></Link>:<button className="btn border-0 text-white" onClick={()=>{setUser(null);localStorage.setItem('blogUser','')}}>Sign Out</button>}
            </span>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home post={post} setPost={setPost} user={user} posts={posts} setPosts={setPosts} setEditIndex={setEditIndex} />} />
        <Route path="/addPost" element={<AddPost post={post} setPost={setPost} posts={posts} setPosts={setPosts} user={user} setUser={setUser} editIndex={editIndex} setEditIndex={setEditIndex}/>} />
        <Route path="/signInOut" element={<SignInOut user={user} setUser={setUser} users={users} setUsers={setUsers}/>} />
      </Routes>
      <footer className="footer bg-dark text-white d-flex flex-wrap justify-content-between align-items-center py-4 px-3 border-top position-absolute bottom-0 w-100">
        <div className="col-md-4 d-flex align-items-center">
         <i className="bi bi-pencil-square fs-4 me-2"></i>
          <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <i className="bi bi-facebook"></i>
          </li>
          <li className="ms-3">
            <i className="bi bi-twitter"></i>
          </li>
          <li className="ms-3">
            <i className="bi bi-instagram"></i>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
