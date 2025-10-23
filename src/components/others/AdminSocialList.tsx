"use client"
import React from 'react'
import { AdminSocialData } from '@/config/TextData'

export default function AdminSocialList() {
  return (
    <div className='flex flex-col justify-start items-start gap-2 text-main_color'>
      {AdminSocialData.map((item: any, index: number) => {
        return (
          <a href={`${item.url}`} key={index} className='flex flex-col bg-main_color/5 backdrop-blur-xl backdrop-blur-xl p-[14px] hover:px-[18px] hover:py-[14px] border-t-[1px] border-t-main_color border-r-[1px] border-r-main_color border-b-[1px] border-b-main_color rounded-r-lg text-xl hover:text-3xl cursor-pointer'>
            {item.icon}
          </a>
        )
      })}
    </div>
  )
}
