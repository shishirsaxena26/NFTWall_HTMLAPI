// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IHexBaseDaoCoreDeployer {
    function dAOAssembly() external view returns (address);
    function daocore() external view returns (address);
    function nested741() external view returns (address);
    function old741() external view returns (address);
    function price() external view returns (address);
}
