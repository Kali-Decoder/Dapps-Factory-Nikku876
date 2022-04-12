// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract EventContract {
    struct Event {
        uint256 id;
        address admin;
        string name;
        string uri;
        uint256 phone;
        uint256 price;
        uint256 availaibleTickets;
        uint256 totalTickets;
        uint256 soldTickets;
        uint256 date;
    }

    mapping(uint256 => Event) public events;
    mapping(address => mapping(uint256 => uint256)) public viewrs; // viewr ka address mapped with showid and number of tickets that person have for that show

    uint256 public eventId;

    function createEvent(
        string calldata name,
        string calldata uri,
        uint256 phone,
        uint256 price,
        uint256 totalTickets,
        uint256 date // time that event is being continued
    ) external {
        require(
            totalTickets > 0,
            "Tickets Are Not Enough Please Increase Ticket Size"
        );
        events[eventId] = Event(
            eventId,
            msg.sender,
            name,
            uri,
            phone,
            price,
            totalTickets,
            totalTickets,
            0,
            date
        );
        eventId++;
    }

    function buyTicket(uint256 id, uint256 noOfTickets)
        external
        payable
        eventExist(id)
        eventExpire(id)
    {
        Event storage newEvent = events[id];

        require(
            msg.value == newEvent.price * noOfTickets,
            "Total price is not accomplished"
        );
        require(newEvent.availaibleTickets >= noOfTickets, "No Available Tickets ");
        viewrs[msg.sender][id] += noOfTickets;
        uint256 totalValue = newEvent.price * noOfTickets;
        payable(newEvent.admin).transfer(totalValue);
        newEvent.soldTickets += noOfTickets;
        newEvent.availaibleTickets -= noOfTickets;
    }

    function transferTickets(
        uint256 eventid,
        uint256 numberOfTickets,
        address to
    ) external eventExist(eventid) eventExpire(eventid) {
        require(
            viewrs[msg.sender][eventid] >= numberOfTickets,
            "You Have Not Enough Tickets"
        );
        viewrs[to][eventid] += numberOfTickets;
        viewrs[msg.sender][eventid] -= numberOfTickets;
    }

    modifier eventExist(uint256 id) {
        require(events[id].date != 0, "Event is Not exist");
        _;
    }
    modifier eventExpire(uint256 id) {
        require(events[id].date > block.timestamp, "Event is Finished ");
        _;
    }
}
