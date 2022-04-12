// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract Dai is ERC20,ERC20Detailed {
    constructor() ERC20Detailed("DAI","Dai StableToken",18) public {}
}
