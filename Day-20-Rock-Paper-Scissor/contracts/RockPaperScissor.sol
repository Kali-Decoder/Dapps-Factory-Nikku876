// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract RockPaperScissor {
    //stages
    enum State {
        CREATED,
        JOINED,
        COMMITED,
        REVEALED
    }
    struct Game {
        uint256 id;
        uint256 bet;
        address payable[2] players;
        State state;
    }
    struct Move {
        bytes32 hash;
        uint256 value;
    }

    mapping(uint256 => Game) public games;

    uint256 public gameId;
    address payable public admin;
    mapping(uint256 => mapping(address => Move)) public moves;

    mapping(uint256 => uint256) public winningMoves;

    constructor() {
        admin=payable(msg.sender);
        //1 rock
        //2 paper
        //3 scissor
        winningMoves[1] = 3; // if player one chooses 1 and second player chooses 3 then one is winner
        winningMoves[2] = 1;
        winningMoves[3] = 2;
    }

    function createGame(address payable participant) external payable {
        require(msg.value >= 500 , "Money Should Be One Ether");
        address payable[2] memory players;
        players[0] = payable(msg.sender);
        players[1] = participant;
        games[gameId] = Game(gameId, msg.value, players, State.CREATED);
        gameId++;
        admin.transfer(msg.value);
    }

    function joinedGame(uint256 _gameId) external payable {
        Game storage newGame = games[_gameId];

        require(
            newGame.players[1] == msg.sender,
            "You Are Not Participant Of This Game"
        );
        require(newGame.state == State.CREATED, "Must be in created state");

        require(newGame.bet == msg.value, "Not Enough Ether Sent");

        newGame.state = State.JOINED;
        admin.transfer(msg.value);
    }

    function commitMove(
        uint256 _gameId,
        uint256 moveId,
        uint256 _salt
    ) external {
        Game storage newGame = games[_gameId];
        require(newGame.state == State.JOINED, "game must be joined state");
        require(
            newGame.players[0] == msg.sender ||
                newGame.players[1] == msg.sender,
            "Can only be call by one of the players"
        );
        require(moves[_gameId][msg.sender].hash == 0, "move already made");

        require(
            moveId == 1 || moveId == 2 || moveId == 3,
            "move must be in 1,2,3"
        );

        moves[_gameId][msg.sender] = Move(
            keccak256(abi.encodePacked(moveId, _salt)),
            0
        );

        if (
            moves[_gameId][newGame.players[0]].hash != 0 &&
            moves[_gameId][newGame.players[1]].hash != 0
        ) {
            newGame.state = State.COMMITED;
        }
    }

    //Revealed Your Move
    function revealedMove(
        uint256 _gameId,
        uint256 moveId,
        uint256 _salt
    ) external {
        Game storage newGame = games[_gameId];
        Move storage move1 = moves[_gameId][newGame.players[0]];

        Move storage move2 = moves[_gameId][newGame.players[1]];

        Move storage moveSender = moves[_gameId][msg.sender];

        require(newGame.state == State.COMMITED, "Game must be commited state");
        
        require(
            newGame.players[0] == msg.sender ||
                newGame.players[1] == msg.sender,
            "Can only be call by one of the players"
        );

        require(
            moveSender.hash == keccak256(abi.encodePacked(moveId, _salt)),
            "Hash must be equal"
        );

        moveSender.value = moveId;

        if (move1.value != 0 && move2.value != 0) {
            if (move1.value == move2.value) {
                newGame.players[0].transfer((newGame.bet) / 2);
                newGame.players[1].transfer((newGame.bet) / 2);
                newGame.state = State.REVEALED;
                return;
            }
            address payable winner;

            winner = winningMoves[move1.value] == move2.value
                ? newGame.players[0]
                : newGame.players[1];

            winner.transfer(newGame.bet);
            newGame.state = State.REVEALED;
        }
    }
}
