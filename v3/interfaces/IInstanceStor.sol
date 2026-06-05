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
        uint256 totInc;
        uint256 thresholdx;
        uint256 totIncdollar;
        uint256 thresholdollarx;
        uint256 minpay;
        uint256 minpaydollar;
        bool cap;
        bool capinc;
        bool capdollar;
    }

    struct LevelInfoStr {
        uint256 lvlbs;
        uint256 lvlqty;
        uint256 lvlrwrd;
        uint256 lvlyei;
    }
}

interface IInstanceStor {
    error CallFailed();
    error InvalidAddress();
    error InvalidState();
    error NotAuthorized();
    error NotSafe();
    error ReentrancyGuardReentrantCall();
    error TargetCallFailed(bytes4 selector);

    event CapReset(
        uint256 invested,
        uint256 claimed,
        uint256 claimedDollar,
        uint256 investedDollar,
        uint256 burned,
        uint256 burnedDollar,
        uint256 ag
    );
    event EthBurned(address indexed sender, uint256 amount);
    event EthTransferred(address indexed to, uint256 amount);
    event HexBaseUpdated(address indexed previousHexBase, address indexed newHexBase);
    event LogTxns(address from, address orc1155, uint256 _amt, uint256 _value, uint256 _time, uint256 _type);
    event OwnerUpdated(address indexed previousOwner, address indexed newOwner);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function BurnCoin(uint256 _dollar, uint256 maxinterwal) external payable;
    function LSB(uint256, uint256) external view returns (int256);
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function _txnType7(uint256 _maxint, uint256 _ag) external payable returns (uint256[9] memory CALC_INC);
    function _txnType_1_0(
        address paramAdd,
        uint256 _id_maxint,
        uint256 _qty,
        uint256 _msgValue,
        uint256 _type,
        uint256 _ag
    ) external payable returns (uint256 _tvl, uint256 _amt);
    function activedirectsCount() external view returns (uint256);
    function addLevelnGetRank(
        uint256 _amount,
        uint256 _qty,
        uint256 _level,
        uint256 _epochAge,
        uint256 _free,
        bool _tobeSkipped
    ) external returns (uint256 currentrnk);
    function bonus() external view returns (uint256);
    function cage() external view returns (uint256);
    function currentCycle() external view returns (uint256);
    function currentLSBversion() external view returns (uint256);
    function dage() external view returns (uint256);
    function getAllComputeData(uint256 maxinterwal) external view returns (InstanceStor.ComputeResult memory cr);
    function getAllData(uint256 typeId, uint256 maxinterwal) external view returns (uint256[7] memory values);
    function getBalance() external view returns (uint256);
    function getHexbase() external view returns (address);
    function getNodeLB(uint256 _level) external view returns (InstanceStor.LevelInfoStr memory);
    function getNodeLvlInfoBatch(uint256 from, uint256 to)
        external
        view
        returns (InstanceStor.LevelInfoStr[] memory info);
    function getRankAgeInBatch() external view returns (uint256[] memory rankagebatch);
    function getRankWithAgeValue() external view returns (uint256, uint256);
    function getToggleAgeCount(uint256 key) external view returns (uint256);
    function getToggleAgeValue(uint256 key, uint256 index) external view returns (uint256);
    function id() external view returns (uint256);
    function importOld(uint256 limit) external payable;
    function isLock() external view returns (bool);
    function mintCount() external view returns (uint256);
    function mints(uint256) external view returns (uint256 amt, uint256 qty, uint256 mage, address nft);
    function moveLvlIncome(uint256 _amount, uint256 _qty, uint256 _level, uint256 _epochAge, bool _op)
        external
        returns (uint256 lastrnk, uint256 currentrnk);
    function owner() external view returns (address);
    function postInit() external view returns (bool);
    function preinit(address _hex, address _own, uint256 _id, bool isnew) external;
    function rank() external view returns (uint256);
    function resetRank() external;
    function setActivedirect(bool addremove) external;
    function setBonus(uint256 b) external;
    function setLock(bool flag) external;
    function setSuspend(uint256 key, bool value) external;
    function setburnclaimdollar(uint256 claim, uint256 claimdollar) external;
    function storcache() external;
    function syncBaseAddr() external;
    function systemAge() external view returns (uint256);
    function updateOwner(address _newowner) external;
    function userCycleMintCount(uint256) external view returns (uint256);
    function withdrawlDage() external view returns (uint256);
}
