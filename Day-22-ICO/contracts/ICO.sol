// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;


interface  ERC20Interface {
    // Functions to be implemented prototypes
    function transfer(address to, uint256 tokens) external    returns (bool success);

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) external    returns (bool success);

    function balanceOf(address _owner) external    view returns (uint256 balance);

    function approve(address spender, uint256 tokens)
        external   
        
        returns (bool success);

    function allowance(address tokenOwner, address spender)
        external   
        view
        returns (uint256 balance);

    function totalSupply() external    view returns (uint256);

    // Events

    event Transfer(address indexed from, address indexed to, uint256 tokens);

    event Approval(
        address indexed tokenOwner,
        address indexed spender,
        uint256 tokens
    );
}
//Erc token 
contract ERC20 is ERC20Interface {
    string public name;
    string public symbol;
    uint256 public decimals;
    uint256 public tS;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _decimals
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        tS = _totalSupply;
        balances[msg.sender] = _totalSupply;
    }

    function transfer(address to, uint256 value) public  returns (bool) {
        require(balances[msg.sender] >= value, "No Tokens Is Availaible");
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) public  returns (bool) {
        uint256 allowanceValue = allowed[from][msg.sender];
        require(
            balances[msg.sender] >= tokens && allowanceValue >= tokens,
            "No Tokens Availbale"
        );
        allowed[from][msg.sender] -= tokens;
        balances[to] += tokens;
        balances[msg.sender] -= tokens;
        emit Transfer(from, to, tokens);

        return true;
    }

    function approve(address spender, uint256 value) public  returns (bool) {
        require(spender != msg.sender);
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(address owner, address spender)
        public
        view
        
        returns (uint256)
    {
        return allowed[owner][spender];
    }

    function balanceOf(address _owner) public  view returns (uint256) {
        return balances[_owner];
    }

   function totalSupply() public view returns (uint256){
       return tS;
   }
}


//initial coin offering contract interact with erc20 

contract ICO{
    struct Sale{
        address investor;
        uint quantity;

    }
    Sale[] public sales;
    mapping(address=>bool) public investors;
    address public admin;
    address public token;
    uint public end;
    uint public price;
    uint public availableTokens;
    uint public minPurchase;
    uint public maxPurchase;
    bool public released=false;

    constructor(string memory _name,string memory _symbol,uint _decimals,uint _totalSupply){
        
        token = address(new ERC20(_name,_symbol,_totalSupply,_decimals));
        admin=msg.sender;
    }

    function start(uint duration ,uint _price,uint _minPurchase,uint _maxPurchase,uint _availablTokens)external onlyAdmin() icoNotActive(){

        require(duration>0,"Duration should be greater than zero");
        uint totalSupply= ERC20(token).totalSupply();
        require(_availablTokens>0 && _availablTokens<= totalSupply,"Available tokens are no in range");

        require(_minPurchase>0,"Min purchase is greater than zero");
        require(_maxPurchase>0 && _minPurchase<=_availablTokens,"Condition for max purchase is not set");

        end=duration +block.timestamp;
        availableTokens=_availablTokens;
        minPurchase=_minPurchase;
        maxPurchase=_maxPurchase;
        price=_price;
    }


    function whiteList(address investor) external onlyAdmin() {
        investors[investor]=true;

    }

    function buy() payable external onlyInvestors() icoActive(){

        require(msg.value%price==0,"Have to send a multiple of price");
        require(msg.value>=minPurchase && msg.value<=maxPurchase,"Range of msg.value");

        uint quantity= msg.value*price;

        require(quantity<=availableTokens,"out of stocks");

        sales.push(Sale(msg.sender,quantity));

    }

    function release()external onlyAdmin() icoEnded() tokensNotReleased(){
        ERC20 tokenInstance = ERC20(token);
        for(uint i=0;i<sales.length;i++){
            Sale storage sale= sales[i];
            tokenInstance.transfer(sale.investor, sale.quantity);
        }
    }

    function withDraw(address payable to,uint amount) external onlyAdmin() icoEnded() tokensReleased(){
        to.transfer(amount);
    }
    modifier tokensReleased(){
        require(released==true,"Tokens must  be released");
        _;
    }
    modifier tokensNotReleased(){
        require(released==false,"Tokens must not be released");
        _;
    }
    modifier icoEnded(){
        require(end>0 && (block.timestamp>=end || availableTokens==0),"ICO must have ended");
        _;
    }
    modifier icoActive(){
        require(end>0 && block.timestamp<end && availableTokens>0,"ICO MUST BE ACTIVE");
        _;
    }
    modifier onlyInvestors(){
        require(investors[msg.sender]==true,"You are not an investor");
        _;
    }
    modifier onlyAdmin{
        require(msg.sender==admin,"You are not admin");
        _;
    }

    modifier icoNotActive(){
        require(end==0,"Ico is not active");
        _;
    }

}