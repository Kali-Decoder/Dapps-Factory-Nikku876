import React, { useContext } from "react";
import { DAOContest } from "./context/DAOContext";

const ListProposal = ({item}) => {
  return (
    <>
      <li class="list-group-item">
        Name:- {item.name} <br />
        Amount:- {item.amount} <br />
        To Address:- {item.to} <br />
        Votes:- {item.votes} <br /> 
        End Time:- {item.end} <br />
        Executed Or/Not :-  {item.executed} 
      </li>
      
    </>
  );
};

export default ListProposal;
