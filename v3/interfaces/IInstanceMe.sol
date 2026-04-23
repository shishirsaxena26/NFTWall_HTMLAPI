// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IInstanceMe {
    error ReentrancyGuardReentrantCall();
    error TargetCallFailed(bytes4 selector);

    event EthBurned(address indexed sender, uint256 amount);
    event EthTransferred(address indexed to, uint256 amount);
    event HexBaseUpdated(address indexed previousHexBase, address indexed newHexBase);
    event OwnerUpdated(address indexed previousOwner, address indexed newOwner);
    event TVLClaimTxnLog(address to, uint256 _value, uint256 _time, bool prime);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function Txn(address paramAdd, uint256 _id_maxint, uint256 _qty, uint256 _type) external payable;
    function TxnSys(address paramAdd, uint256 _id_maxint, uint256 _qty, uint256 _amt) external payable;
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function forceTransfer(address _inst) external;
    function getBalance() external view returns (uint256);
    function getHexbase() external view returns (address);
    function id() external view returns (uint256);
    function initialize() external payable;
    function name() external view returns (string memory);
    function owner() external view returns (address);
    function parent() external view returns (address);
    function setName(string memory _name) external;
    function setParent(address newparent) external;
    function stor() external view returns (address);
    function systemAge() external view returns (uint256);
}
