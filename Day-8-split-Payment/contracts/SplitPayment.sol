// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract SplitPayment{

    address public owner;
    constructor(address _owner) public {
      owner=_owner;
    }

    modifier onlyOwner(){
      require(msg.sender==owner);
      _;
    }
    
    function splitPayment(address payable[] memory to ,uint[] memory amount) public payable onlyOwner {
      require(to.length==amount.length,"Not divide equally ");
      for(uint i=0;i<to.length;i++){
        to[i].transfer(amount[i]);
      }

    }
}