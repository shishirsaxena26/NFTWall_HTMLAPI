// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface INFTFactory {
    function deployNFT(address _hex, bytes memory params) external returns (address);
    function getCatNFTParamsEncoded() external pure returns (bytes memory);
    function getDragonNFTParamsEncoded() external pure returns (bytes memory);
    function getLionNFTParamsEncoded() external pure returns (bytes memory);
    function getMachineBullNFTParamsEncoded() external pure returns (bytes memory);
    function getMonalisaNFTParamsEncoded() external pure returns (bytes memory);
    function getNeonlitNFTParamsEncoded() external pure returns (bytes memory);
}
