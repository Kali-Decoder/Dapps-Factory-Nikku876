//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EtherWallet{
    address public owner;
    constructor(){
        owner= msg.sender;
    }
    function deposit() public payable {}

    function sendEther(address payable receiver,uint amount) public {
        require(owner==msg.sender,"Only Done By Owner ");
        receiver.transfer(amount);
    }
    function balanceOf() view  public returns(uint) {
        return address(this).balance;
    }

}
