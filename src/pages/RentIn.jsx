import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import getThanos from "../util/thanos";
import { contractAddress } from "../constants/contract";

export default function RentIn(props) {
  const [houseAddress, setHouseAddress] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [instance, setInstance] = useState("");

  useEffect(() => {
    getInstance();
  }, [props]);

  const getInstance = async () => {
    const tezos = await getThanos();
    const instance = await tezos.wallet.at(contractAddress);
    setInstance(instance);
  };

  const acceptAgreement = async () => {
    const operation = await instance.methods
      .acceptAgreement(houseAddress)
      .send({ amount: deposit * 1000000 });
    await operation.confirmation();
    setHouseAddress("");
    setDeposit(0);
    alert(`Injected operation group id ${operation.operationGroupID}`);
  };

  return (
    <div className="center">
      <Typography variant="h4" component="h2">
        Accept Agreement
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
        <Button
          onClick={() => acceptAgreement()}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Accept & Pay Deposit
        </Button>
      </div>
    </div>
  );
}
