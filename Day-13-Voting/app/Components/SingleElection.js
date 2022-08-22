import React from "react";
import Link from "next/link";

import { Badge, Button, Text } from "@chakra-ui/react";
const SingleElection = ({ item }) => {
  return (
    <>
      <div className="col-md-3 col-6 col-lg-3 mx-auto mx-2 mt-2">
        <div className="card p-1">
          <div className="card-body" style={{ cursor: "pointer" }}>
            <Badge colorScheme="green">{item.address}</Badge> <br />
            <Badge colorScheme="purple">{item.name}</Badge>
            <div className="text-center">
              <Link href={`/elections/${item.id}`}>
                <a>
                  <Button colorScheme="telegram" className="mt-4" size="sm">
                    Take Part
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleElection;
