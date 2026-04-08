// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

library InstanceStor {
    struct ComputeResult {
        uint256 p1;
        uint256 p2;
        uint256 p3;
        uint256 p4;
        uint256 p5;
        uint256 p6;
        uint256 p7;
        uint256 f1;
        uint256 f2;
        uint256 f3;
        uint256 f4;
        uint256 f5;
        uint256 f6;
        uint256 f7;
        int256 lsb;
    }
}

interface IInstanceStor {
    error GlobalPoolLimitReached();
    error ImportLimitExceeded();
    error InvalidClone();
    error InvalidMintCycleLimit();
    error InvalidnewOwner();
    error MintLimitExceeded();
    error PreInitException();
    error ReentrancyGuardReentrantCall();
    error StorLocked();
    error TargetCallFailed(bytes4 selector);
    error UnsecureORC1155();

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
    function _compute(uint256 endage) external view returns (InstanceStor.ComputeResult memory r);
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _importOld(uint256 limit) external payable;
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function _txnType7(uint256 _maxint, uint256 _ag) external payable returns (uint256[9] memory CALC_INC);
    function _txnType_1_0(address paramAdd, uint256 _id_maxint, uint256 _qty, uint256 _msgValue, uint256 _type)
        external
        payable
        returns (uint256 _tvl, uint256 _amt);
    function addLevelnGetRank(
        uint256 _direct,
        uint256 _amount,
        uint256 _qty,
        uint256 _level,
        uint256 _epochAge,
        uint256 _free,
        bool _tobeSkipped
    ) external returns (uint256 currentrnk, uint256 currentrankage);
    function bonus() external view returns (uint256);
    function cage() external view returns (uint256);
    function capStatus() external view returns (uint256 totalIncome, uint256 threshold, bool _cap, uint256 currentValue);
    function dage() external view returns (uint256);
    function getAllIncome(uint256 typeId, uint256 maxinterwal) external view returns (uint256[7] memory values);
    function getBalance() external view returns (uint256);
    function getHexbase() external view returns (address);
    function getNodeLB(uint256 _level) external view returns (uint256, uint256, uint256, uint256);
    function getRankWithAgeValue() external view returns (uint256, uint256);
    function getToggleAgeCount(uint256 key) external view returns (uint256);
    function getToggleAgeValue(uint256 key, uint256 index) external view returns (uint256);
    function id() external view returns (uint256);
    function isLock() external view returns (bool);
    function mintCount() external view returns (uint256);
    function mints(uint256) external view returns (uint256 amt, uint256 qty, uint256 mage, address nft);
    function moveLvlIncome(uint256 _direct, uint256 _amount, uint256 _qty, uint256 _level, uint256 _epochAge, bool _op)
        external
        returns (uint256 lastrnk, uint256 currentrnk);
    function owner() external view returns (address);
    function postInit() external view returns (bool);
    function preinit(address _hex, address _own, uint256 _id) external;
    function rank() external view returns (uint256);
    function rankage(uint256) external view returns (uint256);
    function setBonus(uint256 b) external;
    function setLock(bool flag) external;
    function setSuspend(uint256 key, bool value) external;
    function systemAge() external view returns (uint256);
    function updateOwner(address _newowner) external;
    function userCycleMintCount(uint256) external view returns (uint256);
    function withdrawlDage() external view returns (uint256);
}
