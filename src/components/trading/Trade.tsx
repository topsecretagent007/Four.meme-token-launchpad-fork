import { recordInfo } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserImg from "@/../public/assets/images/user-avatar.png"

interface TradePropsInfo {
  trade: recordInfo;
}

export const Trade: React.FC<TradePropsInfo> = ({ trade }) => {
  const [timeAgo, setTimeAgo] = useState<string>("0d ago");
  const router = useRouter();

  const handleToRouter = (id: string) => {
    router.push(id);
  };

  const getTimeAgo = (coinDate: Date) => {
    const pastDate = new Date(coinDate); // Convert the ISO string to a Date object
    const currentDate = new Date(); // Get the current local date and time
    const differenceInMs = currentDate.getTime() - pastDate.getTime(); // Difference in milliseconds

    if (differenceInMs < 1000 * 60 * 60 * 24) {
      // Less than a day
      if (differenceInMs < 1000 * 60) {
        // Less than a minute
        setTimeAgo("Just now");
      } else {
        // Less than an hour
        const minutesAgo = Math.floor(differenceInMs / (1000 * 60));
        setTimeAgo(`${minutesAgo}m ago`);
      }
    } else {
      const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24)); // Convert ms to days
      setTimeAgo(`${daysAgo}d ago`);
    }
  };

  useEffect(() => {
    getTimeAgo(trade.time);
  }, [trade]);

  return (
    <tr className={`${trade.amountIn === 0 && "hidden"} w-full border-[3px] border-[#f52a6d] text-white rounded-b-xl`}>
      <td className="flex flex-row justify-start items-center gap-2 px-2 py-2 border-r-[#f52a6d] border-r-[1px]">
        <Image
          src={(trade.holder.avatar === null || trade.holder.avatar === undefined || trade.holder.avatar === "") ? trade?.holder?.avatar : UserImg}
          alt="Token IMG"
          className="rounded-full"
          width={36}
          height={36}
        />
        <div className="text-lg">{trade.holder.name}</div>
      </td>
      <td className={`${trade.swapDirection == 0 ? "text-green-600" : "text-red-600"} text-center py-2 border-r-[1px] border-r-[#f52a6d]`}>{trade.swapDirection == 0 ? "Buy" : "Sell"}</td>
      <td className={`${trade.swapDirection == 0 ? "text-red-600" : "text-green-600"} text-center py-2 border-r-[1px] border-r-[#f52a6d]`}>{trade.swapDirection == 0 ? `-${(trade.amountIn / 10 ** 9)}` : `+ ${(trade.amountOut / 10 ** 9)}`}</td>
      <td className={`${trade.swapDirection == 0 ? "text-green-600" : "text-red-600"} text-center py-2 border-r-[1px] border-r-[#f52a6d]`}>{trade.swapDirection == 0 ? `+${(trade.amountOut / 10 ** 6)}` : `-${(trade.amountIn / 10 ** 6)}`}</td >
      <td className="py-2 border-r-[#f52a6d] border-r-[1px] text-center">{timeAgo}</td>
      {/* <td className="py-2 text-center">
        <p
          onClick={() => handleToRouter(`https://solscan.io/tx/${trade.tx}`)}
          className="hover:text-white text-lg leading-10 hover:cursor-pointer"
        >
          {trade.tx.slice(0, 8)}
        </p>
      </td> */}
    </tr>
  );
};
