// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IHexBaseInstanceTVLEngine {
    function instance() external view returns (address);
    function tVLFactory() external view returns (address);
    function tVLMining() external view returns (address);
    function tVLReward() external view returns (address);
    function tVLRoyality() external view returns (address);
    function tVLTour() external view returns (address);
    function tVLValidator() external view returns (address);
}
