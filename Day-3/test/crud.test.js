const Crud = artifacts.require('Crud');
contract('Crud',()=>{
    let crud=null;
    before(async()=>{
        crud= await  Crud.deployed();
    })
    // it('Should create a new user', async () => {
    //     await crud.create('Frank');
    //     const user = await crud.read(1);
    //     assert(user[0].toNumber() === 1);
    //     assert(user[1] === 'Frank');
    //   });
    
    //   it('Should update an existing user', async () => {
    //     await crud.update(1, 'Frankk');
    //     const user = await crud.read(1);
    //     assert(user[0].toNumber() === 1);
    //     assert(user[1] === 'Frankk');
    //   });
    
    //   it('Should NOT update a non-existing user', async () => {
    //     try {
    //       await crud.update(2, 'Frankk');
    //     } catch(e) {
    //       assert(('User does not exist'));
    //       return;
    //     }
    //     assert(false);
    //   });
    
    //   it('Should destroy an existing user', async () => {
    //     await crud.deleteUser(1);
    //     try {
    //       const user = await crud.read(1);
    //     } catch(e) {
    //       assert(('User does not exist!'));
    //       return;
    //     }
    //     assert(false);
    //   });
    
    //   it('Should NOT destroy a non-existing user', async () => {
    //     try {
    //       await crud.deleteUser(10);
    //     } catch(e) {
    //       assert(('User does not exist'));
    //       return;
    //     }
    //     assert(false);
    //   });
    it('Should create Crud value  ',async()=>{
        await crud.create('Neeraj Choubisa'); 
        const user = await crud.read(1);
        assert(user[0].toNumber()==1);
        assert(user[1]=='Neeraj Choubisa');

    });
    it('Should Read User value  ',async()=>{
        const user=await crud.read(1); 
        assert(user[0].toNumber()==1);
        assert(user[1]=='Neeraj Choubisa');

    });
    it('Should Not Read non user  ',async()=>{
        try {
            await crud.read(10); 
        } catch (e) {
            assert(("User Does Not Exist !!!"));
            return;
        }   
        assert(false); 

    });
    it('Should Update User value  ',async()=>{
        await crud.update(1,"Yashu Choubisa"); 
        const user= await crud.read(1);
        assert(user[0].toNumber()==1);
        assert(user[1]=='Yashu Choubisa');

    });
    it("Should not update an undefined user",async()=>{
        try {
            await crud.update(2,"Yashu Choubisa");
        } catch (e) {
                assert(("User Does Not Exist !!!"))
                return;
        }
        assert(false);
    })

    it('Should Delete  User value  ',async()=>{
        await crud.deleteUser(1); 
        try {
            await crud.read(1);
        } catch (e) {
            assert(("User Does Not Exist !!!"));
            return;
        }
        assert(false);
        

    });
    it("Should not destroy user ",async()=>{
        try {
            await crud.deleteUser(2);
        } catch (e) {
            assert(("User Does Not Exist !!!"))
            return;
        }
        assert(false);
    })
})