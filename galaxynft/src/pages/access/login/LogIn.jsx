import "./LogIn.css";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { MetaMaskWallet } from "../../../components/Components";

import { isUser, UserToInst, getIncome, getNodePapaNInst, getBusiness, addBal } from "../../../services/_readService.js";

const LogIn = ({ Data, setData }) => {

  
  const [userInput, setUserInput] = useState({
    useraddress: "",
  });


  const [messageInbutHandler, setMessageInbutHandler] = useState({
    InbutNotFound: "",
  });

  const Callback = async () => {
    setUserInput({useraddress: localStorage.getItem("account") || ""});
  }

  const HandelInput = async (event)  => {
    event.preventDefault();
    debugger;
    if (await isUser(userInput.useraddress)) {
      const instance = await UserToInst(userInput.useraddress);
      const papa = await getNodePapaNInst(userInput.useraddress);
      const inc = await getIncome(instance);
      const b = await getBusiness(userInput.useraddress, 0);
      const bal = await addBal(userInput.useraddress);
    setData((prvData) => ({
          ...prvData,
          Access: {
            ...prvData.Default,
            haveaccess: "true",
            accountInfo: {
              ...prvData.Access.accountInfo,
              useraddress: userInput.useraddress,
              balance: bal,
              instance:instance,
              isUser: "true",
              sponser: papa[0] === "0x0000000000000000000000000000000000000000" ? "" : papa[0],
              reward: parseFloat(inc[0]),
              royality: parseFloat(inc[1]),
              yeild: parseFloat(inc[2]),
              yeildlevel: parseFloat(inc[3]),
              business: parseFloat(b[0]),
            }
          },
        }));
      }
      else {
        
            setData((prvData) => ({
              ...prvData,
              Access: {
                ...prvData.Access,
                haveaccess: "",
                accountInfo: {
                  ...prvData.Access.accountInfo,
                  isUser: "false",
                }
              }}));
        }
        
  };

  const HandelInput1 = (event) => {
    event.preventDefault();
    (userInput.userName != Data.accountInfo.userName ||
      userInput.userName != Data.accountInfo.userEmail) &&
    userInput.passWord != Data.accountInfo.userPassword
      ? setMessageInbutHandler({
          InbutNotFound: true,
        })
      : setData((prvData) => ({
          ...prvData,
          Access: {
            ...prvData.Access,
            haveaccess: "true",
          },
        }));
  };

  return (
    <>
      <Helmet>
        <title>Galaxy NFT | LogIn</title>
        <meta name="description" content="Galaxy NFT | LogIn" />
      </Helmet>
      <section id="Login" className="pt-0 pt-lg-1 pb-4">
        <div className="container">
          <div className="row my-5 mx-2">
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center order-1 order-lg-0 my-4">
              <div className="LoginBudy px-lg-4">
                <div className="text-center FORMhED">
                  <span className="F1 d-block">Welcome</span>
                  <span className="F4">
                    We are glad to see you back with us
                  </span>
                </div>
               
                <form onSubmit={HandelInput} className="mt-3">
                  {messageInbutHandler.InbutNotFound ? (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: ".8rem",
                      }}
                    >
                      <span>*Provide you valid address</span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex justify-content-center mt-3">
                    <div className="w-100 position-relative inputComponant">
                      <input
                        className="w-100 py-2"
                        type="text"
                        required
                        minLength={6}
                        value={userInput.useraddress}
                        onChange={(inputValue) =>
                          setUserInput({
                            ...userInput,
                            useraddress: inputValue.target.value,
                          })
                        }
                      />
                      {!userInput.useraddress ? (
                        <div className="F4 inputContant">
                          <FiUser className="FiUser" />
                          <span>Address (Base64 format)</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-100 position-relative buttonInputComponant py-2">
                      <span>Continue as</span>
                    </button>
                  </div>
                </form>
               
             
                <div className="hrStyle gap-1">
                      <span className="F1">Wallet Connect </span>
                      <span className="F4">(Metamask)</span>
                </div>
                <div>
                      <div className="d-flex justify-content-center mt-4">
                         <MetaMaskWallet callback={Callback}/>
                      </div>
                </div>
                      
                {/*<div className="hrStyle gap-1 mt-4">
                  <Link to="/signup">
                    <span className="F1">Sign Up</span>
                  </Link>
                      
                </div>*/}
              </div>
            </div>
            <div className="col-12 col-lg-6 order-0 order-lg-1 formeImg my-4">
              <img
                src="/images/access/welcomeBack.png"
                alt="login Img"
                width="100%"
                className="p-lg-3"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
