import "./UserProducts.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineCollection } from "react-icons/hi";
import { IoIosImages } from "react-icons/io";
import { Pool } from "Pool";

const UserProducts = ({ rowData, userInfromation }) => {
  const [vuierState, setVuierState] = useState("NFTs");
  
  const [inc, setInc] = useState({  
  instance: "",
  sponser: "",
  reward: 0,
  royality: 0,
  yeild: 0,
  yeildlevel: 0,
  business: 0,
  nested: "",
});

const callbackClick = async (val) => {
  setVuierState(val);
}
useEffect(() => {
  const fetchWallet = async () => {
       
      const instance = userInfromation.instance;
      const income = await getIncome(instance);
      const papa = await getNodePapaNInst(nested,userInfromation.useraddress);
      const b = await getBusiness(nested,userInfromation.useraddress, 0);

      const enrichedInc = {
        instance: instance,
        sponser: papa[0] === "0x0000000000000000000000000000000000000000" ? "" : papa[0],
        reward: parseFloat(income[0]),
        royality: parseFloat(income[1]),
        yeild: parseFloat(income[2]),
        yeildlevel: parseFloat(income[3]),
        business: parseFloat(b[0]),
        nested: vuierState=="NFTs"? userInfromation.nestedA : userInfromation.nestedB,
      };
      setInc(enrichedInc);

  fetchWallet();
}}, [vuierState]);


  return (
    <section id="memberProducts">
      <hr className="my-4" />
      <div className="productNave">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div
                className={`d-flex justify-content-center align-items-center gap-2 pb-2 parontComponant ${
                  vuierState === "NFTs" && `active`
                }`}
                onClick={() => setVuierState("NFTs")}
              >
                <IoIosImages className="navIcon" />
                <span className="naveItemTitle">Yeild Pool</span>
                <span className="naveItenNumper d-flex justify-content-center align-items-center">
                  {userInfromation?.NFTs?.length}
                </span>
              </div>
            </div>
            <div className="col-6">
              <div
                className={`d-flex justify-content-center align-items-center gap-2 pb-2 parontComponant ${
                  vuierState === "collection" && `active`
                }`}
                onClick={() => setVuierState("collection")}
              >
                <HiOutlineCollection className="navIcon" />
                <span className="naveItemTitle">Swap Pool (Old)</span>
                <span className="naveItenNumper d-flex justify-content-center align-items-center">
                  {userInfromation?.collection?.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pool ></Pool>
    </section>
  );
};

export default UserProducts;
