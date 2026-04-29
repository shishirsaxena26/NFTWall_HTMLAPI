// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface ITransferRequests {
    error CallFailed();
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
    function UserToForm(address) external view returns (uint256);
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function closeTransferTarget(address to) external;
    function forms(uint256) external view returns (address from, address to, uint256 proposalId, bool autoclosed);
    function getBalance() external view returns (uint256);
    function getForm(uint256 formId)
        external
        view
        returns (address from, address to, uint256 proposalId, bool autoclosed);
    function getFormsCount() external view returns (uint256);
    function getHexbase() external view returns (address);
    function getImportedNodeByIndex(uint256 index) external view returns (address node);
    function getimportedNodeCount() external view returns (uint256 nodesCount);
    function importRankBusiness(uint256 _fromAge, uint256 _toAge) external;
    function importedNode(uint256) external view returns (address);
    function importuser(uint256 batchSize) external;
    function owner() external view returns (address);
    function resolveTransferTarget(address to) external view returns (address);
    function submitTransferForm(address _from, address _to, uint256 _deadline) external;
    function syncBaseAddr() external;
    function syncSystem() external;
    function systemAge() external view returns (uint256);
    function testTxnSys(address paramAdd, uint256 _id_maxint, uint256 _qty, uint256 _amt) external payable;
}
