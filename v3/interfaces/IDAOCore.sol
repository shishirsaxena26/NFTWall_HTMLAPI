// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IDAOCore {
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
    event ProposalCreated(
        uint256 indexed proposalId, uint256 indexed templateId, address indexed creator, address target
    );
    event ProposalDeclined(uint256 indexed proposalId);
    event ProposalExecuted(uint256 indexed proposalId, bool status);
    event ProposalTemplateCreated(
        uint256 indexed templateId, string desc, address indexed target, bytes4 selector, uint256 callType
    );
    event ProposalTemplateStatus(uint256 indexed templateId, bool active);
    event ProposalTemplateUpdated(
        uint256 indexed templateId,
        string desc,
        address indexed target,
        bytes4 selector,
        uint256 deadline,
        uint256 callType
    );
    event ProposalVoted(uint256 indexed proposalId, address indexed voter, bool vote);

    fallback() external payable;

    receive() external payable;

    function Burn(uint256 amount) external;
    function _delegatorCount() external view returns (uint256);
    function _getImplementation(address clone) external view returns (address impl);
    function _isDelegatorNode(address sender) external view returns (bool);
    function _isSafe() external view returns (bool);
    function _isSecureBase(address sender) external view returns (bool);
    function _isSigner(address sender) external view returns (bool);
    function addOrUpdateProposalTemplate(
        uint256 templateId,
        string memory desc,
        address target,
        bytes4 selector,
        uint256 deadline,
        uint256 callType,
        bool active
    ) external;
    function createProposal(string memory desc, address target, uint256 value, bytes memory data, uint256 deadline)
        external
        returns (uint256);
    function declineProposal(uint256 proposalId) external;
    function getBalance() external view returns (uint256);
    function getHexbase() external view returns (address);
    function getProposal(uint256 proposalId)
        external
        view
        returns (string memory, address, uint256, address, bool, uint256);
    function getProposalsCount() external view returns (uint256);
    function getResult(uint256 proposalId) external view returns (uint256, uint256, uint256, uint256, bool, bool);
    function getStatus(uint256 proposalId) external view returns (bool, bool);
    function hasVoted(uint256 proposalId, address voter) external view returns (bool);
    function newProposal(uint256 templateId, address targetuser, bytes memory params, uint256 value)
        external
        returns (uint256);
    function owner() external view returns (address);
    function proposalTemplates(uint256)
        external
        view
        returns (string memory desc, address target, bytes4 selector, bool active, uint256 deadline, uint256 callType);
    function proposals(uint256)
        external
        view
        returns (
            string memory description,
            address target,
            uint256 value,
            bytes memory data,
            uint256 votesup,
            uint256 votesdown,
            uint256 deadline,
            uint256 wincount,
            bool exist,
            address creator,
            bool status,
            bool resolved,
            uint256 templateId
        );
    function setProposalTemplateStatus(uint256 templateId, bool active) external;
    function setWinPer(uint256 _per) external;
    function syncBaseAddr() external;
    function systemAge() external view returns (uint256);
    function templateCount() external view returns (uint256);
    function vote(uint256 proposalId, bool updown) external;
}
