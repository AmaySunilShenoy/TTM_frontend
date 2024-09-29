import React from 'react'
import {helveticaLight} from '../../app/fonts/index'
import { FcGoogle } from 'react-icons/fc'
import CircularProgress from '@mui/material/CircularProgress';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import instance from '@/constants/axios';
import { useUser } from '@/contexts/UserContext';

const RegisterForm = ({email} :{email : string}) => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmpassword, setConfirmPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [isButtonLoading, setIsButtonLoading] = React.useState(false)
    const {login} = useUser()

    const handleSubmit = async () => {
        instance.post('/auth/register', {username, email, password}).then(async (res) => {
            if (res.status == 201){
                console.log('User:', res.data.user)
                await login({email, password, usingGoogle: false})
            }
        }).catch((err) => {
            console.log(err)
        })
    }


  return (
    <div className="flex flex-col items-center mt-10">
          <div className="bg-lightBlack p-12 w-fit flex flex-col items-center rounded-3xl shadow-2xl">
          <input type="text" placeholder="Enter your email" className="w-[300px] h-[50px] m-4 p-3 px-5 rounded-md bg-lightBlack text-lightWhite border border-lightWhite outline-none placeholder-lightWhite focus:border-2" value={email} readOnly={true}/>
          <input type="text" placeholder="Enter your username" className="w-[300px] h-[50px] m-4 p-3 px-5 rounded-md bg-lightBlack text-lightWhite border border-lightWhite outline-none placeholder-lightWhite focus:border-2" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <div className={`relative h-fit`}>
          <input type={showPassword ? 'text': 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-[300px] h-[50px] p-3 m-4 border border-lightWhite px-5 rounded-md transition-all bg-lightBlack text-lightWhite placeholder-lightWhite focus:border-2`}/>
          {showPassword ? <FaEye className={`absolute right-8 top-8 cursor-pointer hover:scale-105 opacity-100`} onClick={() => setShowPassword(false)}/> : <FaEyeSlash className={`absolute right-8 top-8 cursor-pointer hover:scale-105 opacity-100`} onClick={() => setShowPassword(true)}/>}
          </div>
          <div className={`relative h-fit`}>
          <input type={showConfirmPassword ? 'text': 'password'} placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-[300px] h-[50px] p-3 m-4 border border-lightWhite px-5 rounded-md transition-all bg-lightBlack text-lightWhite placeholder-lightWhite focus:border-2`}/>
          {showConfirmPassword ? <FaEye className={`absolute right-8 top-8 cursor-pointer hover:scale-105 opacity-100`} onClick={() => setShowConfirmPassword(false)}/> : <FaEyeSlash className={`absolute right-8 top-8 cursor-pointer hover:scale-105 opacity-100`} onClick={() => setShowConfirmPassword(true)}/>}
          </div>
          <button className="w-[290px] h-[50px] m-4 p-2 rounded-md transition-all bg-lightWhite text-black hover:-translate-y-2 " onClick={handleSubmit}>Create an Account</button>
          <div className="flex items-center justify-center gap-4">
            <hr className="w-[100px]"/>
            <p>Or</p>
            <hr className="w-[100px]"/>
          </div>
          {/* Google login */}
          <button className="w-[300px] h-[50px] m-4 p-6 rounded-md bg-lightWhite flex gap-6 text-center justify-between items-center rainbow-5 shadow-xl transition-all duration-[600ms] hover:-translate-y-1 text-black group" > <FcGoogle className="transition-all duration-[600ms] group-hover:translate-x-[117px] group-hover:scale-150 group-hover:rotate-[360deg]"/> <span className={`mr-10 transition-all duration-[600ms] group-hover:translate-x-10 group-hover:opacity-0 ${helveticaLight.className}`}>Continue with Google</span></button>
          </div>
    </div>
  )
}

export default RegisterForm