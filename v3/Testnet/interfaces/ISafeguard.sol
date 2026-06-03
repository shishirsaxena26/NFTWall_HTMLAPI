// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface ISafeguard {
    error CallFailed();
    error InvalidAddress();
    error InvalidState();
    error NotAuthorized();
    error NotSafe();
    error TargetCallFailed(bytes4 selector);

    event EthBurned(address indexed sender, uint256 amount);
    event EthTransferred(address indexed to, uint256 amount);
    event HexBaseUpdated(address indexed previousHexBase, address indexed newHexBase);
    event OwnerUpdated(address indexed previousOwner, address indexed newOwner);
    event SafeApproval(address indexed signer, uint256 approvals, uint256 required);
    event SafeStatusChanged(bool status);
    event SecureBaseUpdated(address indexed user, bool action);
    event SignerApproval(address indexed approver, address indexed targetSigner, bool action, uint256 approvals);
    event SignerUpdated(address indexed targetSigner, bool action);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function approveSafe() external;
    function approveSigner(address targetSigner, bool action) external;
    function getBalance() external view returns (uint256);
    function getHexbase() external view returns (address);
    function isSafe() external view returns (bool);
    function isSecureBase(address s) external view returns (bool);
    function isSigner(address s) external view returns (bool);
    function owner() external view returns (address);
    function safeApprovalCount() external view returns (uint256);
    function safeApproved(uint256, address) external view returns (bool);
    function safeRound() external view returns (uint256);
    function safesecurebasecurd(address sender, bool action) external;
    function signerApproved(uint256, address, address) external view returns (bool);
    function signerProposal(address)
        external
        view
        returns (bool action, uint256 approvals, bool executed, uint256 round);
    function signerRound() external view returns (uint256);
    function syncBaseAddr() external;
    function systemAge() external view returns (uint256);
    function totalSigners() external view returns (uint256);
}
