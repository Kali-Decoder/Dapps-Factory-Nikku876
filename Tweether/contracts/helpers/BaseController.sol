// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import './Owned.sol';

contract BaseController is Owned {
    address managerAddress;
    function setMangerAddress(address _manageAddress) public onlyOwner{
        require(msg.sender==address(0),"NULL");
        managerAddress=_manageAddress;
    }
}


