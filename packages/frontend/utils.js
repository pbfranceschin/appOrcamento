import { NETWORK_ID  } from "./config";
import contracts from "./contracts/hardhat_contracts.json";
import { useContract, useContractRead, useProvider } from "wagmi"
import { useName } from "./hooks/data";


const chainId = Number(NETWORK_ID);

const contractAddress = contracts[chainId][0].contracts.OrcamentoUniao2023.address;

const contractABI = contracts[chainId][0].contracts.OrcamentoUniao2023.abi;


export const getContractData = () => {

    return [contractAddress, contractABI];
    
};

export const fetchData = async (contract, filter) => {
    
    // const logs = await provider.getLogs(filter);
    let logs = await contract.queryFilter(filter)

    // console.log(logs)

    const events = logs.map(log => contract.interface.parseLog(log).args);

    return events;
}

export const fetchName = (address) => {
    const name_ = useName(address)
    return name_
}

export const sliceData = (data, start, end) => {
    const length_ = end - start
    if(data.length <= length_){
        return data
    }
    let sliced = new Array()
    for(let i=0; i<length_; i++){
        sliced[i] = data[start + i]
    }
    return sliced
}



