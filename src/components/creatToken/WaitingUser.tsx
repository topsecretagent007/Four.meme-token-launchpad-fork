import React from 'react'
import Image from 'next/image'
import Waiting from "@/../public/assets/images/tools/waiting-user.png"
import User1 from "@/../public/assets/images/user/user01.png"
import User2 from "@/../public/assets/images/user/user02.png"
import User3 from "@/../public/assets/images/user/user03.png"

export default function WaitingUser() {
  return (
    <div className="flex flex-col w-full container">
      <div className="flex flex-col justify-center items-center gap-2 px-4 py-[70px] 2xs:py-[140px] pb-10 2xs:pb-20">
        <div className="flex flex-col justify-center items-center bg-[#784FD8]/10 border-[2px] border-white/10 rounded-lg w-[54px] 2xs:w-[72px] h-[54px] 2xs:h-[72px]">
          <Image src={Waiting} alt="Waiting" className="z-30 absolute flex flex-col rounded-full w-8 2xs:w-12 h-8 2xs:h-12" />
        </div>
        <div className="flex flex-row items-center gap-2 font-semibold 2xs:text-[34px] text-2xl">
          <p className="text-icon_color">Applicants</p>
          <p className="text-white">In Waiting</p>
        </div>
        <div className="justify-center items-center w-full text-[12px] text-white/50 2xs:text-sm xs:text-base md:text-lg text-center">
          We appreciate your interest and look forward to reviewing your submission!
        </div>
        <div className="flex flex-row justify-center items-center gap-2 pt-4">
          <div className="relative flex flex-row items-center w-[72px]">
            <Image src={User1} alt="User1" className="z-30 absolute flex flex-col rounded-full" />
            <Image src={User2} alt="User2" className="left-5 z-20 absolute flex flex-col rounded-full" />
            <Image src={User3} alt="User3" className="left-10 z-10 absolute flex flex-col rounded-full" />
          </div>
          <div className="flex flex-row justify-center items-end gap-1 text-[12px] 2xs:text-base">
            <p className="font-semibold text-text_color">(200)</p>
            <p className="text-white">People in the waitlist</p>
          </div>
        </div>
      </div>
    </div>
  )
}
