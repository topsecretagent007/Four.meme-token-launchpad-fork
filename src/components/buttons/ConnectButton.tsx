"use client";
import { FC, useContext, useEffect, useMemo } from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { useModal } from "connectkit";
import Image from "next/image";
import { successAlert, errorAlert } from "@/components/others/ToastGroup";
import UserContext from "@/context/UserContext";
import { confirmWallet, walletConnect } from "@/utils/util";
import { userInfo } from "@/utils/types";
import { useRouter } from "next/navigation";
import { RiExchangeDollarLine } from "react-icons/ri";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FaWallet } from "react-icons/fa";
import { TbMoodEdit } from "react-icons/tb";
import UserAvatar from "@/../public/assets/images/user-avatar.png";


export const ConnectButton: FC = () => {
  const { user, setUser, login, setLogin, setIsLoading, isLoading } = useContext(UserContext);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { setOpen } = useModal();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();

  const tempUser = useMemo(() => user, [user]);

  useEffect(() => {
    const handleClick = async () => {
      if (address && isConnected && !login) {
        const updatedUser: userInfo = {
          name: address.slice(0, 6),
          wallet: address,
          isLedger: false,
        };
        console.log("updatedUser ===>", updatedUser);

        let userdsate = await sign(updatedUser);
        console.log("userdsate ==>", userdsate);
      }
    };
    handleClick();
  }, [address, isConnected, login]);

  const sign = async (updatedUser: userInfo) => {
    try {
      const connection = await walletConnect({ data: updatedUser });
      if (!connection) return;
      if (connection.nonce === undefined) {
        const newUser = {
          name: connection.name,
          wallet: connection.wallet,
          _id: connection._id,
          avatar: connection.avatar,
        };
        setUser(newUser as userInfo);
        setLogin(true);
        return;
      }

      if (!address) {
        errorAlert("Wallet address not found");
        return;
      }

      const message = `Nonce to confirm: ${connection.nonce}`;

      console.log("user.avatar ==>", user.avatar);

      const signature = await signMessageAsync({ 
        message,
        account: address 
      });
      const signedWallet = { ...connection, signature };
      const confirm = await confirmWallet({ data: signedWallet });

      if (confirm) {
        setUser(confirm);
        setLogin(true);
        setIsLoading(false);
      }
      successAlert("Message signed.");
    } catch (error) {
      errorAlert("Sign-in failed.");
    }
  };

  const logOut = async () => {
    disconnect();
    // Initialize `user` state to default value
    setUser({} as userInfo);
    setLogin(false);
    localStorage.clear();
  };

  const handleToProfile = (id: string) => {
    router.push(id)
    setIsLoading(true)
  }

  return (
    <div>
      <button className={`${isLoading ? "" : "z-30"} flex bg-main_color/10 flex-row gap-1 items-center justify-end text-white p-3 sm:px-4 sm:py-2 rounded-lg border-[1px] border-main_color group relative`}>
        {login && address && isConnected ? (
          <>
            <div className="flex justify-center items-center gap-2 text-[16px] lg:text-md">
              <Image
                src={(user.avatar !== "https://scarlet-extra-cat-880.mypinata.cloud/" && user.avatar !== "" && user.avatar !== undefined && user.avatar !== null && user.avatar) ? user.avatar : UserAvatar}
                alt="Token IMG"
                className="border-[1px] border-main_color rounded-full w-[35px] h-[35px] object-cover overflow-hidden"
                width={35}
                height={35}
              />
              {user?.name ?
                <div className="hidden sm:flex w-[92px] object-cover overflow-hidden text-main_color truncate">
                  {user.name}
                </div>
                :
                <div className="hidden sm:flex text-main_color">
                  {address.slice(0, 4)}....
                  {address.slice(-4)}
                </div>
              }
              <TbMoodEdit onClick={() => handleToProfile(`/profile/${tempUser._id}`)} className="hidden sm:flex text-main_color text-2xl" />
            </div>
            <div className="hidden group-hover:block right-0 -bottom-[86px] absolute px-3 rounded-lg w-full">
              <ul className="flex flex-col bg-white/20 backdrop-blur-2xl border-[0.75px] border-main_color rounded-lg object-cover overflow-hidden text-main_color">
                <li>
                  <div
                    className="flex flex-row items-center gap-1 hover:bg-white/10 mb-1 p-2 text-md text-primary-100"
                    onClick={() => setOpen(true)}
                  >
                    <RiExchangeDollarLine />
                    Change Wallet
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center gap-1 hover:bg-white/10 p-2 text-md text-primary-100"
                    onClick={logOut}
                  >
                    <VscDebugDisconnect />
                    Disconnect
                  </div>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div
            className="flex flex-row justify-center items-center gap-2 text-main_color"
            onClick={() => setOpen(true)}
          >
            <FaWallet />
            <div className="hidden sm:flex flex-col">
              Connect Wallet
            </div>
          </div>
        )}
      </button>
    </div>
  );
};
