//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// import "hardhat/console.sol";

contract Transaction {
    uint transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    TransferStruct[] transactions;

    //Transaction has been added in block chain 
    function addInBlockchain(address payable  receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount++;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
    }

    function getAllTransaction() view public returns(TransferStruct[] memory){
        return transactions;
    }

    function getTransactionCount() public view returns(uint256){
        return transactionCount;
    }
}
