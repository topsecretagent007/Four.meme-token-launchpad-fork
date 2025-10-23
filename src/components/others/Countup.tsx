"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TimeBg from "@/../public/assets/images/tools/timebg.png";

interface CountupProps {
  time: Date;
}

export const Countup: React.FC<CountupProps> = ({ time }) => {
  // Set the start date (counting up from this date)
  const startDate = new Date(time).getTime();

  // State for elapsed time
  const [timeElapsed, setTimeElapsed] = useState<{
    Day: number;
    Hrs: number;
    Min: number;
    Sec: number;
  }>({
    Day: 0,
    Hrs: 0,
    Min: 0,
    Sec: 0,
  });

  // Countup logic
  useEffect(() => {
    const updateCountup = () => {
      const now = new Date().getTime();
      const difference = now - startDate; // Reverse the calculation for countup

      if (difference > 0) {
        setTimeElapsed({
          Day: Math.floor(difference / (1000 * 60 * 60 * 24)),
          Hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
          Min: Math.floor((difference / (1000 * 60)) % 60),
          Sec: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeElapsed({ Day: 0, Hrs: 0, Min: 0, Sec: 0 });
      }
    };

    updateCountup();
    const interval = setInterval(updateCountup, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="relative flex flex-col justify-center items-center bg-[#1D1D1D] p-2 2xs:p-4 rounded-lg w-full max-w-[130px] 2xs:max-w-[180px] h-[48px] 2xs:h-[62px] object-cover overflow-hidden">
      <div className="z-20 gap-0.5 2xs:gap-1 grid grid-flow-col auto-cols-max text-center">
        {Object.entries(timeElapsed).map(([unit, value], index, arr) => (
          <div key={unit} className="flex flex-row justify-center items-center">
            <div className="flex flex-col items-center text-neutral-content">
              <div className="flex flex-col justify-center items-center bg-[#131313] rounded-lg w-[30px] 2xs:w-[40px] h-[40px] 2xs:h-[54px] countdown">
                <span className="font-medium text-[11px] text-text_color 2xs:text-base">{value.toString().padStart(2, "0")}</span>
                <span className="py-1 text-[7px] text-white/50 2xs:text-[10px]">{unit.toUpperCase()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countup;
