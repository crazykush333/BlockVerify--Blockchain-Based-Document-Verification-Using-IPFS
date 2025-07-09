/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    CHAIN_RPC_URL: process.env.NEXT_PUBLIC_CHAIN_RPC_URL,
  },
};

module.exports = nextConfig;