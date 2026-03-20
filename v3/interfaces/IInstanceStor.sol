// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IInstanceStor {
    error ReentrancyGuardReentrantCall();
    error TargetCallFailed(bytes4 selector);

    event EthBurned(address indexed sender, uint256 amount);
    event EthTransferred(address indexed to, uint256 amount);
    event HexBaseUpdated(address indexed previousHexBase, address indexed newHexBase);
    event LogTxns(address from, address orc1155, uint256 _amt, uint256 _value, uint256 _time, uint256 _type);
    event OwnerUpdated(address indexed previousOwner, address indexed newOwner);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function BurnCoin() external payable;
    function LSB(uint256) external view returns (int256);
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _importOld(uint256 limit) external payable;
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function _txnType7(uint256 _maxint, uint256 _ag)
        external
        payable
        returns (
            uint256 CALC_RWRD,
            uint256 CALC_ROYAL,
            uint256 CALC_SELF,
            uint256 CALC_YEILD,
            uint256 CALC_TOUR1,
            uint256 CALC_TOUR2,
            uint256 CALC_VAL,
            uint256 CALC_SELF_PROPOSED
        );
    function _txnType_1_0(address paramAdd, uint256 _id_maxint, uint256 _qty, uint256 _msgValue, uint256 _type)
        external
        payable
        returns (uint256 _tvl, uint256 _amt);
    function addLevelnGetRank(
        uint256 _amount,
        uint256 _qty,
        uint256 _yeildlevel,
        uint256 _level,
        uint256 _epochAge,
        uint256 _free,
        uint256 _irank
    ) external returns (uint256 lastrnk, uint256 currentrnk);
    function bonus() external view returns (uint256);
    function burned() external view returns (uint256 _burned);
    function cage() external view returns (uint256);
    function capStatus() external view returns (uint256 threshold, bool _cap, uint256 currentValue);
    function compute(uint256 maxinterwal)
        external
        view
        returns (uint256 p1, uint256 p2, uint256 p3, uint256 p4, uint256 p5, uint256 p6, uint256 p7);
    function dage() external view returns (uint256);
    function direct() external view returns (uint256);
    function drawn()
        external
        view
        returns (uint256 p1, uint256 p2, uint256 p3, uint256 p4, uint256 p5, uint256 p6, uint256 p7);
    function flushed()
        external
        view
        returns (uint256 p1, uint256 p2, uint256 p3, uint256 p4, uint256 p5, uint256 p6, uint256 p7);
    function getBalance() external view returns (uint256);
    function getHexbase() external view returns (address);
    function getNodeLB(uint256 _level) external view returns (uint256, uint256);
    function id() external view returns (uint256);
    function inc(uint256) external view returns (uint256);
    function isCap() external view returns (bool);
    function isLock() external view returns (bool);
    function levelRestrictionAge() external view returns (uint256);
    function lvlbs(uint256) external view returns (uint256);
    function lvlqty(uint256) external view returns (uint256);
    function lvlrwrd(uint256) external view returns (uint256);
    function lvlyei(uint256) external view returns (uint256);
    function mintCount() external view returns (uint256);
    function mints(uint256) external view returns (uint256 amt, uint256 qty, uint256 mage, address nft);
    function moveLvlIncome(uint256 _amount, uint256 _qty, uint256 _level, uint256 _epochAge, bool _op)
        external
        returns (uint256 lastrnk, uint256 currentrnk);
    function owner() external view returns (address);
    function postInit() external view returns (bool);
    function preinit(address _hex, address _own, uint256 _id) external;
    function rank() external view returns (uint256);
    function rankage(uint256) external view returns (uint256);
    function selfProposed() external view returns (uint256 _selfProposed);
    function setBonus(uint256 b) external;
    function setLock(bool flag) external;
    function setSuspend(bool s1, bool s2, bool s3, bool s4, bool s56, bool s7, bool lck) external;
    function setTourAndGift(uint256 t1, uint256 t2) external;
    function suspendinc(uint256) external view returns (bool);
    function systemAge() external view returns (uint256);
    function unpaid()
        external
        view
        returns (uint256 p1, uint256 p2, uint256 p3, uint256 p4, uint256 p5, uint256 p6, uint256 p7);
    function updateOwner(address _newowner) external;
    function withdrawlDage() external view returns (uint256);
}
