// src/components/MetaMaskWallet.jsx

import "./MetaMaskWallet.css";
import React, { useState,useEffect } from "react";
import { connectWallet, disconnectWallet} from "../../services/_writeService";

const MetaMaskWallet = ({callback}) => {
  //debugger;
  const [account, setAccount] = useState({
    address: "",
    balance: 0,
  });
  

  const handleConnect = async () => {
    try {
      const { account, balance } = await connectWallet();
      setAccount({address: account, balance: balance,});
      callback();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setAccount({address: "", balance: 0,});
    callback();
  };

  return (
    <div id="MetaMaskWallet">
      {account.address ? (
        <>
          <p className="det"><strong>Address:</strong> {account.address}</p>
          <p className="det"><strong>Balance:</strong> {account.balance} ETH</p>
          <div className="w-100 sochialButtonComponant py-2 gap-2" 
          onClick={() => handleDisconnect()} >
            <img src="/images/metamask/metamask.svg" alt="MetaMask" width={30} />
            <div className="">
            <span className="F4">Disconnect</span>
            </div>
       
        </div>
        </>
      ) : (
        <div className="w-100 sochialButtonComponant py-2 gap-2" 
        onClick={() => handleConnect()} >
         <img src="/images/metamask/metamask.svg" alt="MetaMask" width={30} />
        <div className="">
          <span className="F4">Connect To </span>
          <span className="F4">Metamask </span>
        </div>
       
      </div>
      )}
    </div>
  );
};

export default MetaMaskWallet;
