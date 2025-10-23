"use client";
import Image from "next/image";
import HomePage from "@/components/home";


export default function Home() {
  const array = new Array(36).fill(null)

  return (
    <div className="relative flex flex-col w-full h-full min-h-[calc(100vh-250px)] object-cover overflow-hidde">
      <div className="z-20 mx-auto w-full max-w-[1440px] h-full">
        <HomePage />
      </div>

      <div className='-top-20 absolute w-full min-h-screen perspective'>
        {array.map((key, id) => {
          return (
            <div
              key={id}
              className='top-4 3xs:top-6 2xs:top-7 3.5xs:top-5 xs:top-8 2sm:top-16 sm:top-10 -left-5 2xs:-left-6 3.5xs:-left-5 absolute w-[240px] 3xs:w-[350px] 2xs:w-[390px] 3.5xs:w-[300px] xs:w-[490px] 2sm:w-[680px] sm:w-[600px] md:w-[730px] md2:w-[800px] h-[240px] 3xs:h-[350px] 2xs:h-[390px] 3.5xs:h-[300px] xs:h-[490px] 2sm:h-[680px] sm:h-[600px] md:h-[730px] md2:h-[800px] duration-[16s] cube_anim path mask'
              style={{ '--i': id } as React.CSSProperties}
            />
          )
        })}
      </div>
    </div>
  );
}
