import React,{useState,useEffect} from 'react'
import Status from './Status'
import web3 from './web3';
import lottery from './lottery';
import Loader from './Loader';
const App = () => {
  const [owner,setOwner]= useState(undefined);
  const [currentAccount,setCurrentAccount]=useState();
  const [isLoading,setIsLoading]=useState(false);
  const [players,setPlayers]=useState([]);
  const [contestEnd,setContestEnd]=useState(false);
  const [balance,setBalance]=useState('');
  const [winner,setWinner]= useState();


  const getPlayers= async () =>{
      const players= await lottery.methods.returnArray().call();
      const bal =  await web3.eth.getBalance(lottery.options.address);
      // console.log(bal)
      setBalance(bal);
      setPlayers(players);
  }
  const getOwner=async ()=>{
    const owner= await lottery.methods.manager().call();
    setOwner(owner);
  }
  
  (async()=>{
      const acc= await web3.eth.getAccounts();
      setCurrentAccount(acc[0]);
  })();


  const getRegister=async ()=>{
    if(currentAccount){
      console.log("Hello world");
      setIsLoading(true);
      console.log("Loading...");
      const tx= await lottery.methods.enter().send({from:currentAccount,value:web3.utils.toWei('0.011','ether')});
      setIsLoading(false);
      console.log(tx);
      getPlayers();
      
    }else{
      console.log("No Meta MASK Is connected");
    }
  }

  const getWinner=async ()=>{
    try {
      setContestEnd(true);
      const win = await lottery.methods.pickWinner().send({ from: owner });
      console.log(win);
      setContestEnd(false);
      setWinner(win);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getPlayers();
    getOwner();
  },[]);

  useEffect(()=>{
    setCurrentAccount(currentAccount)
  },[currentAccount])
  return (
    <div className="container mb-5">
        <div className="row mt-4">
          <div className="col-md-10 col-8 col-xs-10 col-lg-10 mx-auto">
              <h3 className="text-left">
                Lottery Contract
              </h3>
              <p className="text-danger text-capitalize">
                Welcome To ethereum blockcahin Lottery System , <br /> <br />
                <span className="text-success"> <strong>Blockchain Hai, Sahi Hai...</strong></span>
              </p>
              <p className="text-primary text-capitalize">
                this contract is managed by <span className="text-danger">{owner ? owner:<Loader/>}</span> <br /> there are currently <span className="text-danger">{players.length}</span> people entered competiting to earn <span className="text-danger">{web3.utils.fromWei(balance,'ether')}</span> ethers 
              </p>
              <h5>
                Want To Try Your Luck ???
              </h5>
                <br />
              {currentAccount ? <h6>
                Presently <span className="text-danger">{currentAccount}</span> This Account is connected 👷
              </h6>:<h6>
                No Account Is Connected <Loader/>
              </h6>}

              <br />
              <div className="col-md-8 col-8 mx-auto">
                {isLoading ? <Loader/> : null}
              </div>
              <div className="col-md-8 col-8 mx-auto">
                {contestEnd ? <Loader/> : null}
              </div>
              {currentAccount ? <div className="d-flex text-capitalize justify-content-around">
                <h6 className="text-left mt-2">Entry fees for lottery system</h6>
                <input type="text" placeholder='0.01 Ether' disabled/>
                <button className="button" onClick={getRegister} >Register Myself</button>
              </div>:null}

              
              {currentAccount == owner ? <div className="text-capitalize mt-5">
                <h6 className="text-left mt-2">Time to pick a winner</h6>
                <button className="button" onClick={getWinner} >Pick Winner</button>
              </div>:null }
              
              {contestEnd ?<Status value={winner} />:null}

          </div>
        </div>
    </div>
  )
}

export default App