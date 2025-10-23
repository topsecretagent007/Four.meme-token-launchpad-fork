"use client";
import React, { ReactNode, useState } from "react";
import { PageProvider } from "@/contexts/PageContext";
import { BscWalletProvider } from "@/contexts/BscWalletProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "@/contexts/ModalProvider";
import UserContext from "@/context/UserContext";
import { msgInfo, userInfo } from "@/utils/types";
import SocketProvider from "@/contexts/SocketContext";

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userInfo>({} as userInfo);
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('/*.png');
  const [isCreated, setIsCreated] = useState(false);
  const [messages, setMessages] = useState<msgInfo[]>([]);
  const [coinId, setCoinId] = useState<string>('');
  const [newMsg, setNewMsg] = useState<msgInfo>({} as msgInfo);
  const [bnbPrice, setBnbPrice] = useState<number>(0);
  const [profileEditModal, setProfileEditModal] = useState<boolean>(false);
  const [postReplyModal, setPostReplyModal] = useState<boolean>(false);
  const [updateCoin, setUpdateCoin] = useState<boolean>(false);
  const [supportModalState, setSupportModalState] = useState<boolean>(false);
  const [contactUsModalState, setcontactUsModalState] = useState<boolean>(false);
  const [policyModalState, setPolicyModalState] = useState<boolean>(false);
  const [serviceModalState, setServiceModalState] = useState<boolean>(false);

  return (
    <BscWalletProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <PageProvider>
            <UserContext.Provider
              value={{
                bnbPrice,
                setBnbPrice,
                newMsg,
                setNewMsg,
                coinId,
                setCoinId,
                messages,
                setMessages,
                isCreated,
                setIsCreated,
                imageUrl,
                setImageUrl,
                user,
                setUser,
                login,
                setLogin,
                isLoading,
                setIsLoading,
                profileEditModal,
                setProfileEditModal,
                postReplyModal,
                setPostReplyModal,
                updateCoin,
                setUpdateCoin,
                supportModalState,
                setSupportModalState,
                contactUsModalState,
                setcontactUsModalState,
                policyModalState,
                setPolicyModalState,
                serviceModalState,
                setServiceModalState,
              }}
            >
              <SocketProvider>
                {children}
              </SocketProvider>
              <ToastContainer pauseOnFocusLoss={false} theme="colored" />
            </UserContext.Provider>
          </PageProvider>
        </ModalProvider>
      </QueryClientProvider>
    </BscWalletProvider>
  );
}
