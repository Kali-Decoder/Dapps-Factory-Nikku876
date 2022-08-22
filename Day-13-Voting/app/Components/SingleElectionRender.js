import { Divider, Text } from "@chakra-ui/react";
import React from "react";
import { candidates } from "../candidates";
import CandidateCard from "./CandidateCard";
const SingleElectionRender = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-10 col-12 col-lg-10 col-sm-12 mx-auto candidates">
            <Text color="white" size="md" className="text-center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates quam ipsum incidunt eveniet repudiandae doloremque, hic
              veritatis quasi distinctio. Ipsam ab, similique maxime sed
              temporibus quasi officia velit maiores ad!
            </Text>
            <Divider variant="dashed" className="mt-3" />
            {candidates.map((candidate, i) => (
              <div className="col-md-4">
                <CandidateCard key={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleElectionRender;
