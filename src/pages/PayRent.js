import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { TezosNodeWriter, TezosParameterFormat } from "conseiljs";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ButtonGroup from "@material-ui/core/ButtonGroup";
const tezosNode = "https://carthagenet.smartpy.io";

export default function PayRent() {
  const [houseAddress, setHouseAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [pkhKey, setPkhKey] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [rent, setRent] = useState(0);

  const submitForm = async (arg) => {
    console.log(houseAddress, privateKey, publicKey, pkhKey, deposit);
    const keystore = {
      publicKey: publicKey,
      privateKey: privateKey,
      publicKeyHash: pkhKey,
      seed: "",
      storeType: 1,
    };
    const contractAddress = "KT1MuMtaXpjnMYss8VCxEdUgY4nGRUfjbogt";
    let result;
    let amount = arg ? 0 : rent * 1000000;
    try {
      result = await TezosNodeWriter.sendContractInvocationOperation(
        tezosNode,
        keystore,
        contractAddress,
        amount,
        100000,
        "",
        1000,
        750000,
        undefined,
        `(Right (Left (Right "${houseAddress}")))`,
        TezosParameterFormat.Michelson
      );
    } catch (err) {
      alert("Transaction Unscuccesfull", err);
    }
    setHouseAddress("");
    setPkhKey("");
    setPrivateKey("");
    setPublicKey("");
    setDeposit(0);
    setRent(0);
    alert(`Injected operation group id ${result.operationGroupID}`);
    return result.operationGroupID;
  };

  const getPreviousRents = () => {
    console.log("Get Rent.");
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
        <TextField
          id="standard-basic"
          label="Private Key"
          className="text-field-key"
          onChange={(e) => setPrivateKey(e.target.value)}
          value={privateKey}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Public Key"
          className="text-field-key"
          onChange={(e) => setPublicKey(e.target.value)}
          value={publicKey}
        />
        <br />
        <TextField
          id="standard-basic"
          label="PKH"
          className="text-field-key"
          onChange={(e) => setPkhKey(e.target.value)}
          value={pkhKey}
        />
        <br />
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            onClick={() => submitForm(0)}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Pay Rent
          </Button>

          <Button
            onClick={() => getPreviousRents()}
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            Previous Payments
          </Button>
          <Button
            onClick={() => submitForm(1)}
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
