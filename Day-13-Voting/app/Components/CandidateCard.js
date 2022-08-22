import React from "react";
import { Image } from "@chakra-ui/react";
const CandidateCard = () => {
  return (
    <div className="card">
      <div className="text-center">
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
      </div>
      <div className="card-body p-2">
        
      </div>
    </div>
  );
};

export default CandidateCard;
