import React from 'react'
import {jwtDecode} from "jwt-decode";
import { useUser } from '@/contexts/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import instance from '@/constants/axios';

const Google= () => {
    const {login} = useUser()

    // Function to handle the response from Google Login
    const handleSubmit = async (credentialResponse : any) => {
        const token = credentialResponse?.credential;
        const decodedToken: any = jwtDecode(token);

        const response = await instance.post('/auth/checkuser', {email: decodedToken.email})
        if(!response.data.user){
            const user = {
                username: decodedToken.name,
                email: decodedToken.email,
                password: '>/',
                usingGoogle: true
            }
            const createUser = await instance.post('/auth/register', user)

            if(!createUser.data.user){
                console.log(createUser.data.error)
            }
        }
          
        await login({email :decodedToken.email, password: '', usingGoogle: true})
      }
  return (
    <div className='my-5'>
    <GoogleLogin
        onSuccess={(credentialResponse : any) => {
            return handleSubmit(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        shape="circle"
        text="continue_with"
        width={300}
      />
      </div>
  )
}

export default Google