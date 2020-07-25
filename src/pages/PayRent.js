import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { contractAddress } from "../constants/contract";
import getThanos from "../util/thanos";

export default function PayRent(props) {
  const [houseAddress, setHouseAddress] = useState("");
  const [rent, setRent] = useState(0);
  const [instance, setInstance] = useState("");

  useEffect(() => {
    getInstance();
  }, [props]);

  const getInstance = async () => {
    const tezos = await getThanos();
    const instance = await tezos.wallet.at(contractAddress);
    setInstance(instance);
  };

  const payRent = async () => {
    const operation = await instance.methods
      .payRent(houseAddress)
      .send({ amount: rent * 1000000 });
    await operation.confirmation();
    setHouseAddress("");
    alert(`Injected operation group id ${operation.operationGroupID}`);
  };

  const markDispute = async () => {
    const operation = await instance.methods
      .markDispute(houseAddress)
      .send({ amount: rent * 1000000 });
    await operation.confirmation();
    setHouseAddress("");
    alert(`Injected operation group id ${operation.operationGroupID}`);
  };

  return (
    <div className="center">
      <Typography variant="h4" component="h2">
        Pay Rent
      </Typography>
      <div className="form-container">
        <TextField
          id="standard-basic"
          label="Enter House Address / Name"
          className="text-field-key"
          onChange={(e) => setHouseAddress(e.target.value)}
          value={houseAddress}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Rent Amount"
          className="text-field-key"
          onChange={(e) => setRent(e.target.value)}
          value={rent}
        />
        <br />
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            onClick={() => payRent()}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Pay Rent
          </Button>
          <Button
            onClick={() => markDispute(1)}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Mark Dispute
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
