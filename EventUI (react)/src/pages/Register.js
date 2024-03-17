import React from 'react'
import {useState} from 'react'
export default function Register({onSubmit}) {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
  return (
      <form onSubmit={onSubmit} className='container col-md-6 border border-success rounded'>
          <div style={{textAlign:"center"}}><h1> Registration Form</h1></div>
          <label className='form-label'>Username</label>
          <input className='form-control' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <label className='form-label'>password</label>
          <input className='form-control' type="password" name="password" value={password} onChange = {e => setPassword(e.target.value)}/>
          <div style={{textAlign:'center',marginBottom:"4px",marginTop:"8px"}} ><button className='btn btn-dark' type="submit">Submit</button></div>
        </form>
  )
}
