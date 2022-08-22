// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Election {
    string public electionName;
    string public electionDesc;
    address public electionAuthority;
    bool public status;

    constructor(
        address _auth,
        string memory _name,
        string memory _desc
    ) {
        electionAuthority = _auth;
        electionName = _name;
        electionDesc = _desc;
        status = true;
    }

    uint256 public candidateID;
    uint256 public numVoters;
    struct Candidate {
        uint256 id;
        string name;
        string symbol;
        string picUrl;
        string email;
        uint256 vote;
    }
    mapping(uint256 => Candidate) public candidates;

    struct Voter {
        string email;
        uint256 whomVote;
        bool isVoted;
    }
    mapping(address => Voter) public voters;

    function addCandidate(
        string calldata _name,
        string calldata _symbol,
        string calldata _pic,
        string calldata _email
    ) public isAuthorised isElectionGoingOn returns (bool) {
        candidateID++;
        candidates[candidateID] = Candidate(
            candidateID,
            _name,
            _symbol,
            _pic,
            _email,
            0
        );
        return true;
    }

    function vote(uint256 _id, string calldata _email)
        public
        doubleVote
        isElectionGoingOn
        returns (bool)
    {
        Candidate memory _candidate = candidates[_id];
        // require(_candidate.name!=="","'error':'Candidate is not present'");
        _candidate.vote++;
        voters[msg.sender] = Voter(_email, _id, true);
        numVoters++;
        return true;
    }

    function getNumberVoters() public view returns (uint256) {
        return numVoters;
    }

    function getNumberCandidates() public view returns (uint256) {
        return candidateID;
    }

    function getCandidateDetail(uint256 _candidateId)
        public
        view
        returns (Candidate memory)
    {
        return candidates[_candidateId];
    }

    function getElectionDetail()
        public
        view
        returns (
            string memory,
            string memory,
            address,
            bool
        )
    {
        return (electionName, electionDesc, electionAuthority, status);
    }

    function getWinner()
        public
        isAuthorised
        isElectionGoingOn
        returns (Candidate memory)
    {
        uint256 largestVote = 0;
        uint256 id;
        for (uint256 i = 1; i <= candidateID; i++) {
            Candidate memory _Candidate = candidates[i];
            if (largestVote <= _Candidate.vote) {
                largestVote = _Candidate.vote;
                id = _Candidate.id;
            }
        }
        Candidate memory _Candidate = candidates[id];
        status = false;
        return _Candidate;
    }

    modifier isAuthorised() {
        require(
            electionAuthority == msg.sender,
            "'error':'You are not authorised'"
        );
        _;
    }
    modifier doubleVote() {
        Voter memory _voter = voters[msg.sender];
        require(
            _voter.isVoted == false,
            "'error':'Double vote is not Allowed'"
        );
        _;
    }
    modifier isElectionGoingOn() {
        require(status == true, "Election is Closed");
        _;
    }
    /**
    Task1:
    Add Candidate to election
    Task 2:
    Add Voter to list
    Task 3:
    Voted function 
    Task 4:
    get Detail Candidate 
    Task 5:
    get Detail of Voter 
    Task 6:
    Result Function 
    Task 7:
    Get detail of election
     */
}
