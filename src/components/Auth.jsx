import React from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

import Cookies from 'universal-cookie'
const cookies = new Cookies()


const Auth = ({setIsAuth}) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('auth-token', result.user.refreshToken)
            setIsAuth(true)
        } catch(err){
            console.error(err)
        }
    }

    return (
        <div className='auth'>
            <p>Sign in with google to continue</p>
            <button onClick={signInWithGoogle}>Continue with Google</button>
        </div>
    )
}

export default Auth