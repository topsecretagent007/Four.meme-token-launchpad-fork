"use client";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import Image from "next/image";
import { Chatting } from "@/components/trading/Chatting";
import { TradeForm } from "@/components/trading/TradeForm";
import { TradingChart } from "@/components/TVChart/TradingChart";
import { coinInfo } from "@/utils/types";
import { getCoinInfo } from "@/utils/util";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import SocialList from "../others/socialList";
import TokenData from "../others/TokenData";
import { FaCopy } from "react-icons/fa6";
import { successAlert } from "../others/ToastGroup";
import Spinner from "../loadings/Spinner";
import LogoImg from "@/../public/assets/images/logo.png"


export default function TradingPage() {
  const { coinId, setCoinId, isLoading, setIsLoading, updateCoin, setUpdateCoin } = useContext(UserContext);
  const pathname = usePathname();
  const [param, setParam] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [daysAgo, setDaysAgo] = useState<string>("0d ago")
  const [coin, setCoin] = useState<coinInfo>({} as coinInfo);
  const [copySuccess, setCopySuccess] = useState<string>(null);
  const router = useRouter()
  const limiteSolAmount: string | undefined = process.env.NEXT_PUBLIC_LIMITE_SOLAMOUNT;

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
      successAlert("Copied!")
    }
    catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  const getTimeAgo = (coinDate: Date) => {
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

  // const getLiquidity = () => {

  // }

  // const getMkpCap = () => {

  // }

  const getData = (pathname: string) => {
    setIsLoading(true)
    try {
      const fetchData = async () => {
        // Split the pathname and extract the last segment
        const segments = pathname.split("/");
        const parameter = segments[segments.length - 1];
        setParam(parameter);
        setCoinId(parameter);
        console.log("parameter   ===>", parameter)
        const data = await getCoinInfo(parameter);
        console.log("data  --->", data)
        setCoin(data);
        setProgress(data.progressMcap)
        // getLiquidity(data.progressMcap)
        // getMkpCap(data.progressMcap)
        getTimeAgo(data.date)
        setIsLoading(false)
      }
      fetchData();
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData(pathname)
  }, [pathname, updateCoin]);

  return (
    <div className="flex flex-col gap-5 mx-auto px-3 pt-10 pb-20 w-full">
      <div className="flex md3:flex-row flex-col gap-4 w-full">
        <div className="px-2 w-full">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-2">
              <Image src={coin?.url ? coin.url : LogoImg} alt="token image" width={56} height={56} className="rounded-full w-14 h-14" />
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col font-semibold text-text_color text-sm xs:text-lg">
                  {coin?.name ? coin?.name : "Token name"}
                </div>
                <div className="flex flex-col font-semibold text-[12px] text-text_color/80 xs:text-base">
                  {coin?.ticker ? coin?.ticker : "Token ticker"}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-end text-text_color">
              <p onClick={(e) => copyToClipBoard(coin?.token)} className="flex flex-row items-center gap-1 cursor-pointer">
                {coin?.token ? coin?.token : "34j34...fg8DG3"}
                <FaCopy />
              </p>
              <p className="font-semibold">Token Price</p>
            </div>
          </div>
          <TradingChart param={coin}></TradingChart>
          <Chatting param={param} coin={coin}></Chatting>
        </div>
        <div className="flex flex-col gap-4 mx-auto px-2 w-full max-w-[300px] 2xs:max-w-[420px]">
          <TradeForm coin={coin} progress={progress}></TradeForm>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 px-3 py-2 w-full">
              <p className="text-text_color text-sm lg:text-base">
                Completion : {`${coin.bondingCurve === false ? (progress / Number(limiteSolAmount) * 100).toFixed(2) : "Done"}`}% of {daysAgo}
              </p>
              <div className="relative bg-white/60 rounded-full h-2 object-cover overflow-hidden">
                <div
                  className="bg-icon_color h-2"
                  style={{ width: `${coin.bondingCurve === false ? (progress / Number(limiteSolAmount) * 100) : "100"}%` }}  // Fix: Corrected percentage calculation
                ></div>
              </div>
            </div>
          </div>

          <SocialList data={coin} />
        </div>
      </div>
      {isLoading && <Spinner />}
    </div>
  );
}
