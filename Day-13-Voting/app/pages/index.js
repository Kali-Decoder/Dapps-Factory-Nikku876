import { Button, Heading } from "@chakra-ui/react";
import React,{useState} from 'react';
import getDeployedElection from '../utils/addElection';
export default function Home() {
  const main = async()=>{
    await createElection("neerajchoubisa876@gmail.com","Neeraj choubisa","Polling for student of the year");
    // console.log(data);
  }

  const getElectionData= async ()=>{
    let data = await getDeployedElection("neerajchoubisa876@gmail.com");
    
    console.log(data);
  }
  
  return (
    <>

        <div className="container homePage">
          <div className="row mt-5">
            <div className="col-12 col-md-12 mx-auto">
              <Heading size='lg' fontSize='150px' >WEB3-DWP</Heading>
              <Button onClick={main}>Add Election</Button>
              <Button onClick={getElectionData}>Get Election</Button>
            </div>

          </div>
        </div>
      
    </>
  );
}
