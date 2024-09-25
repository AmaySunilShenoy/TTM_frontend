'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const LandingPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/home')
  })

  return (
    <div>page</div>
  )
}

export default LandingPage