// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IValidators {
    error AlreadyMapped();
    error AlreadyUpdatedForToDay();
    error ClaimLimitReached();
    error InactiveDelegator();
    error InsufficientIncome();
    error LengthMismatch();
    error NotExists();
    error NotMapped();
    error ReentrancyGuardReentrantCall();
    error StaticCallFailed();
    error TargetCallFailed(bytes4 selector);
    error TransferFailed();
    error ZeroAddress();

    event DelegatorMapped(address indexed validator, address delegator, address user);
    event EthBurned(address indexed sender, uint256 amount);
    event EthTransferred(address indexed to, uint256 amount);
    event HexBaseUpdated(address indexed previousHexBase, address indexed newHexBase);
    event OwnerUpdated(address indexed previousOwner, address indexed newOwner);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function getBalance() external view returns (uint256);
    function getHexbase() external view returns (address);
    function getUserFromDelegator(address delegator) external view returns (address);
    function getValidatorDelegatorOfUser(address user) external view returns (address, address, bool);
    function importIncome(address userfrom, address userto) external;
    function incomeOf(address user) external view returns (uint256);
    function mapValidatorDelegator(address user, address vald) external;
    function owner() external view returns (address);
    function systemAge() external view returns (uint256);
    function updateDelegators(address[] memory valds, address[] memory dels, bool[] memory active) external;
    function updateIncome(address[] memory users, uint256[] memory amounts, bool increase, uint256 _age) external;
}
