// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

contract Delance {
    address public freelancer;
    address public empolyer;
    uint256 public deadline;

    constructor(uint256 _deadline, address _freelancer) {
        deadline = _deadline;
        freelancer = _freelancer;
        empolyer = msg.sender;
    }

    struct Request {
        uint256 id;
        string title;
        uint256 amount;
        bool locked;
        bool paid;
    }
    Request[] public requests;
    event RequestUnlocked(bool locked);
    event CreatedRequest(string title,uint price,bool locked ,bool paid);


    function createRequest(string memory _title, uint256 _amount)
        public
        onlyFreelancer
        returns (bool)
    {
        Request memory request = Request({
            id: 1,
            title: _title,
            amount: _amount,
            locked: true,
            paid: false
        });
        requests.push(request);
        emit CreatedRequest(_title, _amount, true, false);
    }

    function getAllRequests() public view returns (Request[] memory) {
        return requests;
    }
    
    function unlockRequest(uint256 _index) public {
        Request storage request = requests[_index];
        require(request.locked, "Already unlocked");
        request.locked = false;
        emit RequestUnlocked(request.locked);
    }

    modifier onlyFreelancer() {
        require(
            msg.sender == freelancer,
            "Only Free Lancer can call this function"
        );
        _;
    }
    modifier onlyEmployer(){
        require(msg.sender==empolyer,"Only Employer can unlock this requrest");
        _;
    }
    // struct ProjectDetail {
    //     uint256 id;
    //     address consumer;
    //     string category;
    //     string desc;
    //     uint256 price;
    //     uint256 lastDate;
    // }
    // uint256 public numProjects;
    // mapping(uint256 => bool) public isComplete;
    // mapping(uint256 => ProjectDetail) public projects;

    // event AddProject(
    //     uint256 id,
    //     address consumer,
    //     string desc,
    //     uint256 price,
    //     uint256 lastDate
    // );

    // function listYourProject(
    //     string memory _desc,
    //     string memory _category,
    //     uint256 _price,
    //     uint256 _lastdate
    // ) public timeExceed(_lastdate) returns (bool) {
    //     numProjects++;
    //     projects[numProjects] = ProjectDetail(
    //         numProjects,
    //         msg.sender,
    //         _category,
    //         _desc,
    //         _price,
    //         _lastdate
    //     );
    // }

    // modifier timeExceed(uint256 x) {
    //     require(block.timestamp <= x);
    //     _;
    // }
}
