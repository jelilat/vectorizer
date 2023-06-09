import { configureChains, createConfig, Chain } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import * as env from './components/config'

import { publicProvider } from 'wagmi/providers/public'

export const GRPC_URL = env.GRPC_URL;
export const GREENFIELD_RPC_URL = env.GREENFIELD_RPC_URL;
export const GREEN_CHAIN_ID = env.GREEN_CHAIN_ID;
export const BSC_RPC_URL = env.BSC_RPC_URL;
export const BSC_CHAIN_ID = env.BSC_CHAIN_ID;
export const TOKEN_HUB_CONTRACT_ADDRESS = env.TOKEN_HUB_CONTRACT_ADDRESS;
export const CROSS_CHAIN_CONTRACT_ADDRESS = env.CROSS_CHAIN_CONTRACT_ADDRESS;

const greenFieldChain: Chain = {
  id: GREEN_CHAIN_ID,
  network: 'greenfield',
  rpcUrls: {
    default: {
      http: [GREENFIELD_RPC_URL],
    },
    public: {
      http: [GREENFIELD_RPC_URL],
    },
  },
  name: 'greenfield',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
};

const bscChain: Chain = {
  id: BSC_CHAIN_ID,
  name: 'BSC',
  network: 'QA - bsc smart chain',
  rpcUrls: {
    default: {
      http: [BSC_RPC_URL],
    },
    public: {
      http: [BSC_RPC_URL],
    },
  },
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  // blockExplorers: {
  //   default: { name: '', url: 'https://testnet.bscscan.com/' },
  // },
  // testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, greenFieldChain, bscChain],
  [
    publicProvider(),
  ],
)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})
