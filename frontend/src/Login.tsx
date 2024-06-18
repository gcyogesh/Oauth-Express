import React from 'react';
import NavBar from './NavBar';

const Login = () => {

    const loginWithGoogle = () => {
        window.location.href = "http://localhost:6005/auth/google";
    }
    const loginWithFacebook = () => {
        window.location.href = "http://localhost:6005/auth/facebook";
    }

    return (
        <>
            <NavBar />
            <input type="text" placeholder='Email' />
            <input type="text" placeholder='Password' />
            <button>Login</button>
            <button onClick={loginWithGoogle}>Login with Google</button>
            <button onClick={loginWithFacebook}>Login with Facebook</button>
        </>
    );
}

export default Login;
