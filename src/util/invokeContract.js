import {
  TezosNodeWriter,
  TezosParameterFormat,
  TezosNodeReader,
} from "conseiljs";
import { contractAddress } from "../constants/contract";
import { tezosNode } from "../constants/contract";

export const invokeContract = async (keystore, amount, parameters) => {
  const res = await TezosNodeWriter.sendContractInvocationOperation(
    tezosNode,
    keystore,
    contractAddress,
    amount,
    100000,
    "",
    1000,
    750000,
    undefined,
    parameters,
    TezosParameterFormat.Michelson
  );
  return res;
};

export const getStorage = async () => {
  const result = await TezosNodeReader.getContractStorage(
    "https://carthagenet.smartpy.io",
    "KT1MuMtaXpjnMYss8VCxEdUgY4nGRUfjbogt"
  );
  console.log(result);
};
