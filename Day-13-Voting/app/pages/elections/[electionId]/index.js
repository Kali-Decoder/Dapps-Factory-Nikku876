import React from 'react'
import SingleElectionRender from '../../../Components/SingleElectionRender';
import { elections } from '../../../dummyElection';
import {useRouter} from 'next/router';
const SingleElectionRoute = () => {
  const router= useRouter();
  const id= router.query.electionId;
  const item= elections.filter((it)=>it.id==id);
  return (
    <>
        <SingleElectionRender/>
    </>
  )
}

export default SingleElectionRoute