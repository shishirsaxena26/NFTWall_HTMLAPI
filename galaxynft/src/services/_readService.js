// src/services/ReadService.js
import web3 from "./web3js";
import factoryABI from "../abi/Nftwall-Factory.sol/NFTWallFactory.json"; // your contract ABI
import InsABI from "../abi/Nftwall-Instance.sol/NodeInstance.json"; // your contract ABI
import NestedABI from "../abi/Nested741.sol/Nested741.json"; // your contract ABI
import RuleABI from "../abi/lib741Rules.sol/lib741Rules.json"; // your contract ABI
import ORC1155ABI from "../abi/ORC1155.sol/ORC1155.json"; // your contract ABI

const factory = new web3.eth.Contract(factoryABI.abi, import.meta.env.VITE_FACTORY_CONTRACT_TESTNET);
const rule = new web3.eth.Contract(RuleABI.abi, import.meta.env.VITE_RULE_CONTRACT_TESTNET);
const orc1155 = new web3.eth.Contract(ORC1155ABI.abi, import.meta.env.VITE_RULE_CONTRACT_TESTNET);


export const mintFee = async (orc1155Add) => {
  try {
    orc1155 = new web3.eth.Contract(ORC1155ABI.abi, orc1155Add);
    return await orc1155.methods.mintFee().call();
  } catch (err) {
    console.error("Error reading token name:", err);
    return false;
  }
};

export const addBal = async (add) => {
  try {
    return await web3.eth.getBalance(add);
  } catch (err) {
    console.error("Error reading token name:", err);
    return 0;
  }
};

export const bonus = async (ins) => {
  try {
    
    let instance = new web3.eth.Contract(InsABI.abi, ins);
    return await instance.methods.bonus().call();
  } catch (err) {
    console.error("Error reading token name:", err);
    return 0;
  }
};



// Example: Read a public variable or method
export const isUser = async (user) => {
  try {
     return await factory.methods.isuser(user).call();
  } catch (err) {
    console.error("Error reading token name:", err);
    return false;
  }
};

// Example: Read a public variable or method
export const UserToInst = async (nested, user) => {
  try {
    let nestedC = new web3.eth.Contract(NestedABI.abi, nested);
     return await nestedC.methods.UserToInst(user).call();
  } catch (err) {
    console.error("Error reading token name:", err);
    return "";
  }
};

// Example: Read a public variable or method
export const getNodePapaNInst = async (nested,user) => {
  try {
    let nestedC = new web3.eth.Contract(NestedABI.abi, nested);
    return await nestedC.methods.getNodePapaNInst(user).call();
  } catch (err) {
    console.error("Error reading token name:", err);
    return "";
  }
};





export const getIncome = async (ins) => {
  try {
    let instance = new web3.eth.Contract(InsABI.abi, ins);
    return await instance.methods.drawn().call();
  } catch (err) {
    console.error("Error reading token name:", err);
    return "";
  }
};


export const getBusiness = async (user) => {
  try {
    let nestedC = new web3.eth.Contract(NestedABI.abi, nested);
    return await nestedC.methods.getNodeLB(user,0).call();
  } catch (err) {
    console.error("Error reading token name:", err);
    return "";
  }
};




