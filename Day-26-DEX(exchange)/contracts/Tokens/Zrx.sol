// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';


contract Zrx is ERC20,ERC20Detailed{
    constructor() ERC20Detailed("ZRX","Zebra Token",18) public {}
}
