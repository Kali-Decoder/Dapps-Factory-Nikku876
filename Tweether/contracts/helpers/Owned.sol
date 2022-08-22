// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Owned{
    address public ownerAddress;
    constructor(){
        ownerAddress=msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender==ownerAddress,"You are not owner");
        _;
    }

    function transferOwnership(address _newAddr) public onlyOwner {
        require(_newAddr!=address(0),"Not Null Address");
        ownerAddress=_newAddr;
    }
}