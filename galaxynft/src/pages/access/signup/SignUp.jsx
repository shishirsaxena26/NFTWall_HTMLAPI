import "./SignUp.css";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import { MdMedicalInformation } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { MdFileDownloadDone } from "react-icons/md";
import { MetaMaskWallet } from "../../../components/Components";
import { createInstance } from "../../../services/_writeService.js";
import { isUser, UserToInst, addBal } from "../../../services/_readService.js";

const SignUp = () => {
  const [userInput, setUserInput] = useState({
    useraddress: "",
  });


  const Callback = async () => {
    setUserInput({useraddress: localStorage.getItem("account") || "",
  });
  }

  const HandelCreateInstance = async () => {
    if(!await isUser(userInput.useraddress))
      var tx = await createInstance();
  }

  return (
    <>
      <Helmet>
        <title>Galaxy NFT | SignUp</title>
        <meta name="description" content="Galaxy NFT | SignUp" />
      </Helmet>
      <section id="SignUp" className="pt-0 pt-lg-1 pb-4">
        <div className="container">
          <div className="row my-5 mx-2">
            <div className="col-12 col-lg-6 order-1 order-lg-0 my-4 d-flex justify-content-center align-items-center">
              <div className="signupBudy px-lg-4">
                
              
                  <div className="zeroState">
                    <div className="text-center FORMhED pb-2 sochialButtonComponant d-flex justify-content-center mt-4"
                    onClick={(userInput.useraddress && !userInput.isUser) ? HandelCreateInstance : null}
                    >
                    <span className="F1 d-block">Create Zone</span> 
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <span className="F4">
                          Click to create your instance and start your journey.
                        </span>
                    </div>
                   
                    <div className="hrStyle gap-1">
                      <span className="F1">Wallet Connect </span>
                      <span className="F4">(Metamask)</span>
                    </div>
                    <div>
                      <div className="d-flex justify-content-center mt-4">
                         <MetaMaskWallet callback={Callback} />
                      </div>        
                    </div>
                    {/*<div className="hrStyle gap-1 mt-4">
                      <Link to="/login">
                        <span className="F1">Login</span>
                      </Link>
                  
                    </div>*/}
                  </div>
                
              </div>
            </div>
            <div className="col-12 col-lg-6 order-0 order-lg-1 formeImg my-4">
              <img
                src="/images/access/areYouRady.png"
                alt="signup img"
                width="100%"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
