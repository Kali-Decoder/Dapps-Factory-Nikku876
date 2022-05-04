const Resources= artifacts.require("ResourcePlatform");
let admin;
let contractObject;
contract('Testing smart contract',(accounts)=>{
    beforeEach(async()=>{
        contractObject= await Resources.deployed();
        // console.log(contractObject.address);
        admin = await contractObject.admin();   
    });

    it('Should deploy by admin',async ()=>{
        
        assert.equal(admin,accounts[0]);
    });
    // address _owner,string memory _name,string memory _desc,uint _category,string memory _url,string memory _picUrl,string memory _instructor,uint _price, bool _isSold
    it('Admin Should add resource to blockchain ',async ()=>{
        let [owner,name,desc,category,url,picUrl,instructor,price,isSold]=[accounts[2],"Dapp Building","Decentralised Application in a very easy way ",1,"","","Neeraj Choubisa","10000",true];

        await contractObject.addCourse(owner,name,desc,category,url,picUrl,instructor,price,isSold,{from:accounts[0],gas:'1000000'});

        await contractObject.addCourse(accounts[3],"yASHU Choubisa",desc,2,url,picUrl,instructor,price,isSold,{from:accounts[0],gas:'1000000'});

        await contractObject.addCourse(accounts[4],"Karan Choubisa",desc,3,url,picUrl,instructor,price,isSold,{from:accounts[0],gas:'1000000'});

        await contractObject.addCourse(accounts[8],"Pooja Choubisa",desc,3,url,picUrl,instructor,price,isSold,{from:accounts[0],gas:'1000000'});
        
        const x= await contractObject.numCourse();

        assert.equal(x,4);

    });

    it('We get single course from the blockchain',async()=>{
        let id =2;
        let x= await contractObject.getSingleCourse(id);
        // console.log(x.name);
        assert.equal(x.name,"yASHU Choubisa")
    });

    it('Should give all courses ',async()=>{
        let x= await contractObject.getAllCourses();
        console.log(typeof x);
    })
})
