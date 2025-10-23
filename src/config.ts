export const BSC_RPC = process.env.NEXT_PUBLIC_BSC_RPC_URL ?? "https://bsc-dataseed1.binance.org";
export const BSC_TESTNET_RPC = process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL ?? "https://data-seed-prebsc-1-s1.binance.org:8545";
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID ?? "56"; // 56 for BSC Mainnet, 97 for BSC Testnet

const endpoints = {
    tradingVariables:"", 
    tradingHistory24:"",
    prices24Ago:"",
    pricingChart: "https://tizz-be-api-production.up.railway.app/charts",
    chartSocket: "http://",
    personalTradingHistoryTable:
      "https://backend-$$network_name$$$$collateral_type$$.gains.trade/personal-trading-history-table",
    userTradingVariables:
      "https://backend-$$network_name$$$$collateral_type$$.gains.trade/user-trading-variables",
    backendSocket: "wss://tizz-be-api-production.up.railway.app",
  };

export default endpoints;
 