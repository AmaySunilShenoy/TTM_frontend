'use client'
import { useUser } from '@/contexts/UserContext'
import React, { useEffect } from 'react'

const Page = () => {
    const {logout} = useUser()
    useEffect(() => {
        logout()
    },[])
  return (
    <div>
    </div>
  )
}

export default Page