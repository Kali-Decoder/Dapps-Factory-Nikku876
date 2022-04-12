// SPDX-License-Identifier: MIT
pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;
contract Tweeter{
    struct Tweet{
        uint id;
        address author;
        string description;
        uint date;
    }
    mapping(uint=>Tweet) private tweets;
    mapping(address=>uint[]) private tweetsOf;
    mapping(uint=>Message[]) private conversations;
    mapping(address=>address[]) private following;
    // mapping(address=>mapping(address=>bool)) private operators;
    uint private nextTweet;
    uint private nextMessageId;

    struct Message{
        uint id;
        string message;
        address from ;
        address to;
        uint date;
    }
    
    //Events 
    event TweetSent(uint id,
        address indexed author,
        string description,
        uint date);
    event MessageSent(uint id,
        string message,
        address indexed from ,
        address indexed to,
        uint date);
    // Fuctions 
    function createTweet(string calldata _content) external {
        tweets[nextTweet]=Tweet(nextTweet,msg.sender,_content,block.timestamp);
        tweetsOf[msg.sender].push(nextTweet);
        emit TweetSent(nextTweet,msg.sender,_content,block.timestamp);
        nextTweet++;
    }


    function textMessage(string calldata _message,address _from ,address _to) external {
        uint conversationId= uint(_from) + uint(_to);
        conversations[conversationId].push(Message(nextMessageId,_message,_from,_to,block.timestamp));
        emit MessageSent(nextMessageId,_message,_from,_to,block.timestamp);
        nextMessageId ++;
    }

    function follow(address _followed) external {
        following[msg.sender].push(_followed);
    }

    function getListTweets() view external returns(Tweet[] memory){
        // require(count<=nextTweet && count>0,"No Latest tweets");
        Tweet[] memory _tweets= new Tweet[](nextTweet);

        for(uint i=0;i<nextTweet;i++){
            Tweet storage _tweet = tweets[i];
            _tweets[i]= Tweet(_tweet.id,_tweet.author,_tweet.description,_tweet.date);
        }

        
        return _tweets;
         
    }

    function getTweetsOf() view external returns(Tweet[] memory){
        uint[] storage tweetIds= tweetsOf[msg.sender];
        Tweet[] memory _tweets= new Tweet[](tweetIds.length); 

        for(uint i=0;i<tweetIds.length;i++){
            Tweet storage _tweet = tweets[tweetIds[i]];
            _tweets[i]= Tweet(_tweet.id,_tweet.author,_tweet.description,_tweet.date);
        }


        return _tweets;

    }

   
}