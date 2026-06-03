// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IHexBaseNFTEngine {
    function deployNFTCat() external;
    function deployNFTLion() external;
    function deployNFTMachineBull() external;
    function deployNFTMonalisa() external;
    function deployNFTNeonlit() external;
    function hexb() external view returns (address);
    function nFTCat() external view returns (address);
    function nFTLion() external view returns (address);
    function nFTMachineBull() external view returns (address);
    function nFTMonalisa() external view returns (address);
    function nFTNeonlit() external view returns (address);
    function nFTProxy() external view returns (address);
    function nftFactory() external view returns (address);
}
