
import "./UserProducts.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineCollection } from "react-icons/hi";
import { IoIosImages } from "react-icons/io";
const Pool = ({ incdata, sponser, nested }) => {


    return (
<div className="productCartComponant py-4">
<div className="container">
  <div className="row mx-3 mx-md-4 pb-2">
  
<div className="col-12 col-md-9 userInfoSection">  
    <div className="d-flex justify-content-center justify-content-md-start align-items-center gap-2">
    <span className="F2">{sponser}</span>
    
      <MdVerified className="VerifiedIcon" />
   
    
  </div>

  <div className="bg-burly d-flex justify-content-center justify-content-md-start text-center text-md-start gap-5 userState mt-4">
      <div className=" me-lg-3">
        <span className="d-block stateNumper">
          {incdata.reward}+
        </span>
        <span className="stateName">Reward</span>
      </div>
      <div className="mx-lg-3">
        <span className="d-block stateNumper">
          {incdata.royality}+
        </span>
        <span className="stateName">Royality</span>
      </div>
      <div className="mx-lg-3">
        <span className="d-block stateNumper">
          {incdata.yeild}+
        </span>
        <span className="stateName">Yeild</span>
      </div>
      <div className="mx-lg-3">
        <span className="d-block stateNumper">
          {incdata.yeildlevel}+
        </span>
        <span className="stateName">Level</span>
      </div>
      <div className="mx-lg-3">
        <span className="d-block stateNumper">
          {incdata.business}+
        </span>
        <span className="stateName">MyBusiness</span>
      </div>
      <hr></hr>
    </div>
</div>   
   

  
  </div>
</div>
</div>

);
};

export default Pool;