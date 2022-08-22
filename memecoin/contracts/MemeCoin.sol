// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MemeCoin is ERC20,Ownable,ERC20Burnable{
    event TokensBurned(address indexed owner,uint amount,string message);
    event TokensMinted(address indexed owner, uint amount,string message);
    event AdditionalMintedTokens(address indexed owner,uint amount,string message);

    constructor() ERC20("It's Nickk","ITN"){
        _mint(msg.sender,1000*10**decimals());
        emit TokensMinted(msg.sender,1000*10**decimals(),"Initially Tokens Minted By Owner !!!");
    }

    function mintingToknen(address to,uint value)public onlyOwner{
        _mint(to,value);
        emit AdditionalMintedTokens(msg.sender,value,"Additional Tokens Minted By Owner");
    }

    function burnedTokens(uint value) public   onlyOwner{
        _burn(msg.sender,value);
        emit TokensBurned(msg.sender,value,"Tokens Are Burned ");
    }
}