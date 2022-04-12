// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";



contract Mem is ERC20,ERC20Detailed {
    constructor() ERC20Detailed("MEM","Meme Token",18) public {}
}
