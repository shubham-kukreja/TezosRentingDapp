import React from "react";
import Axios from "axios";
import { Button } from "@material-ui/core";

async function getContractStorage() {
  const res = await Axios.get(
    "https://carthagenet.smartpy.io/chains/main/blocks/head/context/contracts/KT1MuMtaXpjnMYss8VCxEdUgY4nGRUfjbogt/storage"
  );
  console.log(JSON.stringify(res.data));
}

export default function RentIn() {
  return (
    <div>
      <Button onClick={() => getContractStorage()}>Get Storage</Button>
    </div>
  );
}
