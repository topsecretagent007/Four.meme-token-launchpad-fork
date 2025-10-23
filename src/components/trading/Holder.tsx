import { holderInfo } from "@/utils/types";
import React from "react";

interface TradePropsInfo {
  holder: holderInfo;
  index: number
}

export const Holders: React.FC<TradePropsInfo> = ({ holder, index }) => {

  return (
    <tr className="w-full border-[3px] border-[#f52a6d] text-white rounded-b-xl">
      <td className="text-center py-2 border-[1px] border-[#f52a6d]">{index + 1}</td>
      <td className="text-center py-2 border-[1px] border-[#f52a6d]">{holder.slice}</td>
      <td className="text-center py-2">{(holder.amount / 10 ** 6)}</td>
    </tr>
  );
};
