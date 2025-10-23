import { coinInfo, userInfo } from "@/utils/types";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import CardImg from "@/../public/assets/images/tools/card bg.png"
import NotImage from "@/../public/assets/images/no-image.png"
import Countup from "../others/Countup";
import { findHolders, getCoinTrade, getTokenPriceAndChange } from "@/utils/util";
import { KingIcon, RaydiumIcon } from "../others/Icons";

const limiteBnbAmount: string | undefined = process.env.NEXT_PUBLIC_LIMITE_BNBAMOUNT;

interface CoinBlogProps {
  coin: coinInfo;
}

export const CoinBlog: React.FC<CoinBlogProps> = ({ coin }) => {
  const { isLoading, setIsLoading, isCreated, bnbPrice } = useContext(UserContext);
  const router = useRouter()
  const [holderLength, setHolderLength] = useState<number>(0)
  const [txDataLength, setTxDataLength] = useState<number>(0)
  const [tokenPrice, setTokenPrice] = useState<number>(0)

  // const handleToProfile = (id: string) => {
  //   router.push(`/profile/${id}`)
  // }

  const handleToRouter = (id: string) => {
    setIsLoading(true)
    router.push(id)
  }

  const getHolders = async (token: string) => {
    const data = await findHolders(token);
    setHolderLength(data.length)
  }

  const getTxs = async (id: string) => {
    const data = await getCoinTrade(id);
    console.log("data", data)
    setTxDataLength(data?.record?.length)
  }

  const currentTokenPrice = async (token: string) => {
    const _price = await getTokenPriceAndChange(token);
    console.log("price", _price)
    if (_price) {
      if (typeof _price === 'object' && 'price' in _price) {
        setTokenPrice(_price.price);
      }
    }
  }

  useEffect(() => {
    if (!coin?.token || !coin?._id) return;

    const fetchData = async () => {
      await getHolders(coin.token);
      await getTxs(coin._id);
      await currentTokenPrice(coin.token);
    };

    fetchData();
  }, [coin?.token, coin?._id]);

  return (
    <div className="relative flex flex-col gap-2.5 2xs:gap-5 px-1.5 2xs:px-3 py-3">
      <Image src={CardImg} alt="CardImg" className='top-0 left-0 absolute w-[66%] object-cover' />
      <Image src={CardImg} alt="CardImg" className='right-0 bottom-0 absolute w-[50%] object-cover rotate-180' />
      <div className='z-20 flex flex-row justify-between items-center'>
        <div className='flex flex-row justify-start items-center gap-2 w-full'>
          <Image
            src={coin?.url ? coin.url : NotImage}
            alt="image"
            width={48}
            height={48}
            className="flex items-center backdrop-blur-xl border-[1px] border-main_color rounded-lg w-9 2xs:w-12 h-9 2xs:h-12 object-cover"
          />
          <div className='flex flex-col 2xs:justify-start items-start gap-2 text-main_color'>
            <p className='font-semibold 2xs:text-[18px] text-sm'>
              {coin?.name ? coin?.name : "name"}
            </p>
            <p className='text-[9px] text-main_color/70 2xs:text-[12px]'>
              {coin?.ticker ? coin?.ticker : "ticker"} / BNB
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-end'>
          <Countup time={coin?.date} />
        </div>
      </div>

      <div className='z-20 flex flex-col justify-start items-start w-full'>
        <div className="flex flex-row justify-between items-center w-full">
          <p className='text-[12px] text-main_color 2xs:text-sm'>Description</p>
          <div className="flex flex-row justify-end items-center gap-2">
            <div className='flex flex-row items-center gap-1 bg-text_color/40 backdrop-blur-xl px-2 py-1 border-[1px] border-text_color rounded-full text-[12px] text-text_color 2xs:text-sm'>
              <KingIcon />
              King
            </div>
            <div className='flex flex-row items-center gap-1 bg-main_color/20 backdrop-blur-xl px-2 py-1 border-[1px] border-main_color rounded-full text-[12px] text-main_color 2xs:text-sm'>
              <RaydiumIcon />
              Raydium
            </div>
          </div>
        </div>
        <p className='min-h-14 text-[10px] text-main_color/50 2xs:text-[12px]'>
          {coin?.description ? coin?.description : ""}
        </p>
      </div>

      <div className='z-20 flex flex-row justify-between items-center bg-black p-1.5 2xs:p-3 rounded-md 2xs:rounded-xl text-[12px] text-white/70 2xs:text-sm'>
        <div className='flex flex-col justify-center items-center gap-1 border-r-[1px] border-r-white/10 w-full'>
          <p className=''>
            Mcap
          </p>
          <p className='bg-[#1D1D1D] px-2 py-0.5 rounded-md 2xs:rounded-lg text-[#58D764]'>
            ${(coin?.progressMcap !== null || coin?.progressMcap !== undefined)
              ? (() => {
                const mcap = coin?.progressMcap * bnbPrice;
                if (mcap >= 1_000_000_000) {
                  // Billion
                  return (mcap / 1_000_000_000).toFixed(2) + 'B';
                } else if (mcap >= 1_000_000) {
                  // Million
                  return (mcap / 1_000_000).toFixed(2) + 'M';
                } else if (mcap >= 1_000) {
                  // Thousand
                  return (mcap / 1_000).toFixed(2) + 'K';
                } else {
                  // Less than thousand
                  return mcap.toFixed(2);
                }
              })()
              : 'N/A'}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center gap-1 border-r-[1px] border-r-white/10 w-full'>
          <p className=''>
            Bonding Curve
          </p>
          <p className="bg-[#1D1D1D] px-2 py-0.5 rounded-md 2xs:rounded-lg text-main_color">
            {(coin?.progressMcap < 100 ? (coin?.progressMcap / Number(limiteBnbAmount) * 100).toFixed(2) : "0")}%
          </p>
        </div>
        <div className='flex flex-col justify-center items-center gap-1 w-full'>
          <p className=''>
            Transactions
          </p>
          <p className='bg-[#1D1D1D] px-2 py-0.5 rounded-md 2xs:rounded-lg'>
            {txDataLength}
          </p>
        </div>
      </div>

      <div className='z-20 flex 2xs:flex-row flex-col justify-start items-start 2xs:items-center gap-2.5 2xs:gap-5 pb-2.5 2xs:pb-5 text-[12px] 2xs:text-sm'>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-white/60'>Total Holders:</p>
          <p className='text-main_color'>{holderLength}</p>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <p className='text-white/60'>Owner:</p>
          <p className="text-white">
            {typeof coin?.creator === "object" && coin?.creator?.name ? coin.creator.name : "creater"}
          </p>
        </div>
      </div>
      <div className='z-20 flex flex-row justify-start items-center gap-2.5 2xs:gap-5'>
        <div onClick={() => handleToRouter(`/trading/${coin?.token}`)} className='flex flex-col bg-main_color/20 hover:bg-main_color/60 px-2.5 2xs:px-5 py-1 2xs:py-2 border-[1px] border-main_color/60 rounded-full text-[13px] text-white 2xs:text-base cursor-pointer'>
          <p>
            View Details
          </p>
        </div>
        <div onClick={() => handleToRouter(`/trading/${coin?.token}`)} className='flex flex-col hover:bg-main_color/20 backdrop-blur-2xl px-2.5 2xs:px-5 py-1 2xs:py-2 border-[1px] border-main_color/60 rounded-full text-[13px] text-main_color 2xs:text-base cursor-pointer'>
          Trade now
        </div>
      </div>
    </div>
  );
};
