"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TimeBg from "@/../public/assets/images/tools/timebg.png";
import TimerCard from "./timer";

interface CountdownProps {
  time: Date;
}

const Countdown: React.FC<CountdownProps> = ({ time }) => {
  // Set the target time (change this as needed)
  const targetDate = new Date(time).getTime();

  // State for countdown values
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = now - targetDate;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate])

  return (
    <div className="relative flex flex-col justify-center items-center bg-black/20 backdrop-blur-xl mx-auto px-2 2xs:px-4 md:px-2 md2:px-4 pt-2 2xs:pt-4 md:pt-2 md2:pt-4 pb-1 2xs:pb-2 md:pb-1 md2:pb-2 border-[1px] border-main_color/40 rounded-3xl w-full max-w-lg h-full object-cover overflow-hidden">
      <Image
        src={TimeBg}
        alt="Countdown Background"
        className="top-0 left-0 z-10 absolute w-full h-full"
      />
      <div className="z-20 flex flex-row items-center auto-cols-max w-full text-center">
        <div className="relative flex flex-col items-center w-full object-cover overflow-hidden">
          <TimerCard value={timeLeft.days} />
          <div className="pt-1 2xs:pt-2 md:pt-1 md2:pt-2 text-[10px] text-gray-400 md:text-[12px] 2xs:text-sm md2:text-sm uppercase">Days</div>
        </div>
        <p className="px-0.5 2xs:px-1 md:px-1.5 lg:px-2 pb-4 2xs:pb-8 2md:pb-8 md:pb-4 text-white text-lg lg:text-2xl">:</p>
        <div className="relative flex flex-col items-center w-full object-cover overflow-hidden">
          <TimerCard value={timeLeft.hours} />
          <div className="pt-1 2xs:pt-2 md:pt-1 md2:pt-2 text-[10px] text-gray-400 md:text-[12px] 2xs:text-sm md2:text-sm uppercase">hours</div>
        </div>
        <p className="px-0.5 2xs:px-1 md:px-1.5 lg:px-2 pb-4 2xs:pb-8 2md:pb-8 md:pb-4 text-white text-lg lg:text-2xl">:</p>
        <div className="relative flex flex-col items-center w-full object-cover overflow-hidden">
          <TimerCard value={timeLeft.minutes} />
          <div className="pt-1 2xs:pt-2 md:pt-1 md2:pt-2 text-[10px] text-gray-400 md:text-[12px] 2xs:text-sm md2:text-sm uppercase">minutes</div>
        </div>
        <p className="px-0.5 2xs:px-1 md:px-1.5 lg:px-2 pb-4 2xs:pb-8 2md:pb-8 md:pb-4 text-white text-lg lg:text-2xl">:</p>
        <div className="relative flex flex-col items-center w-full object-cover overflow-hidden">
          <TimerCard value={timeLeft.seconds} />
          <div className="pt-1 2xs:pt-2 md:pt-1 md2:pt-2 text-[10px] text-gray-400 md:text-[12px] 2xs:text-sm md2:text-sm uppercase">seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
