"use client";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/loadings/Spinner";
import { errorAlert } from "@/components/others/ToastGroup";
import { useSocket } from "@/contexts/SocketContext";
import { createToken } from "@/contracts/web3";
import { createCoinInfo, launchDataInfo, metadataInfo } from "@/utils/types";
import { useAccount } from "wagmi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { uploadImage, uploadMetadata } from "@/utils/fileUpload";
import ImageUpload from "../upload/ImageUpload";
import { TbWorld } from "react-icons/tb";
import { FaXTwitter, FaAngleDown } from "react-icons/fa6";
import { FaTelegramPlane, FaCaretDown } from "react-icons/fa";
import { TokenList } from "@/config/TextData";
import BnbImg from "@/../public/assets/images/tools/bnb.svg"
import Image from "next/image";

export default function CreateToken() {
  const { isLoading, setIsLoading } = useSocket();
  const [newCoin, setNewCoin] = useState<createCoinInfo>({} as createCoinInfo);
  const menuDropdown = useRef<HTMLDivElement | null>(null);

  const [profilImageUrl, setProfileIamgeUrl] = useState<string>("");
  const [selectTokenModal, setSelectTokenModal] = useState<boolean>(false);
  const [selectToken, setSelectToken] = useState<string>("BNB");
  const [selectMoreOption, setSelectMoreOption] = useState<boolean>(false);
  const [selectTokenIcon, setSelectTokenIcon] = useState<any>(BnbImg)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [errors, setErrors] = useState({
    name: false,
    ticker: false,
    image: false,
  });

  useEffect(() => {
    // Clear errors when newCoin changes
    setErrors({
      name: !newCoin.name,
      ticker: !newCoin.ticker,
      image: !profilImageUrl,
    });
  }, [newCoin, profilImageUrl]);

  const handleToRouter = (path: string) => {
    router.push(path);
  };

  const selectTokenBtn = (token: any) => {
    setSelectToken(token.id)
    setSelectTokenIcon(token.Icon)
    setSelectTokenModal(false)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCoin({ ...newCoin, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const validationErrors = {
      name: !newCoin.name,
      ticker: !newCoin.ticker,
      description: !newCoin.description,
      image: !profilImageUrl,
    };
    setErrors(validationErrors);
    return !Object.values(validationErrors).includes(true);
  };

  const createCoin = async () => {
    console.log("imageUrl--->", profilImageUrl, profileImagePreview)
    if (!validateForm()) {
      errorAlert("Please fix the errors before submitting.");
      return;
    }
    try {
      setIsLoading(true);
      // Process image upload
      const uploadedImageUrl = await uploadImage(profilImageUrl);
      if (!uploadedImageUrl) {
        errorAlert("Image upload failed.");
        setIsLoading(false);
        return;
      }
      const jsonData: metadataInfo = {
        name: newCoin.name,
        symbol: newCoin.ticker,
        image: uploadedImageUrl,
        description: newCoin.description,
        presale: newCoin.presale,
        createdOn: "https://test.com",
        twitter: newCoin.twitter || undefined,   // Only assign if it exists
        website: newCoin.website || undefined,   // Only assign if it exists
        telegram: newCoin.telegram || undefined   // Only assign if it exists
      }
      // Process metadata upload
      const uploadMetadataUrl = await uploadMetadata(jsonData);
      if (!uploadMetadataUrl) {
        errorAlert("Metadata upload failed.");
        setIsLoading(false);
        return;
      }

      console.log("uploadMetadataUrl ===>", uploadMetadataUrl)

      const coinData: launchDataInfo = {
        name: newCoin.name,
        symbol: newCoin.ticker,
        uri: uploadMetadataUrl,
        decimals: 6,
        virtualReserves: 2_000_000_000,
        tokenSupply: 1_000_000_000_000,
        presale: newCoin.presale,
      }

      if (!address || !isConnected) {
        errorAlert("Please connect your wallet first.");
        setIsLoading(false);
        return;
      }

      const res = await createToken(address, coinData);
      if (!res || !res.success) {
        errorAlert("Token creation failed or was rejected.");
        setIsLoading(false);
        return;
      }
      router.push("/");
    } catch (error) {
      errorAlert("An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuDropdown.current && !menuDropdown.current.contains(event.target as Node)) {
        setSelectTokenModal(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuDropdown]);

  const formValid =
    newCoin.name &&
    newCoin.ticker &&
    newCoin.description &&
    profilImageUrl
  // newCoin.presale

  return (
    <div className="flex flex-col justify-center items-center bg-[#0D0D0D] px-3 py-16 w-full h-full">
      <div className="container">
        <div className="mx-auto w-full max-w-[950px]">
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <div className="flex flex-row items-center gap-2 pb-5 font-semibold text-2xl">
              <p className="text-icon_color">Launch</p>
              <p className="text-white">Your Token On {selectToken}</p>
            </div>
          </div>

          <div className="relative flex flex-col justify-start mx-auto w-full max-w-xl h-full">
            <label htmlFor="name" className="flex flex-row gap-1 font-semibold text-text_color text-lg">
              Select Token <p className="text-red-600">*</p>
            </label>
            <div onClick={() => { setSelectTokenModal(true) }} className="flex flex-row justify-between items-center px-3 py-1.5 border-[1px] border-main_color rounded-lg text-text_color cursor-pointer">
              <p className="flex flex-row justify-start items-center gap-2 font-semibold text-lg uppercase">
                <Image src={selectTokenIcon} alt={selectToken} className="w-5 h-5" />
                {selectToken}
              </p>
              <FaAngleDown className="text-xl" />
            </div>
            <div ref={menuDropdown} className={`${selectTokenModal ? "h-20 opacity-100 pt-2" : "h-0 opacity-0 pt-0"} z-10 flex flex-col bg-[#0D0D0D] border-b-[1px] border-b-main_color border-l-[1px] border-l-main_color border-r-[1px] border-r-main_color  w-full absolute top-16 object-cover overflow-hidden rounded-b-lg duration-300`}>
              {TokenList.map((item, index) => {
                return (
                  <div key={index} onClick={() => selectTokenBtn(item)} className="flex flex-row justify-start items-center gap-2 hover:bg-white/20 px-3 py-1.5 w-full cursor-pointer">
                    <Image src={item.Icon} alt={item.id} className="w-4 h-4" />
                    {item.text}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex sm2:flex-row flex-col justify-between items-start sm2:gap-10 mx-auto w-full max-w-xl h-full">
            <div className="flex flex-col gap-4 py-5 w-full">
              <div className="flex flex-col gap-4">

                <ImageUpload header="Token Logo" setFilePreview={(fileName) => setProfileImagePreview(fileName)} setFileUrl={(fileUrl) => setProfileIamgeUrl(fileUrl)} type="image/*" />

                <div className="flex flex-row justify-between items-center gap-2 w-full h-full">
                  <div className="w-full">
                    <label htmlFor="name" className="flex flex-row gap-1 font-semibold text-text_color text-lg">
                      Token Name <p className="text-red-600">*</p>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={newCoin.name || ""}
                      onChange={handleChange}
                      placeholder="input name"
                      className={`block w-full p-2.5 rounded-lg text-text_color outline-none border-main_color border-[1px] bg-transparent backdrop-blur-xl`}
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="ticker"
                      className="flex flex-row gap-1 font-semibold text-text_color text-lg"
                    >
                      Ticker <p className="text-red-600">*</p>
                    </label>
                    <input
                      id="ticker"
                      type="text"
                      value={newCoin.ticker || ""}
                      onChange={handleChange}
                      placeholder="input ticker"
                      className={`block w-full p-2.5 rounded-lg text-text_color outline-none border-main_color border-[1px] bg-transparent backdrop-blur-xl`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="flex flex-row gap-1 font-semibold text-text_color text-lg">
                    Description <p className="text-red-600">*</p>
                  </label>
                  <textarea
                    id="description"
                    rows={2}
                    value={newCoin.description || ""}
                    onChange={handleChange}
                    placeholder="input description ..."
                    className={`block w-full p-2.5 min-h-[160px] rounded-lg bg-transparent backdrop-blur-xl text-text_color outline-none border-main_color border-[1px]`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="ticker"
                    className="flex flex-row gap-1 font-semibold text-text_color text-lg"
                  >
                    Buy Token
                  </label>
                  <input
                    id="presale"
                    type="number"
                    value={newCoin.presale}
                    onChange={handleChange}
                    placeholder="input BNB amount"
                    className={`block w-full p-2.5 rounded-lg bg-transparent backdrop-blur-xl text-text_color outline-none border-main_color border-[1px]`}
                  />
                </div>

                <div className={`${!selectMoreOption ? "h-[30px]" : "h-[300px]"} flex flex-col gap-4 w-full object-cover overflow-hidden duration-300`}>
                  <div onClick={() => setSelectMoreOption(!selectMoreOption)} className="flex flex-row items-center gap-2 font-semibold text-text_color text-lg cursor-pointer">
                    Show More Options
                    <FaCaretDown className={`${!selectMoreOption ? "rotate-180" : "rotate-0"} text-xl duration-300`} />
                  </div>
                  <div>
                    <label htmlFor="name" className="font-semibold text-text_color text-lg">
                      Website (Optional)
                    </label>
                    <div className="flex flex-row border-[1px] border-main_color rounded-lg w-full">
                      <div className="flex flex-col justify-center items-center border-main_color border-r-[1px] w-14">
                        <TbWorld className="justify-center items-center mx-auto text-main_color text-2xl" />
                      </div>
                      <input
                        type="text"
                        id="website"
                        value={newCoin.website || ""}
                        onChange={handleChange}
                        className={`block w-full p-2.5 rounded-r-lg bg-transparent backdrop-blur-xl text-text_color outline-none`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="font-semibold text-text_color text-lg">
                      Twitter (Optional)
                    </label>
                    <div className="flex flex-row border-[1px] border-main_color rounded-lg w-full">
                      <div className="flex flex-col justify-center items-center border-main_color border-r-[1px] w-14">
                        <FaXTwitter className="justify-center items-center mx-auto text-main_color text-2xl" />
                      </div>
                      <input
                        type="text"
                        id="twitter"
                        value={newCoin.twitter || ""}
                        onChange={handleChange}
                        className={`block w-full p-2.5 rounded-r-lg bg-transparent backdrop-blur-xl text-text_color outline-none`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="font-semibold text-text_color text-lg">
                      Telegram (Optional)
                    </label>
                    <div className="flex flex-row border-[1px] border-main_color rounded-lg w-full">
                      <div className="flex flex-col justify-center items-center border-main_color border-r-[1px] w-14">
                        <FaTelegramPlane className="justify-center items-center mx-auto text-main_color text-2xl" />
                      </div>
                      <input
                        type="text"
                        id="telegram"
                        value={newCoin.telegram || ""}
                        onChange={handleChange}
                        className={`block w-full p-2.5 rounded-r-lg bg-transparent backdrop-blur-xl text-text_color outline-none`}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <button
            onClick={createCoin}
            disabled={!formValid || isLoading}
            className={`w-40 flex flex-col py-2 mt-16 mb-10 mx-auto px-8 rounded-lg bg-main_color/30 text-text_color ${!formValid ? "opacity-50 cursor-not-allowed" : "hover:bg-main_color"}`}
          >
            {isLoading ? "Creating..." : "Create Coin"}
          </button>
          {isLoading && <Spinner />}
        </div >
      </div>
    </div >
  );
}
