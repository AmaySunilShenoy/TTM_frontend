'use client'
import React, { useEffect, useState } from 'react'
import { socket } from '../socket.js'

interface Message {
    role: string
    content: string
}


const ChatArea = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [userInput, setUserInput] = useState('');
  
    useEffect(() => {
      // Listen for tokens streaming from the server
      socket.emit('init chat', { name: 'Albert Einstein', period: 'Early 20th Century', field: 'Theories of Relativity, Scientific Research', contributions: 'E=mc², General and Special Relativity, Nobel Prize in Physics 1921', traits: 'Thoughtful, Intellectual, Curious, Open-Minded' });
      socket.on('chat stream', (data) => {
        setCurrentMessage(prev => prev + data.message); 
      });
  
      // Once the message is complete, add it to the message history
      socket.on('chat message end', (data) => {
        setMessages((prev : Message[]) => [...prev, { role: data.role, content: data.content }]);
        setCurrentMessage('');  // Reset current message after it's fully received
      });
  
      // Clean up listeners on component unmount
      return () => {
        socket.off('chat stream');
        socket.off('chat message end');
      };
    }, []);
  
    const sendMessage = () => {
      if (userInput.trim()) {
        // Send user input to the server
        socket.emit('chat message', userInput);
        setMessages(prev => [...prev, { role: 'user', content: userInput }]);  // Add user message to chat
        setUserInput('');  // Clear input field
      }
    };

      
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden'>
    <nav className='flex justify-between'>
        <div className='font-bold p-3'>
        Talking Time Machine
        </div>
        <div className='font-bold p-3'>
        Chat with **POI**
        </div>
        <div className='font-bold p-3'>
        Options
        </div>
    </nav>
    <div className='relative flex w-full h-full flex-1 overflow-x-hidden overflow-y-scroll pt-6 md:pr-8'>
        <div className='relative border border-red-400 mx-auto flex h-full w-full max-w-3xl flex-1 flex-col md:px-2'>
        <div className='w-3/4'>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === 'assistant' ? 'float-left' : 'float-right'}`}>
            <strong>{msg.role}: </strong>{msg.content || '...'}  {/* Display the chat messages */}
          </div>
        ))}
        {currentMessage && (
          <div className="message float-left">
            <strong>AI: </strong>{currentMessage}  {/* Display the streaming AI message */}
          </div>
        )}
            </div>
        <div className='absolute bottom-0 mx-auto w-full pt-6'>
        <fieldset className='flex w-full min-w-0 flex-col-reverse'>
        <div className='flex  flex-col  bg-bg-000  gap-1.5  border-0.5  border-border-300  pl-4  pt-2.5  pr-2.5  pb-2.5  -mx-1  sm:mx-0  items-stretch  transition-all  duration-200  relative  shadow-[0_0.25rem_1.25rem_rgba(0,0,0,0.035)]  focus-within:shadow-[0_0.25rem_1.25rem_rgba(0,0,0,0.075)]  hover:border-border-200  focus-within:border-border-200  cursor-text  z-10 rounded-t-2xl border-b-0'>
            <input type='text' value={userInput} onChange={(e) => setUserInput(e.target.value)} className='bg-transparent w-full outline-none' placeholder='Type a message...' />
            <button onClick={sendMessage} className='text-primary-500 hover:text-primary-600 focus:text-primary-600 focus:outline-none'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
            </svg>
            </button>
        </div>
        </fieldset>
    </div>
        </div>
   
    </div>
    </div>
  )
}

export default ChatArea