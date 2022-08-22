// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import './Owned.sol';

contract BaseStorage is Owned{
    address public controllerAddress;

    modifier onlyController(){
        require(msg.sender==controllerAddress,"You are not controller admin");
        _;
    }

    function setController(address _newAddr) public onlyController{
        require(_newAddr==address(0),"Null");
        controllerAddress= _newAddr;
    }
}