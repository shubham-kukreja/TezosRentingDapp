import React, { useState } from "react";
import Axios from "axios";
import { Button, TextField, Typography } from "@material-ui/core";
import {
  TezosNodeWriter,
  TezosParameterFormat,
  TezosNodeReader,
} from "conseiljs";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const tezosNode = "https://carthagenet.smartpy.io";
async function getContractStorage() {
  const result = await TezosNodeReader.getContractStorage(
    "https://carthagenet.smartpy.io",
    "KT1MuMtaXpjnMYss8VCxEdUgY4nGRUfjbogt"
  );
  console.log(result);
}

export default function RentIn() {
  const [houseAddress, setHouseAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [pkhKey, setPkhKey] = useState("");
  const [deposit, setDeposit] = useState(0);

  const submitForm = async () => {
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
    try {
      result = await TezosNodeWriter.sendContractInvocationOperation(
        tezosNode,
        keystore,
        contractAddress,
        deposit * 1000000,
        100000,
        "",
        1000,
        750000,
        undefined,
        `(Left (Left "${houseAddress}"))`,
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
    alert(`Injected operation group id ${result.operationGroupID}`);
    return result.operationGroupID;
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
        <TextField
          id="standard-basic"
          label="Deposit Amount"
          className="text-field-key"
          onChange={(e) => setDeposit(e.target.value)}
          value={deposit}
        />
        <br />
        <Button
          onClick={() => submitForm()}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Accept & Pay Deposit
        </Button>
        <Button onClick={() => getContractStorage()}>Get Storage</Button>
      </div>
    </div>
  );
}
