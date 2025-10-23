"use client"
import { FilterSelectList } from "@/config/TextData";
import { coinInfo } from "@/utils/types";
import { FC, useEffect, useRef, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { FeaturedIcon } from "./Icons";

interface TokenDataProps {
  filterData: coinInfo[];
  setData: React.Dispatch<React.SetStateAction<coinInfo[]>>;
}

interface filterlist {
  id: string;
  text: string;
  icon: any;
}

const FilterListButton: FC<TokenDataProps> = ({ filterData, setData }) => {
  const menuDropdown = useRef<HTMLDivElement | null>(null);
  const [featuredModal, setFeaturedModal] = useState<boolean>(false);
  const [currentFilterId, setCurrentFilterId] = useState<string>("featured");
  const [currentFilterData, setCurrentFilterData] = useState<filterlist>();


  const handleSortSelection = (filterOption: filterlist) => {
    setCurrentFilterId(filterOption.id)
    setCurrentFilterData(filterOption)
    let sortedData = [...filterData]; // Create a new array to prevent direct state mutation

    if (filterOption.id === "featured") {
      sortedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (filterOption.id === "marketCap") {
      sortedData.sort((a, b) => b.progressMcap - a.progressMcap);
    } else if (filterOption.id === "creatTime") {
      sortedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filterOption.id === "lastTrade") {
      sortedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (filterOption.id === "lastReply") {
      sortedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (filterOption.id === "currentLive") {
      sortedData.sort((a, b) => a.progressMcap - b.progressMcap);
    }
    setData(sortedData);
  };

  useEffect(() => {
    handleSortSelection(
      { id: "featured", text: "Featured", icon: <FeaturedIcon /> }
    )
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setFeaturedModal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);

  return (
    <div className="flex xs:flex-row flex-col justify-between items-center gap-3 w-full">
      <div ref={menuDropdown} onClick={() => setFeaturedModal(!featuredModal)} className="relative flex flex-row justify-center items-center gap-2 bg-main_color/20 px-6 py-3 border-[1px] border-main_color rounded-lg xs:rounded-xl text-text_color cursor-pointer">
        <div className="flex flex-row justify-start items-center gap-1 w-full h-full duration-300 cursor-pointer">
          {currentFilterData?.icon}
          <span className="text-sm xs:text-lg">
            {currentFilterData?.text}
          </span>
        </div>
        <FaChevronDown className={`${featuredModal && "rotate-180"} text-base xs:text-xl duration-300`} />
        <div className={`${featuredModal ? "h-[284px] py-2.5" : "h-[0px] py-0 "} top-[46px] xs:top-[53px]  left-[-1px] z-30 absolute flex flex-col justify-between items-start gap-1.5 bg-main_color/10 backdrop-blur-xl px-2.5 rounded-[14px] w-[180px] xs:w-[213px] text-text_color cursor-pointer object-cover overflow-hidden duration-500`}>
          {FilterSelectList.map((item, index) => {
            return (
              <div key={index} onClick={() => handleSortSelection(item)} className={`${currentFilterId === item.id ? "pl-1" : "pl-5"} flex flex-row justify-start items-center gap-1 duration-300 cursor-pointer hover:bg-[#B579FF]/20 rounded-xl w-full h-full`}>
                {item.icon}
                <span className="text-sm xs:text-lg">
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterListButton;
