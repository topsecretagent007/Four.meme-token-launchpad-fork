import { coinInfo, holderInfo, tradeInfo } from "@/utils/types";
import { MessageForm } from "../MessageForm";
import { useContext, useEffect, useMemo, useState } from "react";
import { Trade } from "./Trade";
import { findHolders, getCoinTrade, getMessageByCoin } from "@/utils/util";
import UserContext from "@/context/UserContext";
import ReplyModal from "../modals/ReplyModal";
import { MdAccessTime } from "react-icons/md";
import { Holders } from "./Holder";
import { useSocket } from "@/contexts/SocketContext";

interface ChattingProps {
  param: string | null;
  coin: coinInfo
}

export const Chatting: React.FC<ChattingProps> = ({ param, coin }) => {
  const { messages, setMessages, newMsg, coinId, postReplyModal, setPostReplyModal } = useContext(UserContext);
  const [trades, setTrades] = useState<tradeInfo>({} as tradeInfo);
  const [tradesData, setTradesData] = useState<any[]>([]);

  const [currentTable, setCurrentTable] = useState<string>("thread");
  const [topHolders, setTopHolders] = useState<holderInfo[]>([])
  const tempNewMsg = useMemo(() => newMsg, [newMsg]);

  useEffect(() => {
    const fetchData = async () => {
      if (param) {
        if (currentTable === "thread") {
          const data = await getMessageByCoin(param);
          setMessages(data.reverse());
        } else if (currentTable === "trades") {
          const data = await getCoinTrade(coin.token);
          setTrades(data)
        }
        else if (currentTable === "top holders") {
          const data = await findHolders(coin.token);
          console.log("data ===> ", data);

          // Sort by amount (assuming each item has an "amount" property)
          const sortedData = data.sort((a, b) => b.amount - a.amount).slice(0, 10);

          setTopHolders(sortedData);
        }
      }
      console.log("messages ==>", messages)
    }
    fetchData();
  }, [currentTable, param, coinId])

  useEffect(() => {
    let _trades = [];
    _trades = trades.record?.reverse();
    console.log("_trades  ==>", _trades)
    setTradesData(_trades)
  }, [trades])

  useEffect(() => {
    if (coinId == coin._id) {
      setMessages([tempNewMsg, ...messages])
    }
  }, [tempNewMsg])

  return (
    <div className="pt-8">
      <div className="flex flex-row justify-between items-center px-2 font-semibold text-white">
        <div className="flex flex-row items-center">
          <div
            onClick={() => setCurrentTable("thread")}
            className={`border-b-[2px] px-4 py-1 text-base cursor-pointer ${currentTable === "thread" ? "border-b-main_color text-text_color" : "border-b-main_color/40"
              }`}
          >
            Thread
          </div>
          <div
            onClick={() => setCurrentTable("trades")}
            className={`border-b-[2px] px-4 py-1 text-base cursor-pointer ${currentTable === "trades" ? "border-b-main_color text-text_color" : "border-b-main_color/40"
              }`}
          >
            Trades
          </div>
          <div
            onClick={() => setCurrentTable("top holders")}
            className={`border-b-[2px] px-4 py-1 text-base cursor-pointer ${currentTable === "top holders" ? "border-b-main_color text-text_color" : "border-b-main_color/40"
              }`}
          >
            Top Holders
          </div>
        </div>
        <div onClick={() => setPostReplyModal(true)} className="flex flex-col justify-center bg-main_color/10 px-5 py-1 border-[1px] border-main_color rounded-full w-[180px] font-semibold text-text_color text-lg text-center cursor-pointer">Post Reply</div>
      </div>
      <div className="flex flex-col mt-8 p-3 rounded-lg w-full min-h-[50px] max-h-[650px] object-cover overflow-hidden overflow-y-scroll">

        {currentTable === "thread" &&
          <div>
            {messages && messages.map((message, index) => (
              <MessageForm key={index} msg={message} ></MessageForm>
            ))}
          </div>
        }

        {currentTable === "trades" &&
          <div className="mx-auto py-4 w-full h-full">
            <table className="border-[1px] border-icon_color rounded-t-lg w-full h-full object-cover overflow-hidden">
              <thead className="bg-icon_color border-[1px] border-icon_color w-full text-white">
                <tr className="text-base text-centers">
                  <th className="py-2 border-r-[1px] border-r-white text-white">Account</th>
                  <th className="py-2 border-r-[1px] border-r-white text-white">Type</th>
                  <th className="py-2 border-r-[1px] border-r-white text-white">SOL</th>
                  <th className="py-2 border-r-[1px] border-r-white text-white">Token</th>
                  <th className="py-2 border-r-[1px] border-r-white text-white">Date</th>
                  <th className="py-2 text-white">Tx</th>
                </tr>
              </thead>
              <tbody>
                {tradesData && tradesData.map((trade, index) => (
                  <Trade key={index} trade={trade}></Trade>
                ))}
              </tbody>
            </table>
          </div>
        }

        {currentTable === "top holders" &&
          <div className="mx-auto py-4 w-full h-full">
            <table className="border-[1px] border-icon_color rounded-t-lg w-full h-full object-cover overflow-hidden">
              <thead className="bg-icon_color border-[1px] border-icon_color w-full text-white">
                <tr className="text-lg text-start">
                  <th className="py-2 border-r-[1px] border-r-white text-white">No</th>
                  <th className="py-2 border-r-[1px] border-r-white text-white">Holder</th>
                  <th className="py-2 text-white">Amount</th>
                </tr>
              </thead>
              <tbody>
                {topHolders && topHolders.map((item, index) => (
                  <Holders key={index} holder={item} index={index}></Holders>
                ))}
              </tbody>
            </table>
          </div>
        }

      </div>
      {
        postReplyModal &&
        <ReplyModal data={coin} />
      }
    </div >
  );
};
