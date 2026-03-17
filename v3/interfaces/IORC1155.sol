// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IORC1155 {
    error ERC1155InsufficientBalance(address sender, uint256 balance, uint256 needed, uint256 tokenId);
    error ERC1155InvalidApprover(address approver);
    error ERC1155InvalidArrayLength(uint256 idsLength, uint256 valuesLength);
    error ERC1155InvalidOperator(address operator);
    error ERC1155InvalidReceiver(address receiver);
    error ERC1155InvalidSender(address sender);
    error ERC1155MissingApprovalForAll(address operator, address owner);
    error FailedDeployment();
    error InsufficientBalance(uint256 balance, uint256 needed);
    error ReentrancyGuardReentrantCall();
    error TargetCallFailed(bytes4 selector);

    event ApprovalForAll(address indexed account, address indexed operator, bool approved);
    event EthBurned(address indexed sender, uint256 amount);
    event EthTransferred(address indexed to, uint256 amount);
    event HexBaseUpdated(address indexed previousHexBase, address indexed newHexBase);
    event OwnerUpdated(address indexed previousOwner, address indexed newOwner);
    event TransferBatch(
        address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values
    );
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    event URI(string value, uint256 indexed id);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function _uri() external view returns (string memory);
    function addToken(string[] memory _names) external;
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] memory accounts, uint256[] memory ids) external view returns (uint256[] memory);
    function claimed() external view returns (uint256);
    function clonedOf() external view returns (address);
    function curSupply() external view returns (uint256);
    function getBalance() external view returns (uint256);
    function getHexbase() external view returns (address);
    function getNames(uint256 inx) external view returns (string memory);
    function getTokenCount() external view returns (uint256);
    function getUnlockedNFT() external view returns (uint256 _NFT);
    function ids(uint256) external view returns (uint256);
    function isApprovedForAll(address account, address operator) external view returns (bool);
    function isSecuredNFT(address orc1155) external view returns (bool);
    function lastTransferDay() external view returns (uint256);
    function mintedAge() external view returns (uint256);
    function mintedUser() external view returns (address);
    function mintedfee() external view returns (uint256);
    function mintedqty() external view returns (uint256);
    function name() external view returns (string memory);
    function names(uint256) external view returns (string memory);
    function onTokenBurn(uint256 _id, uint256 _qty, bytes memory payload) external;
    function onTokenBurnByForce(uint256 _id, uint256 _qty, bytes memory payload) external;
    function onTokenTransfer(address _from, address _to, uint256 _id, uint256 _qty, bytes memory payload) external;
    function onTokenTransferByForce(address _from, address _to, uint256 _id, uint256 _qty, bytes memory payload)
        external;
    function owner() external view returns (address);
    function postinit(
        string memory _contractName,
        string memory baseURI_,
        string memory _nName,
        uint256 _nid,
        address _account,
        uint256 _qty,
        uint256 _fee,
        uint256 _ag,
        address _hex
    ) external payable;
    function preinit(address _account, uint256 _id, uint256 _qty, uint256 _fee, uint256 _ag)
        external
        payable
        returns (address);
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) external;
    function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes memory data) external;
    function setApprovalForAll(address operator, bool approved) external;
    function setURI(string memory newuri) external;
    function setcurSupply(uint256 _s) external;
    function setsupply(uint256 _s) external;
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
    function systemAge() external view returns (uint256);
    function totSupply() external view returns (uint256);
    function totalNFTSent() external view returns (uint256);
    function uri(uint256 _tokenid) external view returns (string memory);
}
