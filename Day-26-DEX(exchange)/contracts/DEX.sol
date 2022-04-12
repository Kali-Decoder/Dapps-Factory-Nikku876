// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "@openzeppelin/contracts/math/SafeMath.sol";
contract DEX{

    using SafeMath for uint;
    
     enum Side{
        BUY,
        SELL
    }

    struct Token{
       
        bytes32 ticker;
         address tokenAddress;

    }
   
    struct Order{
        uint id;
        address trader;
        Side side;
        bytes32 ticker;
        uint amount;
        uint filled;
        uint price;
        uint date;
    }
    mapping(bytes32=>mapping(uint=>Order[])) public orderBook;

    mapping(bytes32=>Token) public tokens;
    bytes32[] public tokenList;
    address public admin ;
    uint public nextOrderId;
    uint public nextTradeId;
    mapping(address=>mapping(bytes32=>uint)) public balancesTraders;

    // address of traders and shows amount of tokens it has and what tokens it has
    bytes32 constant DAI= bytes32('DAI');

    event NewTrade(uint tradeId,uint orderId,bytes32 indexed ticker, address indexed trade1 ,address indexed trade2,uint amount,uint price,uint date) ;

    constructor() public  {
        admin=msg.sender;
    }

    function addToken(bytes32 ticker, address tokenAddress)external onlyAdmin {
        tokens[ticker]=Token(ticker,tokenAddress);
        tokenList.push(ticker);
    }

    function deposit(bytes32 ticker,uint bal) external tokenExist(ticker) {
        IERC20(tokens[ticker].tokenAddress).transferFrom(msg.sender,address(this),bal);
        balancesTraders[msg.sender][ticker]=balancesTraders[msg.sender][ticker].add(bal);
    }

    function withdrawTokens(uint bal,bytes32 ticker)external tokenExist(ticker) {
         require(balancesTraders[msg.sender][ticker]>=bal,"You Does Not Have Enough Tokens");
        balancesTraders[msg.sender][ticker]=balancesTraders[msg.sender][ticker].sub(bal);
        IERC20(tokens[ticker].tokenAddress).transfer(msg.sender,bal);
    }


    function createLimitOrder(bytes32 ticker, uint amount, uint price,Side side) external tokenExist(ticker) noDaiToken(ticker){
        
        if(side==Side.SELL){
            require(balancesTraders[msg.sender][ticker]>=0,"You Don't Have Enough Balance");

        }else{
            require(balancesTraders[msg.sender][DAI]>= amount.mul(price),"You have not enough dai tokens to convert this");

        }
        Order[] storage orders= orderBook[ticker][uint(side)];
        orders.push(Order(nextOrderId,msg.sender,side,ticker,amount,0,price,block.timestamp));


         uint i= orders.length>0 ? orders.length-1: 0 ;
         while(i>0){
            if(side==Side.BUY && orders[i-1].price>orders[i].price){
                 break;
             }
            if(side==Side.SELL && orders[i-1].price<orders[i].price){
                 break;
             }
            Order memory order =orders[i-1];
            orders[i-1]=orders[i];
            orders[i]=order;
            i.sub(1);
         }
         nextOrderId=nextOrderId.add(1);
    }


    function createMarketOrder(Side side ,bytes32 ticker,uint amount) external tokenExist(ticker) noDaiToken(ticker) {
        if(side==Side.SELL){
            require(balancesTraders[msg.sender][ticker]>=amount,"You Don't Have Enough Balance");

        }
        Order[] storage orders= orderBook[ticker][uint(side==Side.BUY ? Side.SELL : Side.BUY)];

        uint i;
        uint remaining=amount;

        while(i<orders.length && remaining>0)
        {
            uint available= orders[i].amount.sub(orders[i].filled);
            uint matched= (remaining>available)? available: remaining;
            remaining= remaining.sub(matched);
            orders[i].filled = orders[i].filled .add(matched);

            emit NewTrade( nextTradeId, orders[i].id, ticker,orders[i].trader ,msg.sender,matched,orders[i].price,block.timestamp); 

            if(side== Side.SELL){
                balancesTraders[msg.sender][ticker]=balancesTraders[msg.sender][ticker].sub(matched);
                balancesTraders[msg.sender][DAI]=balancesTraders[msg.sender][DAI].add(matched.mul(orders[i].price));

                balancesTraders[msg.sender][ticker]=balancesTraders[msg.sender][ticker].add(matched);
                balancesTraders[msg.sender][DAI]=balancesTraders[msg.sender][DAI].sub(matched.mul(orders[i].price));

            }

            if(side== Side.BUY){
                require(balancesTraders[msg.sender][DAI]>= matched.mul(orders[i].price),"You have not enough dai tokens to convert this");
                balancesTraders[msg.sender][ticker]=balancesTraders[msg.sender][ticker].add(matched);
                balancesTraders[msg.sender][DAI]=balancesTraders[msg.sender][DAI].sub(matched.mul(orders[i].price));

                balancesTraders[msg.sender][ticker]=balancesTraders[msg.sender][ticker].sub(matched);
                balancesTraders[msg.sender][DAI]= balancesTraders[msg.sender][DAI].add(matched.mul(orders[i].price));

            }
            nextTradeId=nextTradeId.add(1);
            i=i.add(i);
        }
        i=0;
        while(i<orders.length && orders[i].filled==orders[i].amount){
            for(uint j=i;j<orders.length-1;j--){
                orders[j]=orders[j+1];
               
            }
            orders.pop();
            i=i.add(1);
        }
        
    }

    modifier noDaiToken(bytes32 ticker){
         require(ticker!= DAI,"Cannot Trade to this token");
        _;
    }
    modifier onlyAdmin(){
        require(msg.sender==admin,"Only Admins");
        _;
    }

    modifier tokenExist(bytes32 ticker){
        require(tokens[ticker].tokenAddress!=address(0),"Token does not exist");

        _;
    }
}



