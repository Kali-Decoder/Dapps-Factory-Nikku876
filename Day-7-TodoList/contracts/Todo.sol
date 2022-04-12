// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.26;

contract Todo {
    uint256 public lastTaskId;

    function Todo() public {
        lastTaskId = 0;
    }

    struct Task {
        uint256 id;
        uint256 date;
        string  content;
        string  author;
        bool done;
    }
    uint256[] taskIds;

    mapping(uint256 => Task) tasks;

    event CreateTask(
        uint256 id,
        uint256 date,
        string content,
        string author,
        bool done
    );

    function createTodo(string memory _content, string memory _author) public {
        lastTaskId++;

        tasks[lastTaskId] = Task(lastTaskId, block.timestamp, _content, _author, false);
        taskIds.push(lastTaskId);
        emit CreateTask(lastTaskId, now, _content, _author, false);
    }

    function getTaskIds() public returns(uint256[] memory) {
        return taskIds;
    }

    function getTask(uint256 _id)
        public
        taskExists(_id)
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            bool
        )
    {
        return (
            _id,
            tasks[_id].date,
            tasks[_id].content,
            tasks[_id].author,
            tasks[_id].done
        );
    }


    // if task id =0 the function is revert 
    modifier taskExists(uint256 id) {
        if (tasks[id].id == 0) {
            revert();
        }
        _;
    }
}
