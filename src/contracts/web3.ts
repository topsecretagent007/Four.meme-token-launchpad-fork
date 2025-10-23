import { ethers, BrowserProvider, Contract, parseEther, formatEther } from 'ethers';
import TokenLaunchpadABI from './TokenLaunchpad.json';
import { errorAlert, successAlert } from '@/components/others/ToastGroup';
import { launchDataInfo } from '@/utils/types';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || TokenLaunchpadABI.address;

// Get provider from window.ethereum (MetaMask, Trust Wallet, etc.)
export const getProvider = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 provider found. Please install MetaMask or another Web3 wallet.');
  }
  return new BrowserProvider(window.ethereum);
};

// Get signer (connected wallet)
export const getSigner = async () => {
  const provider = await getProvider();
  return await provider.getSigner();
};

// Get contract instance
export const getContract = async (withSigner = true) => {
  if (withSigner) {
    const signer = await getSigner();
    return new Contract(CONTRACT_ADDRESS, TokenLaunchpadABI.abi, signer);
  } else {
    const provider = await getProvider();
    return new Contract(CONTRACT_ADDRESS, TokenLaunchpadABI.abi, provider);
  }
};

// Create a new token
export const createToken = async (
  address: string,
  coinData: launchDataInfo
): Promise<any> => {
  console.log('========Creating Token==============');

  try {
    const contract = await getContract(true);
    const signer = await getSigner();

    // Calculate the BNB value to send (initial buy + platform fee)
    const initialBuyBNB = parseEther(coinData.presale.toString());
    
    console.log('Creating token with data:', {
      name: coinData.name,
      symbol: coinData.symbol,
      uri: coinData.uri,
      initialBuyAmount: initialBuyBNB.toString(),
      value: initialBuyBNB.toString()
    });

    // Call createToken function
    const tx = await contract.createToken(
      coinData.name,
      coinData.symbol,
      coinData.uri,
      initialBuyBNB,
      { value: initialBuyBNB }
    );

    console.log('Transaction sent:', tx.hash);
    successAlert('Token creation transaction sent!');

    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt);

    // Get the token address from the event
    const event = receipt.logs.find((log: any) => {
      try {
        const parsedLog = contract.interface.parseLog(log);
        return parsedLog?.name === 'TokenCreated';
      } catch {
        return false;
      }
    });

    if (event) {
      const parsedEvent = contract.interface.parseLog(event);
      const tokenAddress = parsedEvent?.args[1];
      console.log('Token created at address:', tokenAddress);
      successAlert('Token successfully launched!');
      return { success: true, tokenAddress, txHash: receipt.hash };
    }

    return { success: true, txHash: receipt.hash };
  } catch (error: any) {
    console.error('Error creating token:', error);
    errorAlert(error?.reason || error?.message || 'Token creation failed');
    return { success: false, error };
  }
};

// Swap tokens (buy or sell)
export const swapToken = async (
  tokenAddress: string,
  amount: string,
  isBuy: boolean,
  minAmountOut: string = '0'
): Promise<any> => {
  console.log('========Swap Transaction==============');
  console.log('Token:', tokenAddress);
  console.log('Amount:', amount);
  console.log('Is Buy:', isBuy);

  try {
    const contract = await getContract(true);
    const signer = await getSigner();

    let tx;
    if (isBuy) {
      // Buy tokens with BNB
      const bnbAmount = parseEther(amount);
      const minOut = parseEther(minAmountOut);
      
      tx = await contract.buyToken(tokenAddress, bnbAmount, minOut, {
        value: bnbAmount,
      });
    } else {
      // Sell tokens for BNB
      const tokenAmount = parseEther(amount);
      const minOut = parseEther(minAmountOut);
      
      tx = await contract.sellToken(tokenAddress, tokenAmount, minOut);
    }

    console.log('Swap transaction sent:', tx.hash);

    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Swap confirmed:', receipt);

    successAlert(`${isBuy ? 'Buy' : 'Sell'} transaction successful!`);
    return { success: true, txHash: receipt.hash };
  } catch (error: any) {
    console.error('Error in swap transaction:', error);
    errorAlert(error?.reason || error?.message || 'Swap transaction failed');
    return { success: false, error };
  }
};

// Get token balance (BEP-20)
export const getTokenBalance = async (
  walletAddress: string,
  tokenAddress: string
): Promise<number | null> => {
  try {
    const provider = await getProvider();
    
    // BEP-20 token ABI for balanceOf
    const tokenABI = [
      'function balanceOf(address owner) view returns (uint256)',
      'function decimals() view returns (uint8)',
    ];
    
    const tokenContract = new Contract(tokenAddress, tokenABI, provider);
    const balance = await tokenContract.balanceOf(walletAddress);
    const decimals = await tokenContract.decimals();
    
    // Convert to human-readable format
    const formattedBalance = Number(formatEther(balance));
    
    return formattedBalance;
  } catch (error) {
    console.error('Error getting token balance:', error);
    return null;
  }
};

// Get BNB balance
export const getBNBBalance = async (walletAddress: string): Promise<string> => {
  try {
    const provider = await getProvider();
    const balance = await provider.getBalance(walletAddress);
    return formatEther(balance);
  } catch (error) {
    console.error('Error getting BNB balance:', error);
    return '0';
  }
};

// Get bonding curve data
export const getBondingCurveData = async (tokenAddress: string) => {
  try {
    const contract = await getContract(false);
    const data = await contract.getBondingCurve(tokenAddress);
    
    return {
      reserveBNB: formatEther(data.reserveBNB),
      reserveToken: formatEther(data.reserveToken),
      isCompleted: data.isCompleted,
    };
  } catch (error) {
    console.error('Error getting bonding curve data:', error);
    return null;
  }
};

// Get estimated amount out for swap
export const getAmountOut = async (
  tokenAddress: string,
  amountIn: string,
  isBuy: boolean
): Promise<string> => {
  try {
    const contract = await getContract(false);
    const amount = parseEther(amountIn);
    const amountOut = await contract.getAmountOut(tokenAddress, amount, isBuy);
    return formatEther(amountOut);
  } catch (error) {
    console.error('Error calculating amount out:', error);
    return '0';
  }
};

// Network utilities
export const switchToBSC = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x38' }], // BSC Mainnet
    });
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x38',
            chainName: 'BNB Smart Chain',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed1.binance.org'],
            blockExplorerUrls: ['https://bscscan.com'],
          },
        ],
      });
    }
  }
};

export const switchToBSCTestnet = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x61' }], // BSC Testnet
    });
  } catch (error: any) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x61',
            chainName: 'BNB Smart Chain Testnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'tBNB',
              decimals: 18,
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
            blockExplorerUrls: ['https://testnet.bscscan.com'],
          },
        ],
      });
    }
  }
};

