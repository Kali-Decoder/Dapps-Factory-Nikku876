
const SimpleStorage= artifacts.require('SimpleStorage');

contract('SimpleStorage',()=>{
    let simpleStorage=null;
    before(async()=>{
        simpleStorage= await SimpleStorage.deployed();
      
    })
    //jitne functions honge utne hi test its honge un sb functions ko test krna hai ....
    it('Should Add an integer in array  ',async()=>{

        //deplyed contract first
       
        //then call setdata with arguement this

        await simpleStorage.add(3);
        //then checking get data is equal to set value and if eqault the test passs
        const result= await simpleStorage.ids(0);
        assert(result.toNumber()===3);
    });

    it('Should Get An element from array  ',async()=>{

        //deplyed contract first
       
        //then call setdata with arguement this
        await simpleStorage.add(20);
        var get=await simpleStorage.getData(1);
        //then checking get data is equal to set value and if eqault the test passs
        assert(get.toNumber()===20);
    });

    it('Should Get All elements from array  ',async()=>{

        //deplyed contract first
       
        //then call setdata with arguement this
       const Ids= await simpleStorage.getAll();
        let ids= Ids.map((id)=>{
            return id.toNumber();
        });
       
        //then checking get data is equal to set value and if eqault the test passs
        assert.deepEqual(ids,[3,20]);
    });

    it('Should Get All elements from array  ',async()=>{

        //deplyed contract first
       
        //then call setdata with arguement this
        const length= await simpleStorage.getLength();
       
        //then checking get data is equal to set value and if eqault the test passs
        assert(length.toNumber()===2);
    });
})