import React,{useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { post, user } from '../types';

interface IProps{
  post:post|undefined,
  setPost:React.Dispatch<React.SetStateAction<post|undefined>>,
  posts:post[],
  setPosts:React.Dispatch<React.SetStateAction<post[]>>,
  user:user|null,
  setUser:React.Dispatch<React.SetStateAction<user|null>>,
  editIndex:number,
  setEditIndex:React.Dispatch<React.SetStateAction<number>>
}

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

function AddPost(props:IProps) {
  const navigate=useNavigate();
  const {post,setPost,posts,setPosts,user,setUser,editIndex,setEditIndex}=props
  const textRef=useRef<HTMLTextAreaElement>(null);
  const imageRef=useRef<HTMLInputElement>(null);
  const textErrRef=useRef<HTMLParagraphElement>(null);

  useEffect(()=>{
    if(editIndex!==-1 && textRef.current!==null && imageRef.current!==null && post!==undefined){
      textRef.current.value=post?.txt
    }
  },[])

  const addPost=(e:any)=>{
    e.preventDefault();
    if(textRef.current!==null && textErrRef.current!==null){
      textRef.current.value.length<20?textErrRef.current.innerText='Blog must be of atleast 20 characters':textErrRef.current.innerText=''
      if(textErrRef.current.innerText!==''){
        return
      }
      if(user){
        let date = `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getHours()}:${new Date().getMinutes()}`;
        let tempPost={
          txt:textRef.current.value,
          image:post!==undefined ? post.image:'',
          createdAt:date,
          lastEdited:'',
          user:user.email,
        }
        tempPost.txt=textRef.current.value;
        setPost(tempPost)
        let tempPosts=posts
        tempPosts.push(tempPost)
        setPosts(tempPosts)
        localStorage.setItem('posts',JSON.stringify(tempPosts))
        alert('Post added successfully')
        e.target.reset();
      }
    }
  }

  const editPost=(e:any)=>{
    e.preventDefault();
    if(textRef.current!==null && post!==undefined){
    let date = `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getHours()}:${new Date().getMinutes()}`;
    let tempPost={...post,
      txt:textRef.current.value,
      lastEdited:date,
    }
    let tempPosts=posts;
    if(post!==undefined){
      tempPosts[editIndex]=tempPost;
      setPosts(tempPosts);
      setEditIndex(-1)
      alert('Post edited successfully')
      navigate('/');
    }
  }
  }

  const handleChangeImage=()=>{
    if(textRef.current!==null&&imageRef.current!==null && imageRef.current.files){
      let tempPost={
        txt:textRef.current.value,
        image:URL.createObjectURL(imageRef.current.files[0]),
        createdAt:'',
        lastEdited:'',
        user:'',
      };
      setPost(tempPost)
    }
  }
  

  return (
    <div className='addPost mx-auto my-2 border p-3'>
      <h3 className="pb-2 border-2 border-bottom text-start">{editIndex===-1?'Add Post':'Edit Post'}</h3>
      <form className=' text-start' onSubmit={(e)=>{editIndex===-1?addPost(e):editPost(e)}}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Content</label>
          <textarea className="form-control" ref={textRef} id="exampleFormControlTextarea1" rows={3}></textarea>
          <p className='vshorttxt text-danger' ref={textErrRef}></p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Add image</label>
          <input type="file" className="form-control" onChange={handleChangeImage} ref={imageRef} id="exampleFormControlInput1" />
        </div>
        <button className='btn btn-success'>{editIndex===-1?'Add Post':'Edit Post'}</button>
      </form>
      {post?.image&&post.image!==''?<img src={post?.image} className='previewimg' alt='post pic'/>:''}
    </div>
  )
}

export default AddPost