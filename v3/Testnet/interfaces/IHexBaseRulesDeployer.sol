// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IHexBaseRulesDeployer {
    function invalidator() external view returns (address);
    function rule741() external view returns (address);
    function transferRequest() external view returns (address);
}
