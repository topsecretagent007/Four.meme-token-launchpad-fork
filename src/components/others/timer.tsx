import Image from "next/image";
import { FC, useEffect, useState } from "react";
import TimeBg from "@/../public/assets/images/tools/time-bg.png";

interface IProps {
  value: number;
}

const TimerCard: FC<IProps> = ({ value }) => {
  const [currentValue, setCurrentValue] = useState<number>(value);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    if (currentValue !== value) {
      setAnimate(false); // Reset animation
      setTimeout(() => setAnimate(true), 600); // Restart animation after a short delay
      setCurrentValue(value);
    }
  }, [value]);

  return (
    <div className="relative flex flex-col bg-black/30 p-1.5 2xs:p-3 md:p-1.5 md2:p-3 border-[2px] border-white/5 rounded-2xl w-full h-full max-h-[74px] 2xs:max-h-[108px] md:max-h-[70px] md2:max-h-[108px] overflow-hidden font-bold text-3xl">
      <Image src={TimeBg} alt="TimeBg" className="-top-1 -left-0 z-10 absolute w-[120%] h-[120%]" />
      <div className={`flex flex-col items-center mt-[-65px] 2xs:mt-[-56px] md:mt-[-65px] md2:mt-[-56px] w-full transition-all duration-500 ease-in-out`}>
        <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value - 2) < 0 ? "59" : (value - 2).toString().padStart(2, "0")}</span>
        <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value - 1) < 0 ? "59" : (value - 1).toString().padStart(2, "0")}</span>
        <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{value.toString().padStart(2, "0")}</span>
        <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value + 1) > 59 ? "00" : (value + 1).toString().padStart(2, "0")}</span>
        <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value + 2) > 59 ? "00" : (value + 2).toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export default TimerCard;

// <div className="relative flex flex-col bg-black/30 p-3 border-[2px] border-white/5 rounded-2xl w-[102px] h-[108px] overflow-hidden font-bold text-3xl">
//       <Image src={TimeBg} alt="TimeBg" className="-top-1 -left-0 z-10 absolute w-[134px] h-[134px]" />

//       <div className={`flex flex-col items-center absolute top-[-45px] left-7 transition-all duration-500 ease-in-out`}>
//         <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value - 2) < 0 ? "59" : (value - 2).toString().padStart(2, "0")}</span>
//         <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value - 1) < 0 ? "59" : (value - 1).toString().padStart(2, "0")}</span>
//         <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{value.toString().padStart(2, "0")}</span>
//         <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value + 1) > 59 ? "00" : (value + 1).toString().padStart(2, "0")}</span>
//       </div>
//     </div>
