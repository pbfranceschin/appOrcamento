import { parse } from "@ethersproject/transactions";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { getContractData } from '../utils';
import { useProvider } from 'wagmi';

import Head from 'next/head';
import Header from "./itens/ScanHeader";
import Search from '../components/scan/Search'

const fetchTxData = async (provider, contract, filter) => {
    
    // const logs = await provider.getLogs(filter);
    let logs = await contract.queryFilter(filter)

    console.log(logs)

    const events = logs.map(log => contract.interface.parseLog(log).args);

    return events.slice(-10);
}

const useTxData = () => {
    const [txData, setTxData] = useState([]);
    const [addData, setAddData] = useState([]);
    const filterInitializer = useRef(false);
    const provider = useProvider();
    useEffect(() => {
        const [contractAddress, contractABI] = getContractData();
        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const txFilter = contract.filters.TransferSingle()
        const addFilter = contract.filters.Registry()
        // console.log(provider)
        if(!filterInitializer.current) {
            provider.on(txFilter, (log) => {
                // console.log(log)
                // const parsedEvent = contract.interface.parseLog({
                //     topics: log.topics,
                //     data: log.data,
                // })
                // console.log(parsedEvent.args)
                fetchTxData(provider, contract, txFilter).then(response => {
                    setTxData(response)
                })
            })
            provider.on(addFilter, (log) => {
                fetchTxData(provider, contract, addFilter).then(response => {
                    setAddData(response)
                })
            })
            filterInitializer.current = true
        }
    },[])
    return [[...txData].reverse(), [...addData].reverse()]
}

const main = () => {

    const [searchValue, setSearchValue] = useState('')

    let [txData, addData] = useTxData()

    console.log(txData)
    console.log(addData)

    return (
        <>
        <main>
            <Head>
                <title>Rastreador do Orçamento</title>
                <meta content="Desenvolvido por FGV-ECMI"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div>
                <Search
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />

            </div>
            <div className="flex justify-center items-center pt-6 pb-2">
                <h1 className="font-bold text-xl subpixel-antialiased ">Transferências</h1> 
            </div>
                
            <div className="flex flex-col border-t">
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
                                    const key = i.toString()
                                    return (
                                        <tr key={key} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
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
            <div className="flex justify-center items-center pt-6 pb-2">
                <h1 className="font-bold text-xl subpixel-antialiased ">Cadastros</h1> 
            </div>
            <div className="flex flex-col border-t">
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
                                    Endereço
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Área
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Ação
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {addData.map((e,i) => {
                                    const id = e.area.toString()
                                    const key = i.toString()
                                    let action = 'Cadastro'
                                    if(!e.added) {
                                        action = 'Revogação'
                                    }
                                    return (
                                        <tr key={key} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {i}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {e.account}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {id}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {action}
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

        </main>
        
        </>
    )
};

export default main;