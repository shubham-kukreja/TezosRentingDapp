import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { TezosNodeWriter, TezosParameterFormat } from "conseiljs";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
const tezosNode = "https://carthagenet.smartpy.io";

export default function EndContract() {
  const [houseAddress, setHouseAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [pkhKey, setPkhKey] = useState("");
  const [deposit, setDeposit] = useState(0);
  const [rent, setRent] = useState(0);

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
        0,
        100000,
        "",
        1000,
        750000,
        undefined,
        `(Left (Right (Left (Pair ${deposit} (Pair "${houseAddress}" ${rent})))))`,
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
        <Button
          onClick={() => submitForm()}
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
        >
          Add Property & Transact
        </Button>
      </div>
    </div>
  );
}
