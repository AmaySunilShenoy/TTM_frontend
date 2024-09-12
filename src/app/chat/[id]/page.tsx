'use client';
import ChatArea from '@/components/ChatArea';
import { useParams } from 'next/navigation'
import React from 'react'

const Chat = () => {
    const {id} = useParams()
  return (
    <div>
        <ChatArea />
    </div>
  )
}

export default Chat