import UserContext from '@/context/UserContext'
import React, { useContext } from 'react'

export default function SupportButton() {
  const { setSupportModalState } = useContext(UserContext);

  return (
    <div onClick={() => setSupportModalState(true)} className='flex flex-col bg-main_color/10 px-4 py-2 border-[1px] border-main_color rounded-lg text-main_color text-base cursor-pointer'>
      <div className='hidden sm:flex flex-col'>
        Support
      </div>
      <div className='sm:hidden flex flex-col'>
        ?
      </div>
    </div>
  )
}
