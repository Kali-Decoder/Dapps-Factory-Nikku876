import React,{useState,useEffect} from 'react'
import Navbar from '../../../../components/Navbar'
import web3 from "../../../../../ethereum/web3";
import {useRouter} from 'next/router'
import campaignDeploy from "../../../../../ethereum/campaign";
import Loader from "../../../../components/Loader";
const CreateRequest = () => {
    const router= useRouter();
    const createId= router.query.createId;
    const [isLoading,setIsLoading]=useState(false);
    const [formData,setFormData]=useState({
        description:"",
        amount:"",
        recipient:"",
    });

    const onchanging=(e)=>{
        let name= e.target.name;
        let value=e.target.value;
        setFormData({...formData,[name]:value})
    }
    const handleClick=async (e)=>{
        e.preventDefault();
        console.log(formData);
        try {
            const campaign = await campaignDeploy(createId);
            const accounts= await web3.eth.getAccounts();
            setIsLoading(true);
            const createTxn= await campaign.methods.createRequest(formData.description,formData.amount,formData.recipient).send({from:accounts[0],gas:'1000000'});
            console.log(createTxn);
            setIsLoading(false);
            router.push(`/campaigns/requests/${createId}`);

        } catch (error) {
            console.log(error);
        }

    }
  return (
    <>
        <Navbar/>
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-6 col-10 col-xs-6 col-sm-6 col-lg-6 mx-auto">
                    <form action="">
                        <input type="text" placeholder='Description' name='description' className="form-control mt-3" onChange={onchanging} />
                        <input type="text" placeholder='Amount (in Wei)' name='amount' className="form-control mt-3" onChange={onchanging} />
                        <input type="text" placeholder='Recipient Address' name='recipient' className="form-control mt-3" onChange={onchanging} />
                        <button className="button mt-3" onClick={handleClick}>
                            {isLoading  ? <Loader/> :"Create Request" }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default CreateRequest