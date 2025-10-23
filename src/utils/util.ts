import axios, { AxiosRequestConfig } from 'axios';
import { ChartTable, coinInfo, holderInfo, msgInfo, replyInfo, userInfo } from './types';

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const headers: Record<string, string> = {
  'ngrok-skip-browser-warning': 'true'
};

const config: AxiosRequestConfig = {
  headers
};

export const test = async () => {
  const res = await fetch(`${BACKEND_URL}`);
  const data = await res.json();
  console.log(data);
};

export const getUser = async ({ id }: { id: string }): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/${id}`, config);
    console.log('response:', response.data);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const updateUser = async (id: string, data: userInfo): Promise<any> => {
  try {
    console.log("update user ==>", data)
    console.log(`${BACKEND_URL}/user/update/${id}`);
    const response = await axios.post(`${BACKEND_URL}/user/update/${id}`, data, config);
    console.log("update user response ==>", response)

    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const walletConnect = async ({ data }: { data: userInfo }): Promise<any> => {
  try {
    console.log("walletConnect data   =>", data)
    const response = await axios.post(`${BACKEND_URL}/user/`, data);
    console.log("walletConnect response   =>", response)

    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const confirmWallet = async ({ data }: { data: userInfo }): Promise<any> => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/confirm`, data, config);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const getCoinsInfo = async (): Promise<coinInfo[]> => {
  try {
    const res = await axios.get(`${BACKEND_URL}/coin`, config);
    return res.data;
  } catch (error) {
    console.error('Error fetching coin info:', error);
  }
};

export const getCoinsInfoBy = async (id: string): Promise<coinInfo[]> => {
  const res = await axios.get<coinInfo[]>(`${BACKEND_URL}/coin/user/${id}`, config);
  return res.data;
};

export const getCoinInfo = async (data: string): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/coin/${data}`, config);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const getUserInfo = async (data: string): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/${data}`, config);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const getMessageByCoin = async (data: string): Promise<msgInfo[]> => {
  try {
    console.log('data:', data);
    const response = await axios.get(`${BACKEND_URL}/feedback/coin/${data}`, config);
    console.log('messages:', response.data);
    return response.data;
  } catch (err) {
    return [];
  }
};

export const getCoinTrade = async (data: string): Promise<any> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/cointrade/${data}`, config);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

export const postReply = async (data: replyInfo) => {
  console.log("data ==> ", data)
  try {
    const response = await axios.post(`${BACKEND_URL}/feedback/`, data, config);
    return response.data;
  } catch (err) {
    return { error: 'error setting up the request' };
  }
};

// ================== Get Holders (BSC) ===========================
// Note: For BSC, you would need to use BscScan API or similar service
export const findHolders = async (tokenAddress: string) => {
  // This needs to be implemented using BscScan API or a blockchain indexer
  // Example: https://api.bscscan.com/api?module=token&action=tokenholderlist
  // For now, returning empty array as placeholder
  console.warn('findHolders needs to be implemented with BscScan API');
  let allOwners: holderInfo[] = [];
  return allOwners;
};

export const getBnbPriceInUSD = async () => {
  try {
    // Fetch the price data from CoinGecko
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
    const bnbPriceInUSD = response.data.binancecoin.usd;
    return bnbPriceInUSD;
  } catch (error) {
    console.error('Error fetching BNB price:', error);
    throw error;
  }
};


export const uploadImage = async (url: string) => {
  const res = await fetch(url);
  console.log(res.blob);
  const blob = await res.blob();

  const imageFile = new File([blob], "image.png", { type: "image/png" });
  console.log(imageFile);
  const resData = await pinFileToIPFS(imageFile);
  console.log("imageFile ==>", imageFile)
  console.log(resData, "RESDATA>>>>");
  if (resData) {
    return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`;
  } else {
    return false;
  }
};

const JWT = process.env.NEXT_PUBLIC_PINATA_PRIVATE_KEY;

export const pinFileToIPFS = async (blob: File) => {
  try {
    const data = new FormData();
    data.append("file", blob);
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: data,
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    console.log(error);
  }
};

export const getTokenPriceAndChange = async (address: string) => {
  try {
    // For BSC tokens, you can use CoinGecko, DexScreener, or PancakeSwap API
    // This is a placeholder implementation - you'll need to integrate with BSC price APIs
    console.warn('getTokenPriceAndChange needs to be implemented with BSC-compatible price API');
    
    // Placeholder return
    return { price: 1, changeIn24h: 0, liquidity: 10000 };
    
    // Example implementation with DexScreener (you can uncomment and modify):
    // const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
    // const data = await response.json();
    // if (data && data.pairs && data.pairs.length > 0) {
    //   const pair = data.pairs[0];
    //   return { 
    //     price: parseFloat(pair.priceUsd), 
    //     changeIn24h: parseFloat(pair.priceChange.h24),
    //     liquidity: parseFloat(pair.liquidity.usd)
    //   };
    // }
  } catch (error) {
    console.error("Error fetching token price:", error);
    return { price: 1, changeIn24h: 0, liquidity: 10000 };
  }
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
