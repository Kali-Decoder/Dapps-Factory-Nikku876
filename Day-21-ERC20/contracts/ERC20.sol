// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface ERC20Interface {
    // Functions to be implemented prototypes
    function transfer(address to, uint256 tokens)
        external
        returns (bool success);

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) external returns (bool success);

    function balanceOf(address _owner) external view returns (uint256 balance);

    function approve(address spender, uint256 tokens)
        external
        returns (bool success);

    function allowance(address tokenOwner, address spender)
        external
        view
        returns (uint256 balance);

    function totalSupply() external view returns (uint256);

    // Events

    event Transfer(address indexed from, address indexed to, uint256 tokens);

    event Approval(
        address indexed tokenOwner,
        address indexed spender,
        uint256 tokens
    );
}

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

    function transfer(address to, uint256 value) public returns (bool) {
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
    ) public returns (bool) {
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

    function approve(address spender, uint256 value) public returns (bool) {
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

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function totalSupply() public view returns (uint256) {
        return tS;
    }
}
