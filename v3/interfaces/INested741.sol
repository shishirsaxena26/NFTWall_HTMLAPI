// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface INested741 {
    error CallFailed();
    error FailedDeployment();
    error InsufficientBalance(uint256 balance, uint256 needed);
    error InvalidAddress();
    error InvalidState();
    error NotAuthorized();
    error NotSafe();
    error ReentrancyGuardReentrantCall();
    error TargetCallFailed(bytes4 selector);

    event EthBurned(address indexed sender, uint256 amount);
    event EthTransferred(address indexed to, uint256 amount);
    event HexBaseUpdated(address indexed previousHexBase, address indexed newHexBase);
    event OwnerUpdated(address indexed previousOwner, address indexed newOwner);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function UserToId(address) external view returns (uint256);
    function _ageNow() external view returns (uint256);
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function addBusiness(
        uint256 _id,
        address _paramAdd,
        uint256 _tokenid,
        uint256 _qty,
        uint256 _msgValue,
        uint256 _type
    ) external;
    function claimIncome(uint256 _id, uint256 _maxint) external returns (uint256, uint256);
    function closemdrequest(uint256 uid) external;
    function compileRoyality(uint256 prevAge) external;
    function createmdrequest(uint256 uid, uint256 newpid) external;
    function getBalance() external view returns (uint256);
    function getBatchRankCounts(uint256 ag) external view returns (uint256[8] memory counts);
    function getDownlineCountByLevel(uint256 uid, uint256 lvl) external view returns (uint256);
    function getHexbase() external view returns (address);
    function getNode(uint256 _id)
        external
        view
        returns (
            uint256 _i,
            address _node,
            uint256 _pid,
            address _inst,
            address _stor,
            bool _active,
            uint256 _direcCount
        );
    function getNodeChild(uint256 _id, uint256 inx) external view returns (uint256 child);
    function getNodeDirectsCount(uint256 _id) external view returns (uint256 count);
    function getNodeParent(address _user) external view returns (uint256, address);
    function getNodeParentId(uint256 _id) external view returns (uint256);
    function getNodesCount() external view returns (uint256 nodesCount);
    function getRoyalityAmountBatch(uint256 ag) external view returns (uint256[7] memory royal);
    function getTeamSize(uint256 uid) external view returns (uint256);
    function getTotalTeamSizeWithLevel(address _user, uint256 lvl) external view returns (uint256, uint256);
    function getUserIdToInst(uint256 _id) external view returns (address);
    function getUserIdToStor(uint256 _id) external view returns (address);
    function getUserToInst(address node) external view returns (address);
    function getUserToStor(address _user) external view returns (address);
    function getbusiness(uint256 ag) external view returns (uint256);
    function getjoining(uint256 ag) external view returns (uint256);
    function getrankCount(uint256 ag, uint256 rnk) external view returns (uint256 count);
    function gettotqty(uint256 ag) external view returns (uint256);
    function getwithdrawn(uint256 ag) external view returns (uint256);
    function importBusiness(uint256 _amt, uint256 _ag) external;
    function importJoining(uint256 _cnt, uint256 _ag) external;
    function importOld(uint256 _id, uint256 _limit) external payable;
    function importRankNBusiness(uint256 from, uint256 to) external;
    function importWithdrawal(uint256 _amt, uint256 _ag) external;
    function isNode(uint256 _id) external view returns (bool);
    function isUserExists(address node) external view returns (bool);
    function join(address _parent, address _user) external returns (uint256 _id, address _stor);
    function joinImport(address _parent, address _user) external returns (uint256 _id, address _stor);
    function moveDownline(uint256 uid) external;
    function nodes(uint256) external view returns (address);
    function owner() external view returns (address);
    function setDefaultRankCount(uint256 _limit) external;
    function setMoveDownlineApproval(uint256 uid, uint256 newpid) external;
    function systemAge() external view returns (uint256);
    function tokenImport(uint256 _id, uint256 mintid) external;
    function updateUsers(address from, address to) external returns (uint256 _id, address _stor, address _parent);
}
