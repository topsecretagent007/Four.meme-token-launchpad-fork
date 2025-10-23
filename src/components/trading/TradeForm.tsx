'use client'
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { errorAlert, successAlert, warningAlert } from "../others/ToastGroup";
import UserContext from "@/context/UserContext";
import { getTokenBalance, swapToken, getBNBBalance } from "@/contracts/web3";
import { coinInfo } from "@/utils/types";
import { useAccount } from "wagmi";
import { useSocket } from "@/contexts/SocketContext";
import Spinner from "../loadings/Spinner";
import BnbImg from "@/../public/assets/images/tools/bnb.svg"
import TokenImg from "@/../public/assets/images/token.png"
import LoadingButton from "../loadings/LoadingButton";

interface TradingFormProps {
  coin: coinInfo;
  progress: Number;
}

export const TradeForm: React.FC<TradingFormProps> = ({ coin, progress }) => {
  const { isLoading, setIsLoading, socket, counter } = useSocket();
  const [bnb, setBnb] = useState<string>('');
  const [isBuy, setIsBuy] = useState<number>(0);
  const [tokenBal, setTokenBal] = useState<number>(0);
  const [bnbBal, setBnbBal] = useState<number>(0);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { address, isConnected } = useAccount();

  const BnbList = [
    { id: "", price: "reset" },
    { id: "0.1", price: "0.1 BNB" },
    { id: "0.5", price: "0.5 BNB" },
    { id: "1", price: "1 BNB" },
  ]

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("value--->", value)
    if (!isNaN(parseFloat(value))) {
      setBnb(value);
    } else if (value === '') {
      setBnb(''); // Allow empty string to clear the input
    }
  };

  const getBalance = async () => {
    try {
      if (!address) return;
      const balance = await getTokenBalance(address, coin.token);
      setTokenBal(balance ? balance : 0);
      const bnbBalance = await getBNBBalance(address)
      setBnbBal(bnbBalance ? parseFloat(bnbBalance) : 0)
    } catch (error) {
      setTokenBal(0);
    }
  }

  const handlTrade = async () => {
    if (!address || !isConnected) {
      warningAlert("Connect your wallet!");
      return;
    }

    if (isBuy === 0 ? (parseFloat(bnb) > bnbBal || parseFloat(bnb) <= 0) : (parseFloat(bnb) > tokenBal || parseFloat(bnb) <= 0)) {
      warningAlert("Insufficient balance!");
      return;
    }

    setLoadingButton(true);

    try {
      const amount = bnb;
      const isBuyBool = isBuy === 0;

      let result = await swapToken(coin.token, amount, isBuyBool, '0');

      if (result && result.success) {
        successAlert("Swap Successful!");
      } else {
        warningAlert("Swap failed.");
      }

      setBnb('');
      await getBalance();
    } catch (err: any) {
      console.error("Trade failed:", err);
      errorAlert("Trade failed: " + (err.message || "Unknown error"));
    } finally {
      setLoadingButton(false);
    }
  }

  useEffect(() => {
    getBalance();
    console.log("socket coin  ==>", coin)
    setIsLoading(false)

  }, [coin])

  useEffect(() => {
    console.log("socket  ==>", counter)
  }, [counter])

  return (
    <>
      <div className="bg-transparent backdrop-blur-xl px-5 py-4 border-[1px] border-main_color rounded-lg font-semibold text-white">
        <div className="flex flex-row justify-between items-center gap-8 mb-3 py-2">
          <button onClick={() => setIsBuy(0)} className={`rounded-full py-2 md:py-3 w-full text-base ${isBuy === 0 ? 'bg-[#58D764] text-black/80' : 'bg-transparent hover:bg-[#58D764]/30 text-white/70 border-[1px] border-white/10'}`}>
            Buy
          </button >
          <button onClick={() => setIsBuy(1)} className={`rounded-full py-2 md:py-3 w-full text-base ${isBuy === 1 ? 'bg-[#EF4444] text-white' : 'bg-transparent text-white/70 hover:bg-[#EF4444]/30 border-[1px] border-white/10'}`} >
            Sell
          </button>
        </div >
        <div className="relative flex flex-col xs:px-4">
          <div
            className="block text-text_color text-start"
          >
            Input Amount
          </div>
          <div className="flex flex-row items-center bg-transparent border-[1px] border-main_color rounded-lg w-full">
            <input
              type="number"
              id="setTrade"
              value={bnb}
              onChange={handleInputChange}
              pattern="\d*"
              className="bg-transparent px-3 rounded-l-md outline-none w-full text-text_color capitalize"
              placeholder="0.0"
              required
              min={0.001}
              max={95}
            />
            <div className={`${isBuy === 0 ? "px-3 py-2.5" : "px-2 py-1.5"} flex flex-col bg-main_color/30  border-l-[1px] border-l-main_color rounded-r-md text-text_color text-center`}>
              {isBuy === 0 ?
                <Image src={BnbImg} alt="BnbImg" width={20} height={20} className="rounded-full w-5 h-5" />
                :
                <Image src={coin?.url ? coin?.url : TokenImg} alt="TokenImg" width={20} height={20} className="rounded-full min-w-7 min-h-7" />
              }
            </div>
          </div>
          {
            isBuy === 0 ? (
              <div className="flex xs:flex-row flex-col gap-3 mx-auto xs:mx-0 py-2 text-center">
                {BnbList.map((item: any, index: any) => {
                  return (
                    <div key={index} className="hover:bg-main_color/30 px-2 py-1 border-[1px] border-main_color rounded-lg max-w-[100px] text-text_color hover:text-white cursor-pointer" onClick={() => setBnb(item.id)}>{item.price}</div>
                  )
                })}
              </div>
            ) : (
              <div className="flex xs:flex-row flex-col gap-3 mx-auto xs:mx-0 py-2 text-center">
                <button
                  className="hover:bg-white/30 px-2 py-1 border-[1px] border-main_color hover:border-white rounded-lg max-w-[100px] text-text_color hover:text-white cursor-pointer"
                  onClick={() => setBnb('')}
                >
                  reset
                </button>
                {[10, 25, 50, 100].map((percent) => (
                  <button
                    key={percent}
                    disabled={tokenBal === 0}
                    className={`max-w-[100px] rounded-lg px-2 py-1 border-[1px] border-main_color text-text_color cursor-pointer ${tokenBal === 0 ? "cursor-not-allowed" : "hover:text-white hover:border-white hover:bg-white/30"}`}
                    onClick={() => setBnb((tokenBal * (percent / 100)).toString())}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            )}

          <button
            className={`${isBuy === 0 ? "bg-[#58D764]" : "bg-[#EF4444]"} text-black/80 cursor-pointer w-full text-center rounded-full py-3`}
            onClick={handlTrade}
            disabled={parseFloat(bnb) === 0 || isNaN(parseFloat(bnb))}
          >
            {loadingButton ? <LoadingButton /> : 'Execute Trade'}
          </button>
        </div>
        {isLoading && <Spinner />}
      </div >
    </>

  );
};
