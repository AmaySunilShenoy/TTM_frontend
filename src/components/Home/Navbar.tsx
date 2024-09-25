import { helveticaBold } from '@/app/fonts'
import { useUser } from '@/contexts/UserContext';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'

const Navbar = () => {
  const {user, logout} = useUser();
  const navitems = ['Home', 'Explore', 'Chat']
  const router = useRouter();

  return (
    <nav className={`relative text-white p-5 ${helveticaBold.className}`}>
        <p className="text-[50px] ml-4">Talking Time Machine</p>
        <div className="flex justify-between absolute right-4 text-lg top-6 w-[30%]">
          {navitems.map((item, index) => (
          <p key={index} className="relative group cursor-pointer">
            {item}
          <span className="absolute h-[3px] bg-white -bottom-1 left-1/2 transform -translate-x-1/2 w-0 transition-all origin-center group-hover:w-full"></span>
          </p>
        ))}
        {user ? <button onClick={logout}>Logout</button> : <button onClick={() => router.push('/authenticate')}>Login</button>}
        </div>
    </nav>
  )
}

export default Navbar