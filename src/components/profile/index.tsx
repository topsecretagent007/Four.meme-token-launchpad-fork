"use client";
import { CoinBlog } from "@/components/cards/CoinBlog";
import Modal from "@/components/modals/Modal";
import { errorAlert, successAlert } from "@/components/others/ToastGroup";
import UserContext from "@/context/UserContext";
import { coinInfo, userInfo } from "@/utils/types";
import { getCoinsInfoBy, getUser } from "@/utils/util";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { LuFileEdit } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import { ProfileMenuList } from "@/config/TextData";
import TestUser from "@/../public/assets/images/user-avatar.png"
import { IoMdArrowRoundBack } from "react-icons/io";
import Spinner from "../loadings/Spinner";
import { useAccount } from "wagmi";
import Image from "next/image";

export default function ProfilePage() {
  const { setProfileEditModal, profileEditModal, isLoading, setIsLoading, user } = useContext(UserContext);
  const { address } = useAccount();
  const pathname = usePathname();
  const [param, setParam] = useState<string | null>(null);
  const [userData, setUserData] = useState<userInfo>({} as userInfo);
  const [option, setOption] = useState<number>(1);
  const [coins, setCoins] = useState<coinInfo[]>([]);
  const [copySuccess, setCopySuccess] = useState<string>("");
  const router = useRouter();

  const handleToRouter = (id: string) => {
    if (id.startsWith("http")) {
      window.location.href = id; // For external links
    } else {
      router.push(id); // For internal routing
    }
  };

  const fetchUserData = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await getUser({ id });
      setUserData(response);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLoading(false)
    }
  };

  const fetchCoinsData = async (userId: string) => {
    try {
      const coinsBy = await getCoinsInfoBy(userId);
      console.log("coinsBy data ===>", coinsBy)
      setCoins(coinsBy);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    console.log("profile user data ==> ", user)
    setUserData(user);

  }, [user])

  useEffect(() => {
    const segments = pathname.split("/");
    console.log("segments ==> ", segments)
    const id = segments[segments.length - 1];
    console.log("segments id ==> ", id)
    if (id && id !== param) {
      setParam(id);
      fetchUserData(id);
    }
  }, [pathname]);

  useEffect(() => {
    if (option === 4 && param) {
      fetchCoinsData(param);
    }
  }, [option, param]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
      successAlert("Copied to clipboard!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
      errorAlert("Failed to copy!");
    }
  };

  return (
    <div className="flex flex-col gap-8 px-2 py-10 w-full h-full">
      <div onClick={() => handleToRouter("/")} className="flex flex-row items-center gap-2 pb-2 w-[100px] text-[#f52a6d] text-2xl cursor-pointer">
        <IoMdArrowRoundBack />
        Back
      </div>
      <div className="justify-center gap-6 grid">
        <div className="flex xs:flex-row flex-col justify-center items-center gap-6 mx-auto">
          <div className="relative flex flex-col shadow-[#f52a6d] shadow-[0px_4px_4px_0px] border-[#f52a6d] border-[1px] rounded-full w-full">
            <Image
              src={(user.avatar !== "https://scarlet-extra-cat-880.mypinata.cloud/" && user.avatar !== "" && user.avatar !== undefined && user.avatar !== null && user.avatar) ? userData.avatar : TestUser.src}
              alt="Avatar"
              width={120}
              height={120}
              className="blur-sm mx-auto rounded-full w-[120px] h-[120px] object-cover"
            />
            <Image
              src={(user.avatar !== "https://scarlet-extra-cat-880.mypinata.cloud/" && user.avatar !== "" && user.avatar !== undefined && user.avatar !== null && user.avatar) ? userData.avatar : TestUser.src}
              alt="Avatar"
              width={104}
              height={104}
              className="top-[8px] left-[8px] absolute mx-auto border-[#f52a6d] border-[1px] rounded-full w-[104px] h-[104px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 w-full font-bold text-white">
            <div className="flex flex-row justify-center xs:justify-start items-center gap-2 text-xl">
              @ {userData.name ? userData.name : address?.slice(0, 6)}
              <LuFileEdit
                onClick={() => setProfileEditModal(true)}
                className="text-white hover:text-[#f52a6d] text-2xl cursor-pointer"
              />
            </div>
            <div
              className="flex flex-col justify-center xs:justify-start px-2 border-b-[1px] border-b-white hover:border-b-[#f52a6d] w-[165px] text-white hover:text-[#f52a6d] text-lg cursor-pointer"
              onClick={() => handleToRouter(`https://bscscan.com/address/${userData.wallet}`)}
            >
              View on BscScan
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 mx-auto px-2 xs:px-3 py-1 xs:py-2 border-[#f52a6d] border-[1px] rounded-lg w-[94%] object-cover overflow-hidden font-semibold text-white">
          <p className="w-[92%] object-cover overflow-hidden truncate">{userData.wallet ? userData.wallet : address}</p>
          <MdContentCopy
            className="text-white hover:text-[#f52a6d] text-2xl cursor-pointer"
            onClick={() => copyToClipboard(userData.wallet)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1 xs:gap-2 mx-auto p-1 border-[#f52a6d] border-[1px] rounded-lg xs:rounded-full font-semibold text-white text-sm sm:text-lg">
        {ProfileMenuList.map((item) => (
          <div
            key={item.id}
            onClick={() => setOption(item.id)}
            className={`${option === item.id ? "bg-custom-gradient" : "bg-none hover:bg-[#f52a6d]"
              } rounded-lg xs:rounded-full px-5 py-2 font-semibold cursor-pointer mx-auto capitalize `}
          >
            {item.text}
          </div>
        ))}
      </div>
      {profileEditModal && <Modal data={userData} />}
      <div>

        {option === 4 && (
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-6 mx-auto max-w-[950px]">
            {coins.map((coin) => (
              <div
                key={coin.token}
                onClick={() => handleToRouter(`/trading/${coin._id}`)}
                className="cursor-pointer"
              >
                <CoinBlog coin={coin} />
              </div>
            ))}
          </div>
        )}
      </div>
      {isLoading && <Spinner />}
    </div>
  );
}
