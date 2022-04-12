// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;


contract Fibb{

    function calculateFib(uint x) public view returns(uint){
        uint first=0;
        uint second=1;
        uint third;
        if(x==0){return 0;}
        if(x==1){return 1;}

        for(uint i=2;i<=x;i++){
            third= first+second;
            first=second;
            second=third;
            
        }

        return third;
    }
}