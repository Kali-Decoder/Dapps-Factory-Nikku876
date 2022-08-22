const CVContract = artifacts.require("CVContract");
let cvContract;
let admin;

contract('CV Contract Testing...',async (accounts)=>{
    beforeEach(async ()=>{
        cvContract= await CVContract.deployed();
        admin= await cvContract.owner();
    });

    it('Admin',()=>{
        assert.equal(accounts[0],admin);
    });
    it('user should set profile data ',async ()=>{
        await cvContract.setProfileData("nikku","Nikku.png");
        let x= await cvContract.Profile("nikku");
        assert.equal(x,"Nikku.png");
    });

    it('should change profile',async ()=>{
        await cvContract.editProfileData("nikku","Yashu.png");
        let x= await cvContract.Profile("nikku");
        assert.equal(x,"Yashu.png");
    })
    it('Should edit project',async ()=>{
        await cvContract.editProject(true,"Project 1","Link 1","Description 1");
        let x= await cvContract.projects(0);
        assert.equal(x.name,"Project 1");
    });
    it('Should delete last project',async()=>{
        await cvContract.editProject(false,"Project 1","Link 1","Description 1");
        let x= await cvContract.projects(0);
        assert.equal(x.name,"");
    })

    it('should edit education section',async ()=>{
        await cvContract.editEducation(true,"Institution","Link",2001,2020);
        let x= await cvContract.educations(0);
        assert.equal(x.insitution,"Institution");
    })

    it('should delete last  education section',async ()=>{
        await cvContract.editEducation(false,"Institution","Link",2001,2020);
        let x= await cvContract.educations(0);
        assert.equal(x.insitution,"");
    })

    it('should edit Skill section',async ()=>{
        await cvContract.editSkill(true,"Javascript",9);
        let x= await cvContract.skills(0);
        assert.equal(x.name,"Javascript");
    })

    it('should delete last  Skill section',async ()=>{
        await cvContract.editSkill(false,"Javascript",9);
        let x= await cvContract.skills(0);
        assert.equal(x.name,"");
    })

    it('should edit publication section',async ()=>{
        await cvContract.editPublication(true,"Neeraj publication","link publication","C++");
        let x= await cvContract.publications(0);
        assert.equal(x.name,"Neeraj publication");
    })
    it('should delete last publication section',async ()=>{
        await cvContract.editPublication(false,"Neeraj publication","link publication","C++");
        let x= await cvContract.publications(0);
        assert.equal(x.name,"");
    })
    it('should give profile data ',async ()=>{
        let x = await cvContract.getProfileData("nikku");
        assert.equal(x,"Yashu.png");
    });
    it('Should give size of any sections',async ()=>{
        let x= await cvContract.getSize("publications");
        x= x.toNumber();
        assert.equal(x,1);
    })
    
})