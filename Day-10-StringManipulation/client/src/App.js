import React,{useState,useEffect} from 'react'
import String from './build/contracts/String.json';
import { getWeb3 } from './utils';
const App = () => {
  
  const [formData,setFormData]=useState({
    lengthString:'',
    string1:'',
    string2:'',
    reverseString:''
  });

  const [resultData,setResultData]=useState({
      lengthResult:0,
      concatResult:'',
      reverseResult:'',
      concatLength:0,
  });
  const [web3,setWeb3]=useState(null);

  const onchange=(e,name)=>{
    let value=e.target.value;
    setFormData({...formData,[name]:value});
  }
  const [contractString,setContractString]=useState(undefined);

  const getLength=async(e)=>{
    e.preventDefault();
    
    try {
      let len= await contractString.methods.toGetLength(formData.lengthString).call();
      setResultData({...resultData,lengthResult:len})
      // console.log(len);
    } catch (error) {
      console.log(error)
    }
  }

  const getReverseString =async (e)=>{
    e.preventDefault();
    try {
        let str= await contractString.methods.reverseString(formData.reverseString).call();
        // str= str.replace(/\0.*$/g,'');
        setResultData({...resultData,reverseResult:str})
    } catch (error) {
      console.log(error);
    }
  }

  const getConcatString=async (e)=>{
    e.preventDefault();
    try {
      let str= await contractString.methods.concatenationString(formData.string1,formData.string2).call();
      
      setResultData({...resultData,concatLength:str[1],concatResult:str[0]});
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    const init=async ()=>{
      const web3=await getWeb3();
      const accounts = await web3.eth.getAccounts();
      
      const networkId = await web3.eth.net.getId();
      

      const deployedNetwork = String.networks['5777'];
      
      const contract = new web3.eth.Contract(
        String.abi,
        deployedNetwork && deployedNetwork.address,
      );
     
      setWeb3(web3);
      setContractString(contract);
    }
    init();
  },[]);

  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <div className="row mt-3">
            <div className="col-md-10 col-10 c0l-xs-10 col-lg-10 mx-auto">
                <h2 className="text-center">String Decentralise</h2>
            </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-10 mx-auto">
              <input type="text" placeholder='Enter String ' onChange={(e)=>onchange(e,e.target.name)} value={formData.lengthString} className='form-control' name='lengthString'  />
              <button className="btn-sm btn-primary mt-2" onClick={getLength}>Get Length</button>
              <br />
              <code className='text-success mt-5'>{resultData.lengthResult ? resultData.lengthResult :'Loading...'}</code>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-10 mx-auto">
              <input type="text" placeholder='Enter String 1 ' onChange={(e)=>onchange(e,e.target.name)} value={formData.string1} className='form-control mt-1' name='string1' />
              <input type="text" placeholder='Enter String 2 ' onChange={(e)=>onchange(e,e.target.name)} value={formData.string2} className='form-control mt-1' name='string2' />
              <button className="btn-sm btn-primary mt-2" onClick={getConcatString}>Get Concatenation</button>
              <br />
              <code className='text-success mt-5'>{resultData.concatResult && resultData.concatLength ? `${formData.string1} + ${formData.string2} = ${resultData.concatResult} (Length ${resultData.concatLength})` :'Loading...'}</code>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-10 mx-auto">
              <input type="text" placeholder='Enter String For Reverse ' onChange={(e)=>onchange(e,e.target.name)} value={formData.reverseString} className='form-control mt-1' name='reverseString' />
              <button onClick={getReverseString} className="btn-sm btn-primary mt-2 ">Get Reverse</button>
              <br />
              <code className='text-success mt-5'>{resultData.reverseResult ? resultData.reverseResult :'Loading...'}</code>
          </div>
        </div>
      </div>
    </>
  )
}

export default App