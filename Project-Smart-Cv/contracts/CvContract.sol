// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

library CVSections {
    struct Profile {
        string name;
        string title;
        string summary;
        string website;
        string phone;
        string email;
        string description;
    }

    struct Role {
        string company;
        string role;
        string startDate;
        string endDate;
        string summary;
        string highlights;
    }

    struct Education {
        string insitution;
        string link;
        int32 startYear;
        int32 endYear;
    }

    struct Project {
        string name;
        string link;
        string description;
    }

    struct Publication {
        string name;
        string link;
        string language;
    }

    struct Skill {
        string name;
        int32 level;
    }
}

contract CVContract {
    mapping(string => string) public Profile;
    address public owner;

    CVSections.Project[] public projects;
    CVSections.Education[] public educations;
    CVSections.Skill[] public skills;
    CVSections.Publication[] public publications;

    //==================
    //==== CONSTRUCTOR =
    //==================
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You r not owner");
        _;
    }

    //==================
    //==== ADD NEW PROFILE =
    //==================

    function setProfileData(string memory key, string memory value)
        public
        onlyOwner
    {
        Profile[key] = value;
    }

    function editProfileData(string memory key, string memory value)
        public
        onlyOwner
    {
        Profile[key] = value;
    }

    function editProject(
        bool operation,
        string memory name,
        string memory link,
        string memory description
    ) public onlyOwner {
        if (operation) {
            projects.push(CVSections.Project(name, link, description));
        } else {
            delete projects[projects.length - 1];
        }
    }

    function editEducation(
        bool operation,
        string memory insitution,
        string memory link,
        int32 startYear,
        int32 endYear
    ) public onlyOwner {
        if (operation) {
            educations.push(
                CVSections.Education(insitution, link, startYear, endYear)
            );
        } else {
            delete educations[educations.length - 1];
        }
    }

    function editSkill(
        bool operation,
        string memory name,
        int32 level
    ) public onlyOwner {
        if (operation) {
            skills.push(CVSections.Skill(name, level));
        } else {
            delete skills[skills.length - 1];
        }
    }

    function editPublication(
        bool operation,
        string memory name,
        string memory link,
        string memory language
    ) public onlyOwner {
        if (operation) {
            publications.push(CVSections.Publication(name, link, language));
        } else {
            delete publications[publications.length - 1];
        }
    }

    //==================
    //==== RETRIVING PROFILE DATA =
    //==================

    function getProfileData(string memory arg) public view returns(string memory){
        return Profile[arg];
    }


    //==================
    //==== Get Size Of Entries =
    //==================


    function getSize(string memory arg) public view returns(uint){

        if(keccak256(bytes(arg))==keccak256("projects")){return projects.length;}

        if(keccak256(bytes(arg))==keccak256("skills")){return skills.length;}

        if(keccak256(bytes(arg))==keccak256("educations")){return educations.length;}

        if(keccak256(bytes(arg))==keccak256("publications")){return publications.length;}

        revert();
    }

}
