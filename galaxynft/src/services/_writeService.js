// src/services/web3Controller.js
import Web3 from "web3";
import { isUser, UserToInst,mintFee ,addBal, bonus} from "./_readService";
import factoryABI from "../abi/Nftwall-Factory.sol/NFTWallFactory.json"; // your contract ABI
import InsABI from "../abi/Nftwall-Instance.sol/NodeInstance.json"; // your contract ABI

let web3;
let account;
let factory;

//  const factory = new web3.eth.Contract(factoryABI.abi, process.env.VITE_FACTORY_CONTRACT_TESTNET);
//const CONTRACT_ADDRESS = "0xYourContractAddressHere"; // Replace with real contract address


const setAccountChanged = async (accounts) => {  
  
  localStorage.clear(); 
  if (accounts.length>0) {
      localStorage.setItem("account",accounts[0]);
      const balanceWei = await web3.eth.getBalance(accounts[0]);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      
      localStorage.setItem("balance",parseFloat(balanceEth).toFixed(4));
  }
}

const handleAccountsChanged = async (accounts) => {
 await setAccountChanged(accounts);
};

export const connectWallet = async () => {
  
  if (!window.ethereum) throw new Error("MetaMask not installed");

  web3 = new Web3(window.ethereum);
  window.ethereum.on("accountsChanged", handleAccountsChanged);
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  factory = new web3.eth.Contract(factoryABI.abi, import.meta.env.VITE_FACTORY_CONTRACT_TESTNET);
  await setAccountChanged(accounts);
  return {
    account:localStorage.getItem("account"), 
    balance: parseFloat(localStorage.getItem("balance")),
  };
};

export const disconnectWallet = () => {
  web3 = null;
  account = null;
  localStorage.clear()
};

export const getAccount = () => account;
export const getWeb3 = () => web3;
export const getContract = () => contract;

// ✅ Example: Call a contract read method
export const callSomeReadMethod = async () => {
  if (!contract) throw new Error("Contract not initialized");
  const result = await contract.methods.someReadMethod().call();
  return result;
};


export const createInstance = async () => {
  await ethereum.enable();
    
  await connectWallet();
  var account = localStorage.getItem("account");
  if (!factory || !account) throw new Error("Missing contract or account");

  const tx = await factory.methods.createInstance(account,1).send({ from: account });
  return tx;
};

async function _isUser(){
  return await isUser(account);
} 

async function _userToInst(){
  return await UserToInst(account);
} 

export const Txn = async (orc1155, tokenid, qty, type, sponser, r) => {
  
  try {
    await ethereum.enable();
    await connectWallet();
    var account = localStorage.getItem("account");
    
    if(!(await _isUser())) return;
    let inst = await _userToInst();
    if(inst=="0x0000000000000000000000000000000000000000") return;
    let _value=0;

    if(type==1 || type==2){
      let fee = await mintFee(orc1155);
      _value=fee*qty;
      let inbBal = await addBal(inst);
      inbBal += await bonus();
      _value=inbBal>=_value?(inbBal-_value):(_value-inbBal); // if bonus is used, it should not exceed the total value
    }
    
    debugger;
    let instance = new web3.eth.Contract(InsABI.abi, inst);
    let tx = await instance.methods.Txn(orc1155,tokenid,qty,type,sponser,r).send({ from: account, value: _value });
    debugger;
    return tx;
    } catch (err) {
      console.error("Error reading token name:", err);
      return "";
    }

};
