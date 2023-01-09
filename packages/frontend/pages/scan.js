import { parse } from "@ethersproject/transactions";
import { ethers } from "ethers";
import React from "react";
import { useState } from "react";
import { getContractData } from '../utils';


const fetchTxData = async (provider, contract, filter) => {
    
    const logs = await provider.getLogs(filter);

    const events = logs.map(log => contract.interface.parseLog(log));

    return events.slice(-5);
}


const main = async () => {
    
    const [txData, setTxData] = useState('');

    const provider = new ethers.providers.JsonRpcProvider();

    const [contractAddress, contractABI] = getContractData();

    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    const filter = {
        address: contractAddress,
        topics: [
          ethers.utils.id(
            "TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)"
            )
        ]
    };

    let events_ = await fetchTxData(provider, contract, filter)
    setTxData(events_)
    console.log(txData)



    // const transferSingleFilter = contract.filters.TransferSingle();
    
    // let txOperators = new Array();
    // let txSenders = new Array();
    // let txReceivers = new Array();
    // let txAreas = new Array();
    // let txValues = new Array();

    provider.on(filter, async (log) => {
        // const parsedEvent = contract.interface.parseLog({
        //     topics: log.topics,
        //     data: log.data,
        // })
        // console.log('TransferSingle Event:')
        // console.log('operator:', parsedEvent.args.operator)
        // console.log('from', parsedEvent.args.from)
        // console.log('to', parsedEvent.args.to )
        // console.log('area', parsedEvent.args.id.toString())
        // console.log('value', parsedEvent.args.value.toString())
        // txOperators.push(parsedEvent.args.operator)
        // txSenders.push(parsedEvent.args.from)
        // txReceivers.push(parsedEvent.args.to)
        // txAreas.push(parsedEvent.args.id)
        // txValues.push(parsedEvent.args.value)
        events_ = await fetchTxData(provider, contract, filter)
        console.log(events_)
    })

    return 
};

export default main;