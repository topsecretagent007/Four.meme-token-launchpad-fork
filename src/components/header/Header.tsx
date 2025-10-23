"use client"
import { FC, useContext, useState } from "react";
import UserContext from "@/context/UserContext";
import { ConnectButton } from "../buttons/ConnectButton";
import { useRouter } from "next/navigation";
import { SwapInfo } from "@/utils/types";
import Image from "next/image";
import Logo from "@/../public/assets/logo-light.png"
import AdminSocialList from "../others/AdminSocialList";
import TopWColor from "@/../public/assets/images/backgroun/top-w.png"
import TopBColor from "@/../public/assets/images/backgroun/top-b.png"
import TopPColor from "@/../public/assets/images/backgroun/top-p.png"
import TopDot from "@/../public/assets/images/tools/pattern.png"
import SupportButton from "../buttons/SupportButton";
import SupportModal from "../modals/SupportModal";
import Spinner from "../loadings/Spinner";
import BnbImg from "@/../public/assets/images/tools/bnb.svg"

interface coinInfo {
  creator: string;
  name: string;
  url: string;
  ticker: string;
  reserveOne: number;
  reserveTwo: number;
  token: string;
  commit: string;
  progressMcap?: number;
  lamportReserves?: number;
  tokenReservests: any[];
}

const Header: FC = () => {
  const { updateCoin, setUpdateCoin, supportModalState, bnbPrice, isLoading } = useContext(UserContext);
  const router = useRouter()
  const handleToRouter = (id: string) => {
    router.push(id)
  }
  const [latestCreatedToken, setLatestCreatedToken] = useState<coinInfo>(undefined);
  const [latestSwapInfo, setLatestSwapInfo] = useState<SwapInfo>(undefined);

  // Note: BSC event listeners should be implemented here using ethers.js contract events
  // Example:
  // useEffect(() => {
  //   const contract = getContract();
  //   contract.on('TokenCreated', (creator, tokenAddress, name, symbol) => {
  //     // Handle token created event
  //   });
  //   contract.on('TokenSwapped', (user, tokenAddress, amountIn, amountOut, isBuy) => {
  //     // Handle token swap event
  //   });
  //   return () => {
  //     contract.removeAllListeners();
  //   };
  // }, []);

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-[100px]">
      <div className="z-40 px-2 container">
        <div className="flex flex-row justify-between items-center bg-white/5 backdrop-blur-xl px-2 sm:px-4 py-2 border-[1px] border-white/20 rounded-xl w-full h-full">
          <div className="flex flex-row items-center gap-8">
            <Image src={Logo} alt="Logo" width={64} height={64} onClick={() => handleToRouter('/')} className="flex flex-col justify-center items-center rounded-full w-12 sm:w-16 h-12 sm:h-16 cursor-pointer" />
            {latestSwapInfo &&
              <div>
                <div className="flex flex-col gap-1 px-4 py-2 border-[1px] border-main_color rounded-md font-medium">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] text-main_color">
                      <strong className={`${latestSwapInfo.direction === "Sold" ? "text-green-600" : "text-red-600"}`}>{`${latestSwapInfo.direction === "Sold" ? "Buy" : "Sell"}`}</strong>: {latestSwapInfo.creator.slice(0, 9)}...
                      {latestSwapInfo.creator.slice(-9)}
                    </span>
                    <div className="flex flex-row items-center gap-2 w-full">
                      <Image src={latestSwapInfo.mintUri} alt="latestSwapInfo" width={30} height={30} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
                      <span className="text-[12px] text-main_color">{`${latestSwapInfo.bnbAmountInLamports} BNB of ${latestSwapInfo.mintSymbol}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
            {latestCreatedToken &&
              <div>
                <div className="flex flex-col px-4 py-2 border-[1px] border-main_color rounded-md font-medium">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] text-main_color">
                      <strong className="font-bold text-[13px] text-green-600">New: </strong>
                      {String(latestCreatedToken.creator).slice(0, 9)}...
                      {String(latestCreatedToken.creator).slice(-9)}
                    </span>
                    <div className="flex flex-row items-center gap-2 w-full">
                      <Image src={latestCreatedToken.url} alt="latestCreatedToken" width={30} height={30} style={{ width: '30px', height: '30px', marginRight: '10px', borderRadius: '50%' }} />
                      <span className="text-[12px] text-main_color">{`${latestCreatedToken.name} on ${new Date().toDateString()}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <div className="flex flex-row items-center gap-2 sm:gap-3">
            <SupportButton />
            <ConnectButton />
          </div>
        </div>
      </div>
      <div className="top-[40vh] left-0 z-30 fixed flex flex-col h-full">
        <AdminSocialList />
      </div>

      <div className="top-[calc(100vh-40px)] right-2 z-10 fixed flex flex-col h-full text-main_color">
        <div className="flex flex-row justify-end items-center bg-main_color/10 backdrop-blur-xl px-2 py-1 border-[1px] border-main_color/20 rounded-full text-base">
          <Image src={BnbImg} alt="BNB" width={20} height={20} />
          : ${bnbPrice}
        </div>
      </div>

      <div className="top-0 right-0 absolute flex flex-col w-full h-full max-h-screen">
        <Image src={TopDot} alt="TopDot" className="top-0 absolute opacity-90" />
        <Image src={TopWColor} alt="TopWColor" className="top-0 right-0 absolute opacity-50 max-h-screen" />
        <Image src={TopBColor} alt="TopBColor" className="top-0 right-0 absolute opacity-60 max-h-screen" />
        <Image src={TopPColor} alt="TopPColor" className="top-0 right-0 absolute opacity-70 max-h-screen" />
      </div>

      {supportModalState &&
        <SupportModal />
      }

      {isLoading && <Spinner />}

    </div>
  );
};
export default Header;
