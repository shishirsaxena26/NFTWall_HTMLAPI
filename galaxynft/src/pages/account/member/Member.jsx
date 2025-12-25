import { UserInfo, UserProducts } from "./components/memberComponents";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUser, UserToInst, getIncome, getNodePapaNInst, getBusiness } from "../../../services/_readService.js";


const Member = ({ Data, useraddress }) => {
  const navigate = useNavigate();
  const [userInfromation, setUserInfromation] = useState(Data.creators[0]);

  useEffect(() => {
    const fetchWallet = async () => {
        const enrichedUser = {
          ...Data.creators[0],
          useraddress: useraddress,
        
          isUser: await isUser(useraddress),
        };
        setUserInfromation(enrichedUser);
    };

    fetchWallet();
  }, [useraddress]);

  

  return (
    <>
      <Helmet>
        <title>Galaxy NFT | {useraddress} Account</title>
        <meta name="description" content="Galaxy NFT | Account" />
      </Helmet>

      
        <>
          <UserInfo userInfromation={userInfromation} />
          <UserProducts rowData={Data} userInfromation={userInfromation} />
        </>
      
    </>
  );
};

export default Member;