// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
contract WavePortal{
    address public admin;
    uint public totalWaves;

    constructor(){
        admin=msg.sender;
    }

    function wave()  public returns(bool){

        return true;
    }
}