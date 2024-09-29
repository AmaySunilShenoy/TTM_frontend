import React from 'react'
import {jwtDecode} from "jwt-decode";
import { useUser } from '@/contexts/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import instance from '@/constants/axios';

const Google= () => {
    const {login} = useUser()
    const handleSubmit = async (credentialResponse : any) => {
        const token = credentialResponse?.credential;
        const decodedToken: any = jwtDecode(token);
        console.log('Email:', decodedToken.email)

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
    //   <button className="w-[300px] h-[50px] m-4 p-6 rounded-md bg-lightWhite flex gap-6 text-center justify-between items-center rainbow-5 shadow-xl transition-all duration-[600ms] hover:-translate-y-1 text-black group" > <FcGoogle className="transition-all duration-[600ms] group-hover:translate-x-[117px] group-hover:scale-150 group-hover:rotate-[360deg]"/> <span className={`mr-10 transition-all duration-[600ms] group-hover:translate-x-10 group-hover:opacity-0 ${helveticaLight.className}`}>Continue with Google</span></button>

  )
}

export default Google