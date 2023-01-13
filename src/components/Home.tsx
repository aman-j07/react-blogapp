import { userInfo } from 'os';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { post, user } from '../types'

interface IProps{
  post:post|undefined,
  setPost:React.Dispatch<React.SetStateAction<post|undefined>>,
  user:user|null,
  posts:post[],
  setPosts:React.Dispatch<React.SetStateAction<post[]>>,
  setEditIndex:React.Dispatch<React.SetStateAction<number>>
}

function Home(props:IProps) {
  const{post,setPost,user,posts,setPosts,setEditIndex}=props;
  const navigate=useNavigate();

  const editPost=(ind:number)=>{
    // if(post!==undefined){
      setPost(posts[ind])
      localStorage.setItem('post',JSON.stringify(posts[ind]))
      setEditIndex(ind)
      navigate('/addPost')
    // }
  }

  const deletePost=(ind:number)=>{
    if(window.confirm('Are you sure you want to delete this post?')){
      posts.splice(ind,1)
      setPosts([...posts])
    }
  }

  return (
    <section className='main container border bg-light'>
      {posts.length!==0?posts.map((ele,i)=>{
        return <div className="card align-items-center m-4 p-2" >
        <div className='w-100 border-bottom d-flex justify-content-between'>
          <span>
            <h5 className="card-title text-start shorttxt">{ele.user}</h5>
            <h6 className="card-subtitle mb-2 text-muted text-start vshorttxt">{ele.lastEdited==='' ? ele.createdAt:ele.lastEdited}</h6>
          </span>
          {ele.user===user?.email?<span>
            <button className='btn btn-link py-0 text-dark' onClick={()=>{editPost(i)}}><i className="bi bi-pencil"></i></button>
            <button className='btn btn-link py-0 text-dark' onClick={()=>{deletePost(i)}}><i className="bi bi-trash"></i></button>
          </span>:""}

        </div>
        <div className="card-body w-100 ">
          {ele.image!==''?<img src={ele.image} className="card-img-top postimg w-auto" alt="..."/>:''}
          <p className="card-text text-start">{ele.txt}</p>
        </div>
      </div>
      }):<h2 className='my-4'>Add some blogs :) Its empty here!!</h2>}
    </section>
  )
}

export default Home