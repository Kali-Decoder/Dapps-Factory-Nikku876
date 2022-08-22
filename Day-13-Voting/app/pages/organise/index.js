import React from "react";
import { FormControl, Badge, Input, Textarea, Button } from "@chakra-ui/react";
const RegisterForElection = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-10 col-10 col-xs-10 mx-auto d-flex justify-content-center">
          <FormControl>
            <Badge colorScheme="green" className="mb-2">Heading of Election</Badge>
            <Input id="text" type="text" variant="outline" color='whatsapp.100' />

            <Badge colorScheme="green" className="mt-3 mb-2">
              Description of Election
            </Badge>
            <Textarea
              placeholder="Here is a sample placeholder"
              variant="outline"
              color='white'
            />
            <Button className="mt-2" colorScheme='cyan'>Go Polling</Button>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default RegisterForElection;
