"use client"
import { FC } from "react";
import { coinInfo } from "@/utils/types";
import Image from "next/image";
import LogoImg from "@/../public/assets/images/logo.png"

interface TokenDataProps {
  coinData: coinInfo;
}

const TokenData: FC<TokenDataProps> = ({ coinData }) => {

  return (
    <div className="flex flex-col xs:flex-row gap-3 px-2">
      <Image
        src={coinData?.url ? coinData.url : LogoImg}
        width={96}
        height={96}
        className="rounded-md border-[1px] border-[#f52a6d] mx-auto xs:mx-0"
        alt="Token IMG"
      />
      <div className="text-white flex flex-col gap-1 py-1">
        <p className="font-semibold">Token Name: <strong className="text-[#f52a6d]">{coinData?.name}</strong> - <strong className="text-[#f52a6d]">[{coinData?.ticker}]</strong></p>
        <p className="text-[14px]">{coinData?.description}</p>
      </div>
    </div>
  );
};

export default TokenData;
