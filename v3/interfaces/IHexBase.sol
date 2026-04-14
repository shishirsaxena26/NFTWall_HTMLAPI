// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IHexBase {
    fallback() external payable;

    receive() external payable;

    function addOrc1155(address newAddr, address oldAddr, address oldAddrV1) external;
    function addOrc1155Prime(bytes memory params, address oldAddr) external;
    function addProposer(address _a) external;
    function daoassembly() external view returns (address);
    function daocore() external view returns (address);
    function getProposalsCount() external view returns (uint256);
    function importRankBusiness(uint256 frmage, uint256 toage) external;
    function importuser(uint256 limit) external;
    function in741() external view returns (address);
    function in741Old() external view returns (address);
    function in741Prime() external view returns (address);
    function in741PrimeOld() external view returns (address);
    function in741Primev3Old() external view returns (address);
    function in741Rule() external view returns (address);
    function in741RuleOld() external view returns (address);
    function in741RulePrime() external view returns (address);
    function in741RulePrimeOld() external view returns (address);
    function inDEAD() external view returns (address);
    function inDeployerAService() external view returns (address);
    function inDeployerAsRoot() external view returns (address);
    function inImportForgePrimeold() external view returns (address);
    function inInstance() external view returns (address);
    function inInstancePrime() external view returns (address);
    function inInstanceStor() external view returns (address);
    function inNftFactory() external view returns (address);
    function inNftProxy() external view returns (address);
    function inOrc1155(uint256) external view returns (address);
    function inOrc1155Old(uint256) external view returns (address);
    function inOrc1155OldV1(uint256) external view returns (address);
    function inOrc1155Prime(uint256) external view returns (address);
    function inOrc1155PrimeOld() external view returns (address);
    function inOrc1155PrimeOldV1() external view returns (address);
    function inOrc1155machinebullold() external view returns (address);
    function inPrice() external view returns (address);
    function inPrimeData() external view returns (address);
    function inPrimeProxy() external view returns (address);
    function inTransferPrimeold() external view returns (address);
    function inTransferold() external view returns (address);
    function inTreaseryFactory() external view returns (address);
    function inTreaseryTVLMining() external view returns (address);
    function inTreaseryTVLMiningImport() external view returns (address);
    function inTreaseryTVLMiningPrime() external view returns (address);
    function inTreaseryTVLReward() external view returns (address);
    function inTreaseryTVLRoyality() external view returns (address);
    function inTreaseryTVLTour() external view returns (address);
    function inTreaseryTVLValidator() external view returns (address);
    function inblank() external view returns (address);
    function incointransfer() external view returns (address);
    function infactoryold() external view returns (address);
    function infactoryprimeold() external view returns (address);
    function insafeguard() external view returns (address);
    function insafeguardOld() external view returns (address);
    function insafeguardPrime() external view returns (address);
    function insafeguardPrimeOld() external view returns (address);
    function invalidator() external view returns (address);
    function invalidatorOld() external view returns (address);
    function mapOldORC1155(address) external view returns (address);
    function mapOldORC1155Prime(address) external view returns (address);
    function proposals(uint256) external view returns (address);
    function s1() external view returns (address);
    function s2() external view returns (address);
    function s3() external view returns (address);
    function submit(
        address _hexNFTEngine,
        address _hexDaoCore,
        address _hexRules,
        address _hexUserEngine,
        address _hexInstanceEngine
    ) external;
    function testTxnSys() external;
    function update741(address addr) external;
    function update741Old(address addr) external;
    function update741Prime(address addr) external;
    function update741PrimeOld(address addr) external;
    function update741Primev3Old(address addr) external;
    function update741Rule(address addr) external;
    function update741RuleOld(address addr) external;
    function update741RulePrime(address addr) external;
    function update741RulePrimeOld(address addr) external;
    function updateCoinTransfer(address addr) external;
    function updateDAOAssembly(address _dao) external;
    function updateDAOCore(address _dao) external;
    function updateDEAD(address addr) external;
    function updateFactoryOld(address addr) external;
    function updateFactoryPrimeOld(address addr) external;
    function updateImportForgePrimeold(address addr) external;
    function updateInTransferOld(address addr) external;
    function updateInTransferPrimeOld(address addr) external;
    function updateInstance(address addr) external;
    function updateInstancePrime(address addr) external;
    function updateInstanceStor(address addr) external;
    function updateNftProxy(address addr) external;
    function updateOrc1155(address _o, address oldAddr, uint256 idx) external;
    function updateOrc1155MachineBullOld(address addr) external;
    function updateOrc1155Prime(address _o, address oldAddr, uint256 idx) external;
    function updateOrc1155PrimeOld(address addr) external;
    function updateOrc1155PrimeOldV1(address addr) external;
    function updatePrice(address addr) external;
    function updatePrimeData(address addr) external;
    function updatePrimeProxy(address addr) external;
    function updateProposals(address _a, uint256 idx) external;
    function updateSafeguard(address addr) external;
    function updateSafeguardOld(address addr) external;
    function updateSafeguardPrime(address addr) external;
    function updateSafeguardPrimeOld(address addr) external;
    function updateTreaseryFactory(address addr) external;
    function updateTreaseryTVLMiningImport(address addr) external;
    function updateTreaseryTVLValidator(address addr) external;
    function updateTreasuryTVLMining(address addr) external;
    function updateTreasuryTVLMiningPrime(address addr) external;
    function updateTreasuryTVLReward(address addr) external;
    function updateTreasuryTVLRoyality(address addr) external;
    function updateTreasuryTVLTour(address addr) external;
    function updateValidator(address addr) external;
    function updateValidatorOld(address addr) external;
}
