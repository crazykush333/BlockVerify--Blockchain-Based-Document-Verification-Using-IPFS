import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const POLYGON_RPC = process.env.POLYGON_RPC ?? 'https://rpc.ankr.com/polygon_mumbai';

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    mumbai: {
      url: POLYGON_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  paths: {
    sources: './',
  },
};

export default config;