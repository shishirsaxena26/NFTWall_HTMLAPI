import "./UserInfo.css";
import { MdAdd } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { PiFacebookLogoLight } from "react-icons/pi";
import { PiDiscordLogoLight } from "react-icons/pi";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Txn } from "../../../../../services/_writeService.js";
//import { isUser, userToInst } from "../../../../services/ReadService.js";

const UserInfo = ({ userInfromation }) => {
    const [formState, setFormState] = useState(false);

  const [userInput, setUserInput] = useState({
    sponser: ""
  });
  
  const HandleSponserAdd = () => {
    if (!userInput.sponser && !userInput.isuser) {
      Txn("0x0000000000000000000000000000000000000000", 0, 0, 5, userInput.sponser,0).then((res) => {
        userInfromation.sponser = userInput.sponser;
      
      });
    }
  };

//  Init = async (inst, sponser) 

  return (
    <section id="memberAcount">
      <div
        className="profilePanner mb-5"
        style={{ backgroundImage: `url('${userInfromation.userPanar}')` }}
      >
        <div className="colorLayr" />
        <div>
          <img
            src={userInfromation.userImg}
            alt="user Img"
            className="d-block d-md-none smimg"
          />
        </div>
        <div>
          <img
            src={userInfromation.userImg}
            alt="user Img"
            className="d-none d-md-block  Lgimg"
          />
        </div>
      </div>
      <div className="container">
        <div className="row pt-4 mx-1">
         
          <div className="col-12 col-md-9 userInfoSection">
            <div className="d-flex justify-content-center justify-content-md-start align-items-center gap-2">
              <span>{userInfromation.useraddress}</span>
              {userInfromation.Verified === 1 && (
                <MdVerified className="VerifiedIcon" />
              )}
              
            </div>
            <div className="d-flex justify-content-center justify-content-md-start align-items-center gap-2">
              <span className="F2">{userInfromation.sponser}</span>
              {userInfromation.Verified === 1 && (
                <MdVerified className="VerifiedIcon" />
              )}
              
            </div>
            {!formState ? (
              <>
            <div className="d-flex justify-content-center justify-content-md-start text-center text-md-start gap-5 userState mt-4">
              <div className=" me-lg-3">
                <span className="d-block stateNumper">
                  {userInfromation.reward}+
                </span>
                <span className="stateName">Reward</span>
              </div>
              <div className="mx-lg-3">
                <span className="d-block stateNumper">
                  {userInfromation.royality}+
                </span>
                <span className="stateName">Royality</span>
              </div>
              <div className="mx-lg-3">
                <span className="d-block stateNumper">
                  {userInfromation.yeild}+
                </span>
                <span className="stateName">Yeild</span>
              </div>
              <div className="mx-lg-3">
                <span className="d-block stateNumper">
                  {userInfromation.yeildlevel}+
                </span>
                <span className="stateName">Level</span>
              </div>
              <hr></hr>
            </div>
          </>
           ):(
            <div className="d-flex justify-content-center justify-content-md-start  text-md-start gap-5 userState mt-4">
              <div className=" mx-lg-12">
                <div className="subbortSearchSection">
                  <span className="F1">Add your sponser address?</span>
                  <div className="inbutSection d-flex align-items-center p-1 mt-3">
                    <FiSearch className="searchIcon my-1 mx-2" />
                    <input type="text" placeholder="sponser address (base64)"
                    value={userInput.passWord}
                    onChange={(inputValue) =>
                      setUserInput({
                        ...userInput,
                        sponser: inputValue.target.value,
                      })
                    }
                    />
                    <span className="py-2 px-3" 
                      onClick={() =>  HandleSponserAdd()}>
                      Join
                    </span>
                  </div>
                </div>
            
              </div>
              
            </div>
            )}
          </div>
          <div className="col-md-3 d-none d-md-block buttonSection ">
          

            <div className="d-flex justify-content-end gap-3">
           {userInfromation.instance?
              <div className="btnSection d-flex justify-content-center align-items-center gap-2 py-3 px-3">
                <FaRegCopy className="reactIcons" />
                <span>{userInfromation.instance}</span>
              </div>
              :
              <div className="btnSectionoutLone d-flex justify-content-center align-items-center gap-2 py-3 px-3"
              onClick={() => { if(userInfromation.isUser) {setFormState(!formState)}}} >
                <MdAdd className="reactIcons lemon" />
                <span>{!formState?"Join Sponser":"Close"}</span>
                
              </div>
            }
            </div>
          
          
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
