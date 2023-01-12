import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../types";


interface IProps{
  user:user |null,
  setUser:React.Dispatch<React.SetStateAction<user|null>>,
  users:user[],
  setUsers:React.Dispatch<React.SetStateAction<user[]>>
}

function SignInOut(props:IProps) {
  const navigate=useNavigate()
  const{user,setUser,users,setUsers}=props;
  const [sign,setSign]=useState('up')

  const refName=useRef<HTMLInputElement>(null)
  const refEmail=useRef<HTMLInputElement>(null)
  const refPhone=useRef<HTMLInputElement>(null)
  const refProfilePic=useRef<HTMLInputElement>(null)
  const refPassword=useRef<HTMLInputElement>(null)
  const refConPassword=useRef<HTMLInputElement>(null)
  

  const signIn=(e:any)=>{
    e.preventDefault();
    if(refEmail.current?.value===''||refPassword.current?.value===''){
      alert('Please fill all the fields')
      return 
    }
    let found=users.findIndex((ele:user)=>ele.email===refEmail.current?.value)
    if(found>-1){
      if(refEmail.current!==null&&refPassword.current!==null)
        {
          if(users[found].email===refEmail.current.value && users[found].password===refPassword.current.value){
            setUser(users[found])
            localStorage.setItem('user',JSON.stringify(users[found]))
            navigate('/')
            alert('Sign In successfull!')
          }
          else{
            alert('Entered credential are wrong!!')
          }
        }
    }else{
      alert('User with this email does not exist')
    }
  }

  const signUp=(e:any)=>{
    e.preventDefault();
    if(refName.current!==null && refEmail.current!==null&&refPassword.current!==null&&refPhone.current!==null && refProfilePic.current!==null && refName.current.value!=='' && refEmail.current.value!==''&&refPassword.current.value!==''&&refPhone.current.value!==''&& refProfilePic.current.value!==''){
      let found=users.findIndex((ele:user)=>ele.email===refEmail.current?.value)
      if(found>-1){
        alert('User already exists')
      }else{
        let obj:user={
          name:refName.current.value,
          email:refEmail.current.value,
          phone:Number(refPhone.current.value),
          profilePic:refProfilePic.current.value,
          password:refPassword.current.value,
        }
        setUser(obj)
        localStorage.setItem('user',JSON.stringify(obj))
        let temp=users
        temp.push(obj)
        setUsers(temp)
        localStorage.setItem('users',JSON.stringify(temp))
        alert('Sign up successful')
        navigate('/')
      }
    }
    else{
      alert('Please fill all the fields')
    }
  }

  return (
      <div className="signInOut mx-auto my-4 border p-4 rounded-2 text-start">
        <h4 className="pb-2 border-2 border-bottom"> {sign==='up'?'Sign Up':'Sign In'} </h4>
        <form className="my-2" onSubmit={sign==='up'?signUp:signIn}>
          {sign==='up'?<div className="mb-3">
            <label htmlFor="name" className="form-label m-0">
              Name
            </label>
            <input
            ref={refName}
            required
              type="type"
              className="form-control"
              id="name"
            />
          </div>:''}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label m-0">
              Email address
            </label>
            <input
              type="email"
              ref={refEmail}
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          {sign==='up'?<><div className="mb-3">
            <label htmlFor="exampleInputPhone1" className="form-label m-0">
              Phone
            </label>
            <input
            ref={refPhone}
            required
              type="number"
              className="form-control"
              id="exampleInputPhone1"
            />
          </div><div className="mb-3">
            <label htmlFor="ProfilePic" className="form-label m-0">
              Profile Picture
            </label>
            <input
            ref={refProfilePic}
            required
              type="file"
              className="form-control"
              id="ProfilePic"
            />
          </div></>:''}
          
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label m-0">
              Password
            </label>
            <input
            ref={refPassword}
            required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          {sign==='up'? <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label m-0">
              Confirm Password
            </label>
            <input
            ref={refConPassword}
            required
              type="password"
              className="form-control"
              id="confirmPassword"
            />
          </div>:''}
          {sign==='up' ? <button type="submit" className="btn btn-success w-100 rounded-0" >Sign Up</button>:<button type="submit" className="btn btn-success rounded-0 w-100"  >Sign In</button>}
        </form>
        <span className="shorttxt">{sign==='in'?<>New user?<button className="btn btn-link shorttxt p-0" onClick={()=>{setSign('up')}}>Sign Up</button></>:<>Have an account?<button className="btn btn-link shorttxt p-0" onClick={()=>{setSign('in')}}>Sign In</button></>}</span>
      </div>
  );
}

export default SignInOut;