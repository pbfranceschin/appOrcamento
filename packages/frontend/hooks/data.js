import React from "react";
import { ethers } from "ethers";
import { useEffect, useState, useRef } from "react";
import { useProvider, useContractRead } from 'wagmi';
import { getContractData } from "../utils";
import { fetchData } from "../utils";

export const useData = () => {
    const [txData, setTxData] = useState([])
    const [addData, setAddData] = useState([])
    const filterInitializer = useRef(false)
    const txDataUpdate = useRef(false)
    const addDataUpdate = useRef(false)
    const provider = useProvider()
    useEffect(() => {
        const [contractAddress, contractABI] = getContractData()
        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const txFilter = contract.filters.TransferSingle()
        const addFilter = contract.filters.Registry()

        if(!filterInitializer.current) {
            fetchData(contract, txFilter).then(response => {
                setTxData(response)
            })
            fetchData(contract, addFilter).then(response => {
                setAddData(response)
            })

            provider.on(txFilter, (log) => {
                fetchData(contract, txFilter).then(response => {
                    setTxData(response)
                    txDataUpdate.current = !txDataUpdate.current
                })
            })
            provider.on(addFilter, (log) => {
                fetchData(contract, addFilter).then(response => {
                    setAddData(response)
                    addDataUpdate.current = !addDataUpdate.current
                })
            })
            filterInitializer.current = true
        }
    },[])
    return [[...txData].reverse(), [...addData].reverse(), txDataUpdate.current, addDataUpdate.current]
}



export const useName = (address) => {

    const [contractAddress, contractABI] = getContractData()
    
    const { data, isError, isLoading } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'getName',
        args: [address]        
    })

    return data
}