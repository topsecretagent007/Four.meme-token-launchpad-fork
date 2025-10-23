'use client'
import React, { useContext, useEffect, useRef } from 'react'
import UserContext from '@/context/UserContext';

export default function SupportModal() {
  const { supportModalState, setSupportModalState } = useContext(UserContext);
  const menuDropdown = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setSupportModalState(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);


  return (
    <div className='z-50 fixed inset-0 flex justify-center items-center backdrop-blur-md w-full'>
      <div ref={menuDropdown} className="relative flex flex-col gap-3 bg-[#090B1A] shadow-[0px_8px_8px_0px] shadow-main_color px-6 py-10 border-[1px] border-main_color rounded-md w-full max-w-[300px] sm:max-w-xl text-main_color">
        <button
          onClick={() => setSupportModalState(false)}
          className="top-3 right-3 absolute bg-main_color/5 p-1 border-[1px] border-main_color rounded-full text-main_color"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="font-bold text-2xl text-center">Support</h2>

        <div className='flex flex-col w-full h-full text-white'>
          
        </div>
      </div>
    </div>
  )
}
