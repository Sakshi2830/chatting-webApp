import React from 'react'
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import "./Login.css"
const Login = () => {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch((error) => alert(error.message))
    }


    return (
        <div className="login">
            <div className="login__telegram">
            <h1>Let's Talk</h1>
                <img 
                    src={`${process.env.PUBLIC_URL}undraw_Texting_re_l11n.svg`}
                />
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
