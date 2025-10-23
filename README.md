# BNB Token Launchpad 🚀

A decentralized token launchpad platform built on Binance Smart Chain (BSC) that allows users to create, launch, and trade BEP-20 tokens with bonding curve pricing.

<img width="1914" height="916" alt="Screenshot_1" src="https://github.com/user-attachments/assets/df0bb573-ac3c-45ad-9d97-a4e69b4b42ec" />

## ✨ Features

- 🪙 **Token Creation**: Launch your own BEP-20 tokens on BSC with custom metadata
- 💹 **Bonding Curve Trading**: Buy and sell tokens with automated pricing
- 🔗 **Multi-Wallet Support**: Connect with MetaMask, Trust Wallet, and other BSC-compatible wallets
- 📊 **Real-time Trading**: Live trading interface with price charts
- 👤 **User Profiles**: Track created tokens and trading history
- 🌐 **Social Integration**: Add Twitter, Telegram, and website links to your tokens
- **Blockchain**: Binance Smart Chain (BSC)
- **Web3**: Wagmi, Viem, Ethers.js, ConnectKit
- **Trading Charts**: TradingView Charting Library
- **State Management**: React Context API
- **Real-time**: WebSocket for live updates

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Four.meme-token-launchpad-fork
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_BSC_RPC_URL=https://bsc-dataseed1.binance.org
NEXT_PUBLIC_BSC_TESTNET_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545
NEXT_PUBLIC_CHAIN_ID=56
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_API_URL=your_backend_api_url
```

4. **Add BNB Icons** ⚠️
Place BNB icon images in:
- `public/assets/images/tools/bnb.svg`

See `ICON_REQUIREMENTS.txt` for details.

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Prerequisites
- Deploy the token launchpad smart contract to BSC
- Set up your backend API
- Configure environment variables for production

### Build for Production
```bash
npm run build
npm run start
```

## 📖 Documentation

- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Complete migration guide
- **[ICON_REQUIREMENTS.txt](./ICON_REQUIREMENTS.txt)** - Icon setup instructions

## 🔐 Smart Contract

The platform requires a deployed token launchpad smart contract on BSC. The contract should implement:

- Token creation with metadata
- Bonding curve buy/sell mechanism
- Fee distribution
- Event emissions for tracking

Contract ABI is available in `src/contracts/TokenLaunchpad.json`

## 🌐 Networks

### BSC Mainnet
- Chain ID: 56
- RPC: https://bsc-dataseed1.binance.org
- Explorer: https://bscscan.com

### BSC Testnet
- Chain ID: 97  
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545
- Explorer: https://testnet.bscscan.com
- Faucet: https://testnet.bnbchain.org/faucet-smart

## 📂 Project Structure

```
├── src/
│   ├── app/              # Next.js app pages
│   ├── components/       # React components
│   │   ├── buttons/      # Button components
│   │   ├── cards/        # Card components  
│   │   ├── creatToken/   # Token creation UI
│   │   ├── trading/      # Trading interface
│   │   └── ...
│   ├── contracts/        # Smart contract ABIs and web3 functions
│   ├── contexts/         # React context providers
│   ├── config/           # Configuration files
│   └── utils/            # Utility functions
├── public/
│   └── assets/           # Static assets (images, icons)
└── ...
```

## 📞 Support

- Telegram: [Topsecretagent_007](https://t.me/topsecretagent_007)

**Built with ❤️ for the BSC ecosystem**
