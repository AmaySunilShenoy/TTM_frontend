import React, { useEffect } from 'react'
import {helveticaLight} from '../../app/fonts/index'
import { FcGoogle } from 'react-icons/fc'
import CircularProgress from '@mui/material/CircularProgress';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import instance from '@/constants/axios';
import RegisterForm from './RegisterForm'
import { useUser } from '@/contexts/UserContext';
import Google from './GoogleLogin';

const LoginForm = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showInput, setShowInput] = React.useState(false)
    const [showRegister, setShowRegister] = React.useState(false)
    const [isButtonLoading, setIsButtonLoading] = React.useState(false)
    const {user,login} = useUser()

    useEffect(() => {
      if(user){
        console.log('User:', user)
      }
    }, [user])

    const handleSubmit = async() => {
      console.log('Email:', email)
        if(!showInput){
          instance.post('/auth/checkuser', {email, usingGoogle: false}).then((res) => {
            if(res.data.user){
              setShowInput(true)
            } else {
              setShowRegister(true)
            }
          }).catch((err) => {
            console.log(err)
          })
        }else{
            await login({email, password, usingGoogle: false})
        }
    }


  return (
    showRegister ? <RegisterForm email={email}/> : (<div className="flex flex-col items-center mt-10">
          <div className="bg-lightBlack p-12 w-fit flex flex-col items-center rounded-3xl shadow-2xl">
          <input type="text" placeholder="Enter your email" className="w-[300px] h-[50px] m-4 p-3 px-5 rounded-md bg-lightBlack text-lightWhite border border-lightWhite outline-none placeholder-lightWhite focus:border-2" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={showInput}/>
          <div className={`relative ${showInput ? 'h-fit' : 'h-0'}`}>
          <input type={showPassword ? 'text': 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-[300px] ${showInput ? 'h-[50px] p-3 m-4 border border-lightWhite' : 'h-0'}  px-5 rounded-md transition-all bg-lightBlack text-lightWhite placeholder-lightWhite focus:border-2`}/>
          {showPassword ? <FaEye className={`absolute right-8 top-8 cursor-pointer hover:scale-105 ${showInput ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowPassword(false)}/> : <FaEyeSlash className={`absolute right-8 top-8 cursor-pointer hover:scale-105 ${showInput ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowPassword(true)}/>}
          </div>
          <button className="w-[290px] h-[50px] m-4 p-2 rounded-md transition-all bg-lightWhite text-black hover:-translate-y-2 " onClick={handleSubmit}>{ !isButtonLoading ? showInput ? 'Login' : 'Continue with Email' : <CircularProgress size={24} color='inherit' className='mt-1 text-black'/> }</button>
          <div className="flex items-center justify-center gap-4">
            <hr className="w-[100px]"/>
            <p>Or</p>
            <hr className="w-[100px]"/>
          </div>
          {/* Google login */}
          <Google />
          </div>
    </div>)
  )
}

export default LoginForm