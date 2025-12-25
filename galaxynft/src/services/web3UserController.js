// web3Controller.js

// Existing imports & variables...
import Web3 from "web3";
import MyContractJSON from "../contracts/MyContract.json";

let web3;
let account;
let contract;

const CONTRACT_ADDRESS = "0xYourContractAddress"; // Replace

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed");

  web3 = new Web3(window.ethereum);
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

  account = accounts[0];
  contract = new web3.eth.Contract(MyContractJSON.abi, CONTRACT_ADDRESS);

  const balanceWei = await web3.eth.getBalance(account);
  const balanceEth = web3.utils.fromWei(balanceWei, "ether");

  return {
    account,
    balance: parseFloat(balanceEth).toFixed(4),
  };
};

export const disconnectWallet = () => {
  web3 = null;
  account = null;
  contract = null;
};

export const getAccount = () => account;
export const getWeb3 = () => web3;
export const getContract = () => contract;

// ✅ Wrap your contract methods like this:
export const callSomeReadMethod = async () => {
  if (!contract) throw new Error("Contract not initialized");

  const result = await contract.methods.someReadMethod().call();
  return result;
};

// Add more like:
export const sendSomeWriteMethod = async () => {
  if (!contract || !account) throw new Error("Missing contract or account");

  const tx = await contract.methods.someWriteMethod().send({ from: account });
  return tx;
};
