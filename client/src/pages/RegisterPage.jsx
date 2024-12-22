import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios";
const RegisterPage = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   async function registerUser(ev){
        ev.preventDefault();
        try{
          await axios.post('/register',{
            name,
            email,
            password,
        })
        alert('registration successfull! now you can login');
        }
        catch(e){
        alert('registration failed ! please try again later'); 
        }
    }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mt-20'>
       <h1 className='text-4xl text-center mb-4' >Register</h1> 
       <form className='max-w-md mx-auto' onSubmit={registerUser}>
      <input type="text" placeholder='jhon doe'
        value={name}
        onChange={(ev)=>setName(ev.target.value)} />  
      <input onChange={(ev)=>setEmail(ev.target.value)}
       type="email" placeholder='example@gmail.com' 
       value={email} />
      <input onChange={(ev)=>setPassword(ev.target.value)}
       type="password" placeholder='Enter your password'
        value={password}/>
      <button className='primary'>Register</button>
      <div className='text-center p-2 text-gray-500'>
        already a member? <Link className='underline text-blue-700' to={'/login'}>Login</Link>
      </div>
      </form> 
      </div>
    </div>
  )
}

export default RegisterPage
