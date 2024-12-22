import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try{
     await axios.post('/login',{
      email,
      password
     },{withCredentials:true})
     setRedirect(true);
     alert('Login succesfull!')
    }catch(e){
      alert('Login Failed!');
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mt-20'>
       <h1 className='text-4xl text-center mb-4' >Login</h1> 
       <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
      <input type="email" 
      placeholder='example@gmail.com'
      value={email}
       onChange={(ev)=>setEmail(ev.target.value)} />
      <input type="password" 
      placeholder='Enter your password' 
      value={password} 
      onChange={(ev)=>setPassword(ev.target.value)}/>
      <button className='primary'>Login</button>
      <div className='text-center p-2 text-gray-500'>
        dont't have an account yet? <Link className='underline text-blue-700' to={'/register'}>Register now</Link>
      </div>
      </form> 
      </div>
    </div>
  )
}

export default LoginPage
