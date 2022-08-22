// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract UniSwap {
    event Transfer(address from ,address to ,uint amount, string message, uint timestamp,string keyword);

    function publishTransaction(address payable receiver,uint amount,string memory message,string memory keyword) public {
        emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
    }
}