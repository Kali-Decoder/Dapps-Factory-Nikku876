// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;


contract Lottery{
    enum State{
        IDLE,
        BETTING
    }
    State public currentState=State.IDLE;
    address[] public players;

    uint public betCount;
    uint public betSize;
    uint public houseFee;
    address public admin;
    mapping(address=>bool) public dualPlayers;
    constructor(uint fee){
        require(fee>1 && fee <99 ,"Fee Should Be Greater Than 1 and less than 99");
        admin= msg.sender;
        houseFee=fee;
    }

    function createBet(uint count,uint size) external payable inState(State.IDLE) onlyAdmin(){
            betCount=count;
            betSize=size;
            currentState=State.BETTING;
    }

    function bet() external payable inState(State.BETTING) {
        require(msg.value==betSize,"Not Betting processed");
        players.push(msg.sender);
        if(players.length==betCount){
            uint winner= _randomModulo(betCount);
            payable(players[winner]).transfer((betSize*betCount)*(100-houseFee)/100);
            currentState=State.IDLE;
            delete players;
        }
    }
    function cancel() external payable onlyAdmin() inState(State.BETTING)  {
        for(uint i=0;i<players.length;i++){
            payable(players[i]).transfer(betSize);
        }
        delete players;
        currentState=State.IDLE;
    }
    function _randomModulo(uint num) view internal returns(uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty)))%num;
    }
    modifier inState(State state){
        require(currentState==state,"Current state is not idle");
        _;
    }
    modifier onlyAdmin(){
        require(msg.sender==admin,"You are not Admin");
        _;
    }
}