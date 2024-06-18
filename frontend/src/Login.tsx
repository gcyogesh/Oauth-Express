import React from 'react'
import NavBar from './NavBar'

const Login = () => {

    const loginWithGoogle =()=>{
        window.location.href= "http://localhost:6005/auth/google/callback";
    }

  return (
    <>
    <NavBar/>
    
      <input type="text" placeholder='Email' />
      <input type="text" placeholder='Password' />
      <button>Login</button>

      <button onClick={loginWithGoogle}>Login with google </button>
    </>
  )
}

export default Login