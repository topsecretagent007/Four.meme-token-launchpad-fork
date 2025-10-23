/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import { useAccount } from 'wagmi';
import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/components/others/ToastGroup";
import { coinInfo, msgInfo, tradeInfo } from "@/utils/types";
import UserContext from "@/context/UserContext";

interface Context {
    socket?: Socket;
    counter?: number;
    randValue?: number;
    setRandValue?: Function;
    userArr?: any[];
    setUserArr?: Function;
    playerNumber?: number;
    setPlayerNumber?: Function;
    isLoading?: boolean;
    setIsLoading?: Function;
    isShowModal?: string;
    setIsShowModal?: Function;
    currentDepositAmount?: number;
    setCurrentDepositAmount?: Function;
    numberDecimals?: number;
    alertState?: AlertState;
    setAlertState?: Function;
    newToken: any[];
    setNewToken: Function;
}

const context = createContext<Context>({
    newToken: [],
    setNewToken: undefined
});

export const useSocket = () => useContext(context);

const SocketProvider = (props: { children: any }) => {
    const { setCoinId, setNewMsg } = useContext(UserContext)
    const [socket, setSocket] = useState<Socket>();
    const [counter, setCounter] = useState<number>(1);
    const [randValue, setRandValue] = useState<number>(0);
    const [userArr, setUserArr] = useState<any[]>();
    const [playerNumber, setPlayerNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState('');
    const [currentDepositAmount, setCurrentDepositAmount] = useState(0);
    const [numberDecimals, setNumberDecimals] = useState(3);
    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: '',
        severity: undefined,
    })
    const [newToken, setNewToken] = useState<any[]>([]);

    const router = useRouter();
    // wallet Info
    const { address, isConnected } = useAccount();

    const connectionUpdatedHandler = (data: number) => {
        setCounter(data);
    };

    const createSuccessHandler = (name: string, mint: string) => {
        console.log("Successfully Create Token Name:", name)
        setAlertState({
            open: true,
            message: 'Success',
            severity: 'success',
        });
        successAlert(`Successfully Created token: ${name}`);
        setIsLoading(false);
    }

    const createFailedHandler = (name: string, mint: string) => {
        console.log("Failed Create Token Name:", name)
        setAlertState({
            open: true,
            message: 'Failed',
            severity: 'error',
        });
        errorAlert(`Failed Create token: ${name}`)
        setIsLoading(false);
    }

    const createMessageHandler = (updateCoinId: string, updateMsg: msgInfo) => {
        console.log("Updated Message", updateCoinId, updateMsg)
        setCoinId(updateCoinId);
        setNewMsg(updateMsg);
    }

    // Listen for the "connectionUpdated" event and update the state
    // const transFailHandler = (updateCoinId: string, walletAddr: string) => {
    //     console.log(walletAddr, 'addressPubkey');
    //     if (walletAddr == address) {
    //         setAlertState({
    //             open: true,
    //             message: `${txt}`,
    //             severity: 'error',
    //         });
    //         setIsLoading(false);
    //         setIsShowModal('');
    //     }
    // };

    // const transSuccessHandler = (updateCoinId: string, coinInfo: coinInfo) => {
    //     console.log(coinInfo, 'addressPubkey');
    //     setCoinId(updateCoinId);

    // }
    // init socket client object
    useEffect(() => {

        const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
            transports: ["websocket"],
        });
        socket.on("connect", async () => {
            console.log(" --@ connected to backend", socket.id);
        });
        socket.on("disconnect", () => {
            console.log(" --@ disconnected from backend", socket.id);
        });
        setSocket(socket);

        return () => {

            socket.off("connect");
            socket.off("disconnect");
            setSocket(undefined);
            // socket?.disconnect();

        };
    }, [router]);

    useEffect(() => {
        socket?.on("connectionUpdated", async (counter: number) => {
            // console.log("--------@ Connection Updated: ", counter);

            connectionUpdatedHandler(counter)
        });

        socket?.on("Creation", () => {
            console.log("--------@ Token Creation: ");

        });
        socket?.on("TokenCreated", async (name: string, mint: string) => {
            console.log("--------@ Token Created!: ", name);

            createSuccessHandler(name, mint);
            setCounter((prev) => prev + 1); // Increment counter
            setNewToken((prevTokens) => [...prevTokens, { name, mint, counter }]);
        });

        socket?.on("TokenNotCreated", async (name: string, mint: string) => {
            console.log("--------@ Token Not Created: ", name);

            createFailedHandler(name, mint);
        });

        socket?.on("MessageUpdated", async (updateCoinId: string, newMessage: msgInfo) => {
            if (updateCoinId && newMessage) {
                console.log("--------@ Message Updated:", updateCoinId, newMessage)

                createMessageHandler(updateCoinId, newMessage)
            }
        })

        // socket?.on("transFailHandler", async (updateCoinId: string, walletAddr: string) => {
        //     if (updateCoinId && walletAddr) {
        //         console.log("--------@ transFailHandler:", updateCoinId, walletAddr)

        //         transFailHandler(updateCoinId, walletAddr)
        //     }
        // })

        // socket?.on("transSuccessHandler", async (updateCoinId: string, tradeInfo: tradeInfo) => {
        //     if (updateCoinId && tradeInfo) {
        //         console.log("--------@ transSuccessHandler:", updateCoinId, tradeInfo)

        //         transSuccessHandler(updateCoinId, tradeInfo)
        //     }
        // })

        return () => {
            socket?.off("Creation", createSuccessHandler);
            socket?.off("TokenCreated", createSuccessHandler);
            socket?.off("TokenNotCreated", createFailedHandler);
            socket?.off("MessageUpdated", createMessageHandler);
            // socket?.off("TransFailHandler", transFailHandler);
            // socket?.off("TransSuccessHandler", transSuccessHandler);


            socket?.disconnect();
        };
    }, [socket]);

    return (
        <context.Provider
            value={{
                socket,
                counter,
                randValue,
                setRandValue,
                userArr,
                setUserArr,
                playerNumber,
                setPlayerNumber,
                isLoading,
                setIsLoading,
                isShowModal,
                setIsShowModal,
                currentDepositAmount,
                setCurrentDepositAmount,
                numberDecimals,
                alertState,
                setAlertState,
                newToken,
                setNewToken
            }}
        >
            {props.children}
        </context.Provider>
    );
};

export interface AlertState {
    open: boolean
    message: string
    severity: 'success' | 'info' | 'warning' | 'error' | undefined
}

export default SocketProvider;