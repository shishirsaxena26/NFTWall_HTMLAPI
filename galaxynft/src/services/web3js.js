import Web3 from "web3";

const web3 = (() => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    return new Web3(window.ethereum);
  } else {
    const provider = new Web3.providers.HttpProvider(process.env.REACT_APP_CHAIN_ID_TESTNET);
    return new Web3(provider);
  }
})();

export default web3;
