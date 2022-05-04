// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract ResourcePlatform{
    address  public admin;
    uint public basePrice= 100 wei;
    uint public numCourse;

    struct Course{
        uint id;
        address owner;
        uint timesSold;
        uint likes;
        uint price;
        uint category;
        string desc;
        string name;
        string url;
        string picUrl;
        string instructor;
        
        bool sold ;

    }
    mapping(uint => Course) public courses;
    mapping(address=>Course) public students;
    constructor(){
        admin=msg.sender;
    }
    function addCourse(address _owner,string memory _name,string memory _desc,uint _category,string memory _url,string memory _picUrl,string memory _instructor,uint _price, bool _isSold) public onlyAdmin returns(bool){
        numCourse++;
        courses[numCourse]=Course(numCourse,_owner,0,0,_price,_category,_desc,_name,_url,_picUrl,_instructor,_isSold);
        return true;
    }

    function _gstPrice(uint _timeSold,uint likes) view  private returns(uint){
        return basePrice*_timeSold + likes;
    }

    function purchaseCourse(uint id) public payable courseExist(id) returns(bool){
        Course storage course= courses[id];
        
        uint gst = _gstPrice(course.timesSold,course.likes);
        require(gst<course.price,"Price is not sufficient");
        require(course.price==msg.value,"Price is not sufficient to buy");
        uint x= msg.value-gst;
        payable(admin).transfer(gst);
        payable(course.owner).transfer(x);


    }

    function getSingleCourse(uint id) view public courseExist(id) returns(Course memory){
        return courses[id];
    }   

    function getAllCourses() view public returns(Course[] memory){
        Course[] memory id= new Course[](numCourse);
        for(uint i=1;i<=numCourse;i++){
            Course storage course= courses[i];
            id[i]=course;
        }
        return id;


    }
    function getCategoryCourse(uint _category) view public returns(Course[] memory){
        uint count;
        for(uint i=1;i<=numCourse;i++){
            Course storage course= courses[i];
            if(course.category==_category){
                count++;
            }
        }
        Course[] memory id= new Course[](count);
        for(uint i=1;i<=numCourse;i++){
            Course storage course= courses[i];
            if(course.category==_category){
                id[i]=course;
            }
        }
        return id;
    }

    function likeMe(uint id) public  courseExist(id) returns(bool){
        courses[id].likes++;
        return true;
    }
    modifier courseExist(uint id){
        require(id>0 && id<=numCourse,"Course is Not Exist");
        _;
    }
    modifier onlyAdmin(){
        require(admin==msg.sender,"You r not admin");
        _;
    }

}