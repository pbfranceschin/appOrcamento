import { ethers } from "ethers";
import { NETWORK_ID  } from "./config";

import contracts from "./contracts/hardhat_contracts.json";

const chainId = Number(NETWORK_ID);

const contractAddress = contracts[chainId][0].contracts.OrcamentoUniao2023.address;

const contractABI = contracts[chainId][0].contracts.OrcamentoUniao2023.abi;


export const getContractData = () => {

    return [contractAddress, contractABI];
    
};