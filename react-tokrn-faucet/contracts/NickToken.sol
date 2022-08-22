// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract NickToken is ERC20{

    constructor(string memory name,string memory symbol) ERC20(name,symbol){
        _mint(msg.sender,10000*(10**18));
    }
    function faucet(address reciever,uint amount) external{
        _mint(reciever,amount);
    } 
}
