"use client";
import { FC, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { coinInfo } from "@/utils/types";
import FilterListButton from "../others/FilterListButton";

interface TokenDataProps {
  firstData: coinInfo[];
  tokenData: coinInfo[];
  setData: React.Dispatch<React.SetStateAction<coinInfo[]>>;
}

const FilterList: FC<TokenDataProps> = ({ firstData, tokenData, setData }) => {
  const [token, setToken] = useState("");

  const searchToken = (value: string) => {
    if (!value.trim()) {
      setData(firstData); // Reset to original list if input is empty
      return;
    }

    const filteredData = tokenData.filter((item) =>
      Object.keys(item).some((key) => {
        const propertyValue = item[key as keyof coinInfo];

        // Only check string, number, or date properties
        if (typeof propertyValue === "string" || typeof propertyValue === "number" || propertyValue instanceof Date) {
          return propertyValue.toString().toLowerCase().includes(value.toLowerCase());
        }

        return false;
      })
    );

    setData(filteredData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToken(value);
    searchToken(value); // Trigger filtering on each input change
  };

  return (
    <div className="z-30 flex flex-col gap-4 px-2 pt-4 w-full h-full text-white">
      <div className="flex flex-row items-center gap-4 w-full h-full">
        <div className="flex md:flex-row flex-col gap-3 mx-auto w-full max-w-[720px]">
          <FilterListButton filterData={tokenData} setData={setData} />
        </div>
        <div className="flex flex-row items-center gap-1 backdrop-blur-xl mx-auto pl-2 border-[1px] border-main_color rounded-lg w-full max-w-[720px] object-cover overflow-hidden text-white">
          <BiSearchAlt className="text-text_color text-4xl" />
          <input
            type="text"
            value={token}
            placeholder="Search for Token"
            onChange={handleInputChange}
            className="bg-grey-400 bg-transparent py-2 outline-none w-full text-sm xs:text-base"
          />
          <div className="bg-main_color/20 px-3 xs:px-6 py-3 border-l-[1px] border-l-main_color font-bold text-sm xs:text-base text_color">Search</div>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
