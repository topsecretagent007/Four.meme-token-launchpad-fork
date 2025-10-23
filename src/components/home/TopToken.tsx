"use client"
import { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { FaXTwitter } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { FaTelegramPlane } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { coinInfo } from "@/utils/types";
import KingImg from "@/../public/assets/images/logo.png"

import NotImage from "@/../public/assets/images/no-image.png"
import User1 from "@/../public/assets/images/user/user01.png"
import User2 from "@/../public/assets/images/user/user02.png"
import User3 from "@/../public/assets/images/user/user03.png"
import CheckIcon from "@/../public/assets/images/tools/check-icon.png"
import Countdown from "../others/Countdown";


const TopToken: FC<{ data: coinInfo[] }> = ({ data }) => {
  const { setIsLoading, bnbPrice } = useContext(UserContext);
  const [daysAgo, setDaysAgo] = useState<string>("0d ago");
  const [topTokenData, setTopTokenData] = useState<coinInfo>({} as coinInfo);
  const router = useRouter();

  const limiteBnbAmount: string | undefined = process.env.NEXT_PUBLIC_LIMITE_BNBAMOUNT;

  const handleToRouter = (id: string) => {
    setIsLoading(true)
    router.push(id)
  }

  const getDaysAgo = (coinDate: Date) => {
    const pastDate = new Date(coinDate); // Convert the ISO string to a Date object
    const currentDate = new Date(); // Get the current local date and time
    const differenceInMs = currentDate.getTime() - pastDate.getTime(); // Difference in milliseconds

    if (differenceInMs < 1000 * 60 * 60 * 24) {
      // Less than a day
      if (differenceInMs < 1000 * 60) {
        // Less than a minute
        setDaysAgo("Just now");
      } else {
        const _minutesAgo = Math.floor(differenceInMs / (1000 * 60));
        if (_minutesAgo < 60) {
          // Less than an hour
          setDaysAgo(`${_minutesAgo}m ago`);
        } else {
          // Less than an hour
          const minutesAgo = Math.floor(_minutesAgo / 60);
          setDaysAgo(`${minutesAgo}h ago`);
        }
      }
    } else {
      const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24)); // Convert ms to days
      setDaysAgo(`${daysAgo}d ago`);
    }
  };

  const getTopToken = (data: coinInfo[]) => {
    let sortedData = [...data]; // Create a new array to prevent direct state mutation

    sortedData.sort((a, b) => b.progressMcap - a.progressMcap);

    console.log("sortedData ==> ", sortedData[0])
    setTopTokenData(sortedData[0])
    getDaysAgo(sortedData[0].date)
  }

  useEffect(() => {
    console.log("data ==> ", data)
    if (Array.isArray(data) && data.length > 0) {
      getTopToken(data)
    }
  }, [data])

  return (
    <div className="z-20 px-2 w-full h-full">
      <div className="flex flex-col justify-between items-start gap-6 w-full">
        <div className="flex md:flex-row flex-col justify-between items-center gap-10 px-5 py-16 w-full h-full min-h-[calc(100vh-100px)]">
          <div className="flex flex-col justify-start items-start gap-3 w-full max-w-[620px]">
            <div className="relative flex flex-row gap-2 backdrop-blur-xl p-1.5 border-[1px] border-main_color/40 rounded-full">
              <div className="relative flex flex-row items-center w-[80px]">
                <Image src={User1} alt="User1" className="z-30 absolute flex flex-col rounded-full" />
                <Image src={User2} alt="User2" className="left-6 z-20 absolute flex flex-col rounded-full" />
                <Image src={User3} alt="User3" className="left-12 z-10 absolute flex flex-col rounded-full" />
              </div>
              <p className="relative bg-clip-text bg-gradient-to-r from-main_color to-text_color pr-2 text-transparent text-base">
                Join 100K+ Member
              </p>
            </div>
            <div className="flex flex-col w-full font-bold text-[28px] 2xs:text-[34px] xs:text-[48px] sm:text-[56px] md:text-[40px] md2:text-[48px] md3:text-[52px] lg:text-[56px] xl:text-[64px]">
              <p className="w-full text-white leading-tight">
                <span className="bg-clip-text bg-gradient-to-r from-main_color to-text_color pr-2 text-transparent">GreenFox of World</span> is Launching A Token
              </p>
            </div>
            <div className="flex flex-col w-full text-[12px] text-white/70 xs:text-sm md2:text-sm sm:text-base md3:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim.
            </div>
            <div className="flex flex-row justify-start items-center gap-1 2xs:gap-3 pt-4 text-[12px] 2xs:text-base">
              <div onClick={() => handleToRouter('/create-coin')} className="flex flex-row items-center gap-1 bg-main_color/20 backdrop-blur-xl mx-auto xs:mx-0 px-6 py-3 border-[1px] border-main_color rounded-full font-semibold text-text_color cursor-pointer">
                Create a Token
              </div>
              <button disabled={topTokenData?.token ? false : true} onClick={() => handleToRouter(`/trading/${topTokenData?.token}`)} className={`${topTokenData?.token ? "cursor-pointer bg-main_color/20 text-text_color border-[1px] border-main_color" : "bg-white/10 text-white/30 cursor-not-allowed"} px-6 py-3 rounded-full font-semibold backdrop-blur-xl `}>
                Buy Now
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:max-w-[300px] md2:max-w-[360px] lg:max-w-[400px] xl:max-w-[512px]">
            <div className="relative flex flex-col mx-auto rounded-xl w-full max-w-[512px] h-full object-cover overflow-hidden">
              <Image src={topTokenData?.url ? topTokenData?.url : NotImage} alt="TokenImg" width={512} height={512} className="top-0 left-0 relative flex flex-col bg-black/40 backdrop-blur-xl border-[1px] border-main_color/40 rounded-xl w-full h-full" />
              <div className="bottom-2 xs:bottom-4 md:bottom-2 absolute flex flex-col px-1.5 w-full">
                <div className="flex flex-row justify-between items-center bg-[#0d0d0d]/80 backdrop-blur-xl mx-auto p-1.5 2xs:p-3 md:p-1.5 border-[1px] border-main_color/40 rounded-lg w-full md:max-w-[480px]">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <div className="bg-[#0d0d0d]/50 p-2.5 border-[1px] border-main_color/40 rounded-lg w-[52px] h-[52px]">
                      <Image src={topTokenData?.url ? topTokenData?.url : NotImage} alt="TokenOwner" width={30} height={30} className="rounded-full w-[30px] h-[30px]" />
                    </div>
                    <div className="flex flex-col justify-start">
                      <p className="text-white text-sm md:text-sm 2xs:text-base 2md:2xs:text-base xs:text-lg lg:xs:text-lg">
                        {topTokenData?.name ? topTokenData?.name : "GFOW"}
                      </p>
                      <p className="flex flex-row items-center gap-1 text-[10px] text-white/60 2xs:text-[12px] 2md:text-[12px] md:text-[10px] xs:text-sm lg:text-sm">
                        {topTokenData?.ticker} / BNB
                        <Image src={CheckIcon} alt="CheckIcon" className="w-4 h-4" />
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-[10px] text-white/60 2xs:text-[12px] 2md:text-[12px] md:text-[10px] xs:text-sm lg:text-sm">
                      Total Supply
                    </p>
                    <p className="font-medium text-main_color text-base md:text-base 2xs:text-lg 2md:text-lg xs:text-xl lg:text-xl">
                      1000000000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Countdown time={topTokenData?.date} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopToken;
