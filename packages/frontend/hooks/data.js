import React from "react";
import { ethers } from "ethers";
import { useEffect, useState, useRef } from "react";
import { useProvider, useContractRead } from 'wagmi';
import { getContractData } from "../utils";
import { fetchBlock, fetchData } from "../utils";

export const useData = () => {
    const [txData, setTxData] = useState([])
    const [addData, setAddData] = useState([])
    const [txBlocks, setTxBlocks] = useState([])
    const [addBlocks, setAddBlocks] = useState([])
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
                const arr = new Array()
                response.map((e) => {
                    fetchBlock(provider, e).then(response => {
                        arr.push(response)
                    })
                })
                setTxBlocks(arr)
            })
            fetchData(contract, addFilter).then(response => {
                setAddData(response)
                const arr = new Array()
                response.map((e) => {
                    fetchBlock(provider, e).then(response => {
                        arr.push(response)
                    })
                })
                setAddBlocks(arr)
            })

            provider.on(txFilter, (log) => {
                fetchData(contract, txFilter).then(response => {
                    setTxData(response)
                    const arr = new Array()
                    response.map((e) => {
                        fetchBlock(provider, e).then(response => {
                            arr.push(response)
                        })
                    })
                    setAddBlocks(arr)
                    txDataUpdate.current = !txDataUpdate.current
                })
            })
            provider.on(addFilter, (log) => {
                fetchData(contract, addFilter).then(response => {
                    setAddData(response)
                    const arr = new Array()
                    response.map((e) => {
                        fetchBlock(provider, e).then(response => {
                            arr.push(response)
                        })
                    })
                    setAddBlocks(arr)
                    addDataUpdate.current = !addDataUpdate.current
                })
            })
            filterInitializer.current = true
        }
    },[])
    return [[...txData].reverse(), [...addData].reverse(), [...txBlocks].reverse(), [...addBlocks].reverse(), txDataUpdate.current, addDataUpdate.current]
}

export const useBlock = (log) => {
    // const [contractAddress, contractABI] = getContractData()
    const provider = useProvider()
    // const contract = new ethers.Contract(contractAddress, contractABI, provider)
    
    let block
    fetchBlock(provider, log).then(response => {
        block = response
    })

    return block

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