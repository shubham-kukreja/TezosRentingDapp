import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import getThanos from "../util/thanos";
import { contractAddress } from "../constants/contract";

export default function EndContract(props) {
  const [houseAddress, setHouseAddress] = useState("");
  const [instance, setInstance] = useState("");

  useEffect(() => {
    getInstance();
  }, [props]);

  const getInstance = async () => {
    const tezos = await getThanos();
    const instance = await tezos.wallet.at(contractAddress);
    setInstance(instance);
  };

  const endAgreement = async () => {
    const operation = await instance.methods.endContract(houseAddress).send();
    await operation.confirmation();
    setHouseAddress("");
    alert(`Injected operation group id ${operation.operationGroupID}`);
  };

  return (
    <div className="center">
      <Typography variant="h4" component="h2">
        End Contract
      </Typography>
      <div className="form-container">
        <TextField
          id="standard-basic"
          label="Enter House Address / Name"
          className="text-field-key"
          onChange={(e) => setHouseAddress(e.target.value)}
          value={houseAddress}
        />
        <Button
          onClick={() => endAgreement()}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          End Contract
        </Button>
      </div>
    </div>
  );
}
