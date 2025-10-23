"use client"
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation';
import Image from "next/image";
import UserContext from '@/context/UserContext';
import Logo from "@/../public/assets/logo-light.png"
import { FooterMenu, FooterModalButton } from '@/config/TextData';

export default function Footer() {
  const { setIsLoading, setSupportModalState, setcontactUsModalState, setPolicyModalState, setServiceModalState } = useContext(UserContext);
  const router = useRouter()

  const handleToRouter = (id: string) => {
    setIsLoading(true)
    router.push(id)
  }

  const clickModal = (id: string) => {
    if (id === "support") {
      setSupportModalState(true)
    } else if (id === "contact") {
      setcontactUsModalState(true)
    } else if (id === "policy") {
      setPolicyModalState(true)
    } else if (id === "service") {
      setServiceModalState(true)
    }
  }

  return (
    <div className='relative flex flex-col bg-[#0D0D0DCC] pt-16 w-full h-full'>
      <div className="container">
        <div className='flex flex-col gap-4 w-full h-full'>
          <div className='flex flex-row justify-between items-start px-4 w-full'>
            <Image src={Logo} alt='Logo' className='rounded-full w-14 h-14' />
            <div className='flex flex-row justify-end items-start gap-6'>
              <div className='flex flex-col justify-center items-start gap-2 font-semibold text-[12px] text-white'>
                {FooterMenu.map((item, index) => {
                  return (
                    <p key={index} onClick={() => handleToRouter(item.path)} className='hover:text-text_color cursor-pointer'>
                      {item.text}
                    </p>
                  )
                })}
              </div>

              <div className='flex flex-col justify-center items-start gap-2 font-semibold text-[12px] text-white'>
                {FooterModalButton.map((item, index) => {
                  return (
                    <p key={index} onClick={() => clickModal(item.id)} className='hover:text-text_color cursor-pointer'>
                      {item.text}
                    </p>
                  )
                })}
              </div>

            </div>
          </div>
          <div className='flex flex-row justify-center items-start py-4 border-t-[1px] border-t-text_color w-full h-full font-semibold text-white/80 text-base'>
            © All rights reserved Greenfox.fun 2025
          </div>
        </div>
      </div>
    </div>
  )
}
