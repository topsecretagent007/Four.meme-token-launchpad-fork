"use client";
import React from 'react'
import Image from 'next/image';
import ArchiveFootImg from "@/../public/assets/images/tools/archive-footer.png"
import BlackBnb from "@/../public/assets/images/tools/bnb_black.png"
import BlackToken from "@/../public/assets/images/tools/token_black.png"
import TokenImg from "@/../public/assets/images/token.png"
import BnbImg from "@/../public/assets/images/tools/bnb.svg"

export default function CreateSupport() {

  return (
    <div className="flex flex-col justify-center items-center pb-20 w-full h-full">
      <div className="relative container">
        <Image src={ArchiveFootImg} alt="ArchiveFootImg" className="-bottom-10 z-10 absolute flex flex-col mx-auto px-[10%] w-full" />
        <div className="z-20 relative bg-[#0d0d0d]/50 backdrop-blur-xl mx-auto px-4 2xs:px-14 py-14 border-[1px] border-main_color/40 2xs:rounded-lg w-full max-w-[950px]">
          <div className="flex flex-col justify-center items-center w-full text-white text-center">
            <div className="flex flex-row justify-center items-center w-full text-2xl">
              <p className="pr-1 text-icon_color">Who</p>
              <p className="text-white">Can Apply?</p>
            </div>
            <p className="pt-1.5 max-w-[630px] text-[12px] text-white/50 2xs:text-sm xs:text-base">
              We're looking for creators with a strong social presence who can bring value to their communities. To be eligible, you must have:
            </p>
          </div>
          <div className="flex md:flex-row flex-col justify-between items-center gap-6 pt-10 2xs:pt-16 w-full">
            <div className="relative flex flex-col bg-black p-5 border-[1px] border-main_color/50 rounded-lg w-full max-w-[90%] 2xs:max-w-[70%]">
              <div className="flex flex-col justify-center items-center bg-[#784FD8]/10 border-[2px] border-white/10 rounded-lg w-[72px] h-[72px]">
                <Image src={BnbImg} alt="BnbImg" className="w-8 h-10" />
              </div>
              <p className="pt-3 pb-8 w-full text-white text-base">
                At least 100K followers on X (Twitter) or Instagram
              </p>
              <Image src={BlackBnb} alt="BlackBnb" className="right-2 bottom-0 absolute" />
            </div>

            <div className="relative flex flex-col bg-black p-5 border-[1px] border-main_color/50 rounded-lg w-full max-w-[90%] 2xs:max-w-[70%]">
              <div className="flex flex-col justify-center items-center bg-[#784FD8]/10 border-[2px] border-white/10 rounded-lg w-[72px] h-[72px]">
                <Image src={TokenImg} alt="TokenImg" className="w-12 h-12" />
              </div>
              <p className="pt-3 pb-8 w-full text-white text-base">
                A verifiable online presence that reflects engagement and authenticity
              </p>
              <Image src={BlackToken} alt="BlackToken" className="right-0 bottom-0 absolute" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
