import { parse } from "@ethersproject/transactions";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { getContractData } from '../utils';
import { useProvider } from 'wagmi';


const fetchTxData = async (provider, contract, filter) => {
    
    // const logs = await provider.getLogs(filter);
    let logs = await contract.queryFilter(filter)

    console.log(logs)

    const events = logs.map(log => contract.interface.parseLog(log).args);

    return events.slice(-10);
}

const useTxData = () => {
    const [txData, setTxData] = useState([]);
    const filterInitializer = useRef(false);
    const provider = useProvider();
    useEffect(() => {
        const [contractAddress, contractABI] = getContractData();
        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const filter = contract.filters.TransferSingle()
        // console.log(provider)
        if(!filterInitializer.current) {
            provider.on(filter, (log) => {
                // console.log(log)
                const parsedEvent = contract.interface.parseLog({
                    topics: log.topics,
                    data: log.data,
                })
                // console.log(parsedEvent.args)
                fetchTxData(provider, contract, filter).then(response => {
                    setTxData(response)
                })
            })
            filterInitializer.current = true
        }
    },[])
    return txData
}

const main = () => {
    
    

    // const provider = new ethers.providers.JsonRpcProvider();

    const txData = useTxData()

    console.log(txData)
    

    return (
        <>
        <main>
            {txData.map((e,i) => {
                const id = e.id.toString()
                const value =e.value.toString()
                return (
                    <div key={id}>
                    #{i}, {e.operator}, {e.from}, {e.to}, {id}, {value}
                    </div>
                )

            })}
        </main>
        
        </>
    )
};

export default main;