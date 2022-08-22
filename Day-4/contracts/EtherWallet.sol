// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EtherWallet{
    address payable public owner;

    constructor(address payable _owner){
        owner=_owner;

    }
     function deposit() payable public {

    }

    function sendEther(address payable _to, uint amount) public {
        if(msg.sender==owner){
            _to.transfer(amount);
            return;
        }
        revert("Sender is not allowed ");
    }

    function balanceOf() view public returns(uint){
        return address(this).balance;
    }
}