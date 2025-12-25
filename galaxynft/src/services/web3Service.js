// src/services/web3Service.js

let web3Instance = null;
let walletProvider = null;

export function setWeb3Instance(web3, provider) {
  web3Instance = web3;
  walletProvider = provider;
}

export function getWeb3Instance() {
  return web3Instance;
}

export function getWalletProvider() {
  return walletProvider;
}
