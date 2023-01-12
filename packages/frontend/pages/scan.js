import { parse } from "@ethersproject/transactions";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { getContractData } from '../utils';
import { useProvider } from 'wagmi';

import Head from 'next/head';
import Header from "./itens/ScanHeader";

const fetchTxData = async (provider, contract, filter) => {
    
    // const logs = await provider.getLogs(filter);
    let logs = await contract.queryFilter(filter)

    console.log(logs)

    const events = logs.map(log => contract.interface.parseLog(log).args);

    return events;
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

    const txData = useTxData()

    console.log(txData)
    

    return (
        <>
        <main>
            <Head>
                <title>Rastreador do Orçamento</title>
                <meta content="Desenvolvido por FGV-ECMI"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {/* <h1 className="taxt-3xl font-bold underline"> teste </h1> */}
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Operador
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Área
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Debitado de
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Creditado a
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Montante
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {txData.map((e,i) => {
                                    const id = e.id.toString()
                                    const value =e.value.toString()
                                    return (
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {i}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {e.operator}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {id}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {e.from}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {e.to}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {value}
                                        </td>
                                        </tr>
                                    )
                                })}                                
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
                    
            
{/*             
            {txData.map((e,i) => {
                const id = e.id.toString()
                const value =e.value.toString()
                return (
                    <div key={id}>
                    #{i}, {e.operator}, {e.from}, {e.to}, {id}, {value}
                    </div>
                )

            })} */}
        </main>
        
        </>
    )
};

export default main;