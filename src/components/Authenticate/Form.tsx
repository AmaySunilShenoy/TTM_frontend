import React from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm';
import Google from './GoogleLogin';

const Form = () => {
    const [showRegister, setShowRegister] = React.useState(false)
    const [email, setEmail] = React.useState('')

  return (
    <div className="flex flex-col items-center mt-10">
        <div className="bg-lightBlack px-12 py-12 w-fit flex flex-col items-center rounded-3xl shadow-2xl">
          {/* Depending on whether user exists, different forms are shown */}
    {showRegister ? <RegisterForm email={email}/> : <LoginForm email={email} setEmail={setEmail} setShowRegister={setShowRegister} />}
          <div className="flex items-center justify-center gap-4">
            <hr className="w-[100px]"/>
            <p>or</p>
            <hr className="w-[100px]"/>
          </div>
          {/* Google login */}
          <Google />
          </div>
    </div>
  )
}

export default Form