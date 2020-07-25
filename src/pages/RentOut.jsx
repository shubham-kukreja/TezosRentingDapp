import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import getThanos from "../util/thanos";
import { contractAddress } from "../constants/contract";

export default function RentOut(props) {
  const [houseAddress, setHouseAddress] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [rent, setRent] = useState(0);
  const [instance, setInstance] = useState("");

  useEffect(() => {
    getInstance();
  }, [props]);

  const getInstance = async () => {
    const tezos = await getThanos();
    const instance = await tezos.wallet.at(contractAddress);
    setInstance(instance);
    console.log(instance);
  };

  const addProperty = async () => {
    const operation = await instance.methods
      .addProperty(deposit, houseAddress, rent)
      .send();
    await operation.confirmation();
    setHouseAddress("");
    setDeposit(0);
    setRent(0);
  };

  const updateProperty = async () => {
    const operation = await instance.methods
      .updatePropertyRequest(houseAddress, rent)
      .send();
    await operation.confirmation();
    setHouseAddress("");
    setDeposit(0);
    setRent(0);
  };

  return (
    <div className="center">
      <Typography variant="h4" component="h2">
        Add / Update Property
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
          label="Deposit Amount"
          className="text-field-key"
          onChange={(e) => setDeposit(e.target.value)}
          value={deposit}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Rent Per Month"
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
            onClick={() => addProperty()}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Add Property
          </Button>
          <Button
            onClick={() => updateProperty()}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Update Property
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
