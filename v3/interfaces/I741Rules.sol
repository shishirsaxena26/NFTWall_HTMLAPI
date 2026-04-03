// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

library lib741Rules {
    struct RoyalityStr {
        uint256 rwNum;
        uint256 rwDen;
        uint256 rwEnd;
    }
}

interface I741Rules {
    error TargetCallFailed(bytes4 selector);

    event EthBurned(address indexed sender, uint256 amount);
    event EthTransferred(address indexed to, uint256 amount);
    event HexBaseUpdated(address indexed previousHexBase, address indexed newHexBase);
    event OwnerUpdated(address indexed previousOwner, address indexed newOwner);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function NFTSendPerCycle() external view returns (uint256);
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function allowForceTransfer() external view returns (bool);
    function capOnRank(uint256) external view returns (uint256 maxClaim, uint256 cycleDays);
    function capping()
        external
        view
        returns (uint256 multiple, bool rw, bool ry, bool self, bool yei, bool val, bool tour);
    function computeMintValue(uint256 _qty) external view returns (uint256);
    function computeTour(uint256 _r) external view returns (uint256);
    function delegateamtprivate() external view returns (uint256);
    function delegateamtpublic() external view returns (uint256);
    function eachclaimCycle() external view returns (uint256);
    function freeIntervals() external view returns (uint256);
    function getBalance() external view returns (uint256);
    function getBatchRoyaltyClauses() external view returns (lib741Rules.RoyalityStr[7] memory clauses);
    function getHexbase() external view returns (address);
    function getLevelIncomeOnRank() external view returns (uint256, uint256);
    function levelClause(uint256)
        external
        view
        returns (uint256 rank, uint256 rwNum, uint256 rwrDen, uint256 yeiNum, uint256 yeiDen);
    function lvlincrankmax() external view returns (uint256);
    function lvlincrankmin() external view returns (uint256);
    function maxClaimPerDay() external view returns (uint256);
    function maxGlobalClaimPerDay() external view returns (uint256);
    function maxMintQty() external view returns (uint256);
    function maxMintsPerCycle() external view returns (uint256);
    function maxNFTSend() external view returns (uint256);
    function minClaimPerDay() external view returns (uint256);
    function minMintQty() external view returns (uint256);
    function mintCycleDays() external view returns (uint256);
    function mintFeePerQty() external view returns (uint256);
    function owner() external view returns (address);
    function pool()
        external
        view
        returns (
            uint256 startafter,
            uint256 stakeN,
            uint256 stakeD,
            uint256 roiN,
            uint256 roiD,
            uint256 roiInt,
            uint256 roiEnd
        );
    function poolNFT1() external view returns (uint256 roiN, uint256 roiD, uint256 roiInt);
    function poolNFT2() external view returns (uint256 roiN, uint256 roiD, uint256 roiInt);
    function poolValprivate()
        external
        view
        returns (
            uint256 startafter,
            uint256 stakeN,
            uint256 stakeD,
            uint256 roiN,
            uint256 roiD,
            uint256 roiInt,
            uint256 roiEnd
        );
    function poolValpublic()
        external
        view
        returns (
            uint256 startafter,
            uint256 stakeN,
            uint256 stakeD,
            uint256 roiN,
            uint256 roiD,
            uint256 roiInt,
            uint256 roiEnd
        );
    function rankClause(uint256) external view returns (uint256 direct, uint256 nftAmount);
    function rankforDAO() external view returns (uint256);
    function royalityClause(uint256) external view returns (uint256 rwNum, uint256 rwDen, uint256 rwEnd);
    function setAllowForceTransfer(bool _f) external;
    function setCapping(uint256 _multiple, bool _rw, bool _ry, bool _self, bool _yei, bool _val, bool _tour) external;
    function setClaimPerDay(uint256 _min, uint256 _max) external;
    function setCoinPool(
        uint256 _type,
        uint256 _start,
        uint256 _stakeN,
        uint256 _stakeD,
        uint256 _roiN,
        uint256 _roiD,
        uint256 _roiInt,
        uint256 _roiEnd
    ) external;
    function setFreeIntervals(uint256 _d) external;
    function setGlobalClaimPerDay(uint256 _ac) external;
    function setLevelIncomeOnRank(uint256 _min, uint256 _max) external;
    function setMaxMintsPerCycle(uint256 _max) external;
    function setMaxNFTSend(uint256 _d) external;
    function setMintCycleDays(uint256 _d) external;
    function setMintFee(uint256 _fe) external;
    function setMintQty(uint256 _min, uint256 _max) external;
    function setNFTSendPerCycle(uint256 _d) external;
    function setNftPool(uint256 _type, uint256 _roiN, uint256 _roiD, uint256 _roiInt) external;
    function setRoyalityClause(uint256 _rank, uint256 _rwNum, uint256 _rwDen, uint256 _rwEnd) external;
    function setTourClause(uint256 _rank, uint256 _tw) external;
    function setclaimCycle(uint256 _d) external;
    function setlevelClause(
        uint256 lvl,
        uint256 _rank,
        uint256 _rpernum,
        uint256 _rperden,
        uint256 _ypernum,
        uint256 _yperden
    ) external;
    function setrankClause(uint256 rank, uint256 direct, uint256 nftAmount) external;
    function setrankforDAO(uint256 _r) external;
    function setshutdown(bool _shutdown) external;
    function setvalidatorPrice(uint256 _pri, uint256 _pub) external;
    function shutdown() external view returns (bool);
    function systemAge() external view returns (uint256);
    function tourClause(uint256) external view returns (uint256);
}
