"use client"
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { coinInfo } from "@/utils/types";
import { getCoinsInfo, getBnbPriceInUSD, test } from "@/utils/util";
import { CoinBlog } from "../cards/CoinBlog";
import TopToken from "./TopToken";
import FilterList from "./FilterList";
import { useSocket } from "@/contexts/SocketContext";

const HomePage: FC = () => {
  const { setIsLoading, isCreated, bnbPrice, setBnbPrice } = useContext(UserContext);
  const { newToken } = useSocket();

  const [data, setData] = useState<coinInfo[]>([]);
  const [firstData, setFirstData] = useState<coinInfo[]>([]);
  const [isSort, setIsSort] = useState(0);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const router = useRouter()

  const handleToRouter = (id: string) => {
    setIsLoading(true)
    router.push(id)
  }

  const getData = () => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const coins = await getCoinsInfo();
        const price = await getBnbPriceInUSD();
        const userLogin = await test();
        console.log("coins--->", coins)
        if (coins && coins !== null) {
          coins.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setData(coins);
          setFirstData(coins)
          setBnbPrice(price);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchData();
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    getData()
  }, [newToken])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        dropdownRef1.current && !dropdownRef1.current.contains(event.target)
      ) {
        setIsSort(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, dropdownRef1]);

  return (
    <div className="relative flex flex-col gap-4 pb-14 w-full h-full">
      <TopToken data={data} />
      <FilterList firstData={firstData} tokenData={data} setData={setData} />
      {data && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-8 w-full h-full">
          {data.map((temp, index) => (
            <div key={index} onClick={() => handleToRouter(`/trading/${data[0].token}`)} className="z-20 bg-[#0E0E0E] shadow-lg shadow-main_color/50 mx-auto px-1.5 2xs:px-3 py-3 rounded-lg w-full max-w-[420px]">
              <CoinBlog coin={temp}></CoinBlog>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default HomePage;

//  <div className="flex flex-wrap items-center gap-x-3 gap-y-8 py-10 w-full h-full">
//   <div onClick={() => handleToRouter(`/trading/${data[0].token}`)} className="z-20 bg-[#0E0E0E] shadow-lg shadow-main_color/50 mx-auto rounded-lg w-full max-w-[420px]">
//     <CoinBlog coin={data[0]}></CoinBlog>
//   </div>
// </div> */}