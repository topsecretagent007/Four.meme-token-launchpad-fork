"use client"
import React, { useEffect } from 'react'
import CreateSupport from './CreateSupport';
import CreateToken from './CreateToken';
import WaitingUser from './WaitingUser';
import { useSocket } from '@/contexts/SocketContext';

export default function index() {

  const { isLoading, setIsLoading } = useSocket();

  useEffect(() => {
    setIsLoading(false);

  }, []);

  return (
    <div className="z-20 flex flex-col w-full h-full" >
      <div className='container'>
        <div className="flex flex-col gap-3 px-4 py-14 w-full">
          <div className="flex flex-col justify-center items-center gap-3 w-full text-center">
            <p className="bg-clip-text bg-gradient-to-r from-icon_color to-[#FFFFFF] w-full font-bold text-transparent 2xs:text-[34px] text-2xl">
              Launch Your Token with GreenFox of World
            </p>
          </div>
        </div>
      </div>
      <CreateSupport />
      <CreateToken />
      <WaitingUser />
    </div >
  )
}
