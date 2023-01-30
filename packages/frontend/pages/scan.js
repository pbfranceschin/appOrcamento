import { parse } from "@ethersproject/transactions";
import { ethers } from "ethers";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { getContractData } from '../utils';
import { ContractMethodNoResultError, useProvider } from 'wagmi';

import Head from 'next/head';
import Header from "./itens/ScanHeader";
import Search from '../components/scan/Search'

const fetchTxData = async (contract, filter) => {
    
    // const logs = await provider.getLogs(filter);
    let logs = await contract.queryFilter(filter)

    // console.log(logs)

    const events = logs.map(log => contract.interface.parseLog(log).args);

    return events;
}

const sliceData = (data, start, end) => {
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

const useTxData = () => {
    const [txData, setTxData] = useState([]);
    const [addData, setAddData] = useState([]);
    const filterInitializer = useRef(false);
    const txDataUpdate = useRef(false);
    const provider = useProvider();
    useEffect(() => {
        const [contractAddress, contractABI] = getContractData();
        const contract = new ethers.Contract(contractAddress, contractABI, provider)
        const txFilter = contract.filters.TransferSingle()
        const addFilter = contract.filters.Registry()

        if(!filterInitializer.current) {
            fetchTxData(contract, txFilter).then(response => {
                setTxData(response)
            })
            fetchTxData(contract, addFilter).then(response => {
                setAddData(response)
            })

            provider.on(txFilter, (log) => {
                fetchTxData(contract, txFilter).then(response => {
                    setTxData(response)
                    txDataUpdate.current = !txDataUpdate.current
                })
            })
            provider.on(addFilter, (log) => {
                fetchTxData(contract, addFilter).then(response => {
                    setAddData(response)
                    // addData updater
                })
            })
            filterInitializer.current = true
        }
    },[])
    return [[...txData].reverse(), [...addData].reverse(), txDataUpdate.current]
}

const queryData = (
    data,
    filter,
) => {

    let array_ = new Array()
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++){
            if(data[i][j].toString() === filter){
                array_.push(data[i])
                console.log('rodada', j)
                break
            }
        }
    }
    return array_
}

const main = () => {

    const [searchValue, setSearchValue] = useState('')
    const [txData, addData, txUpdater] = useTxData()
    const [txIndex, setTxIndex] = useState(0)
    const [txShow, setTxShow] = useState([])
    const [txSearchedData, setTxSearchedData] = useState([])
    const [addSearchedData, setAddSearchedData] = useState([])
    const dataInitializer = useRef(false)
    const [txSearched, setTxSearched] = useState(false)
    const showUpdater = useRef()

    
    const [tab, setTab] = useState(0) // tab = 0 => tranfers // tab = 1 => registries
    const buttonDisabled = "bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded shadow-md opacity-50 cursor-not-allowed"
    const buttonActive = "bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded shadow-md"
    const [prevButtonClass, setPrevButtonClass ] = useState(buttonDisabled)
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
    const [nextButtonClass, setNextButtonClass] = useState(buttonActive)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
    const prevButtonText = '<<Anterior'
    const nextButtonText = 'Próxima>>'
    const error_msg_filter = 'erro: filtro de dado não reconhecido'


    // console.log('txShow',txShow)
    // console.log(txSearched)
    console.log('tab', tab)
    console.log('show', txShow)
    console.log('showUpdater', showUpdater.current)
    console.log('addData', addData)

    // initiate tx list
    useEffect(() => {
        if(!dataInitializer.current && txData.length > 0){
            setTxShow(sliceData(txData, 0, 10))
            dataInitializer.current = true
        }
    },[txData, dataInitializer])

    
    // update txShow
    useLayoutEffect(() => {
        
        console.log('txShow updater')
        // console.log('searched data', txSearchedData.slice(txIndex))

        if(tab === 0){
            showUpdater.current = 0
        } else if(tab === 1){
            showUpdater.current = 1
        } else {
            alert(error_msg_filter)
            return
        }
        
        if(txSearched){
            if(tab === 0){
                console.log('Showing searched data')
                if(txIndex + 10 >= txSearchedData.length){
                    setTxShow(txSearchedData.slice(txIndex))
                    setNextButtonDisabled(true)
                    setNextButtonClass(buttonDisabled)
                    return
                }
                setTxShow(txSearchedData.slice(txIndex, txIndex + 10))
                return
            } else if (tab === 1) {
                console.log('Showing searched data')
                if(txIndex + 10 >= addSearchedData.length){
                    setTxShow(addSearchedData.slice(txIndex))
                    setNextButtonDisabled(true)
                    setNextButtonClass(buttonDisabled)
                    return
                }
                setTxShow(addSearchedData.slice(txIndex, txIndex + 10))
                return
            } else{
                alert(error_msg_filter)
                return
            }

        }
        
        if(tab === 0){
            if(txIndex + 10 >= txData.length) {
                setTxShow(txData.slice(txIndex))
                setNextButtonDisabled(true)
                setNextButtonClass(buttonDisabled)
                console.log('last_page', 'nextButtonDisabled ?', nextButtonDisabled)
                return
            }
            setTxShow(txData.slice(txIndex, txIndex + 10))
            // console.log('txShow', txShow,'txIndex', txIndex, 'nextButtonDisabled ?', nextButtonDisabled, 'data length', txData.length)
        } else if(tab === 1){
            if(txIndex + 10 >= addData.length) {
                setTxShow(addData.slice(txIndex))
                setNextButtonDisabled(true)
                setNextButtonClass(buttonDisabled)
                console.log('last_page', 'nextButtonDisabled ?', nextButtonDisabled)
                return
            }
            setTxShow(addData.slice(txIndex, txIndex + 10))
            console.log('check')

        } else {
            console.log(error_msg_filter)
            alert(error_msg_filter)
        }

    }, [txSearched, txIndex, tab, showUpdater.current])
    
     // check the length update nextButton state
    useLayoutEffect(() => {
        if(txSearched){
            if(txSearchedData.length <= 10){
                setNextButtonDisabled(true)
                // console.log('check the length: single page/searched data')
            } else {
                setNextButtonDisabled(false)
                // console.log('check the length: multiple pages/searched data')
                }
            return
        }
        
        if(tab === 0) {
            if(txData.length <= 10){
                setNextButtonDisabled(true)
                // console.log('check the length: single page/full data')
            } else{
                setNextButtonDisabled(false)
                // console.log('check the length: multiple pages/full data')
            }
        } else if(tab === 1){
            if(addData.length <= 10){
                setNextButtonDisabled(true)
                // console.log('check the length: single page/full data')
            } else{
                setNextButtonDisabled(false)
                // console.log('check the length: multiple pages/full data')
            }            
        }  else {
            console.log(error_msg_filter)
            alert(error_msg_filter)
        }
    }, ([txSearched, txUpdater, tab]))

    
    // check the index, update prevButton state
    useLayoutEffect(() => {
        if(txIndex === 0){
            setPrevButtonDisabled(true)
        }
    },([txIndex]))
    

    // check button state update button class 
    useEffect(()=> {
        // console.log('button activator/disabler')
        if(!prevButtonDisabled) {
            // console.log('activate prevButton', 'disable false', prevButtonDisabled)
            setPrevButtonClass(buttonActive)
        } else {
            // console.log('disbale prevButton', 'disable true?', prevButtonDisabled)
            setPrevButtonClass(buttonDisabled)
        }

        if(!nextButtonDisabled) {
            // console.log('activate nextButton', 'disable false?', nextButtonDisabled)
            setNextButtonClass(buttonActive)

        }else {
            // console.log('disable nextButton', 'disable true?', nextButtonDisabled)
            setNextButtonClass(buttonDisabled)
        }
    }, ([prevButtonDisabled, nextButtonDisabled]))
    

    // // // handlers // // // 
    // // // // // // // // // 
    const txNextHandler = () => {
        if(nextButtonDisabled){
            // console.log('button disabled checked')
            return
        }
        setTxIndex(txIndex + 10)
        setPrevButtonDisabled(false)
    }
    
    const txPrevHandler = () => {
        if(prevButtonDisabled){
            // console.log('button disabled checked')
            return
        }
        setTxIndex(txIndex - 10)
        setNextButtonDisabled(false)
        
        if(txIndex === 0){
            setPrevButtonDisabled(true)
        }
        
    }

    const handleSearch = () => {
        if(!searchValue){
            clearSearch()
            return
        }
        if(txSearched){
            showUpdater.current = null
        }
        setTxSearched(true)
        setTxIndex(0)
        console.log('buscar')
        setTxSearchedData(queryData(txData, searchValue))        
        setAddSearchedData(queryData(addData, searchValue))
        // console.log('searched Data', txSearchedData)
        
    }

    const clearSearch = () => {
        console.log('clear search')
        setTxSearched(false)
        setSearchValue('')
        setTxIndex(0)
    }
    // // // // =====>>TESTE<<====== // // // //
        // const testeQueryData = () => {
        //     const _x = [['2', '32', '3'], ['1', '34', '5', '0'], ['9', '2', '3'], ['55', '44', '99'], ['123', '342', '100'], ['2', '66', '12']]
        //     const _y = queryData(_x, '2')
        //     console.log(_y)
        // }
    // // // // // // // // // // // // // // //

    if(tab === 0){
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
                        handleSearch={handleSearch}
                        clearSearch={clearSearch}
                    />

                </div>
                <div className="flex justify-center items-center pt-6 pb-2">
                    {/* <h1 className="font-bold text-xl subpixel-antialiased ">Transferências</h1>  */}
                    <button 
                    className="bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded-l shadow-md"
                    >
                        Transferências
                    </button>
                    <button 
                    className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase rounded-r shadow-md"
                    onClick={() => setTab(1)}
                    >
                        cadastros
                    </button>
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
                                    {txShow.map((e,i) => {
                                        let id
                                        let value
                                        const key = i.toString()
                                        if(showUpdater.current === 0){
                                            id = e.id.toString()
                                            value = e.value.toString()
                                        }
                                        return (
                                            <tr key={key} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {txIndex + i + 1}
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
                <div className="flex justify-start">
                    <div className="px-2 pb-2">
                        <button className={prevButtonClass} onClick={txPrevHandler}>
                            {prevButtonText}
                        </button>
                    </div>
                    <div>
                        <button className={nextButtonClass} onClick={txNextHandler}>
                            {nextButtonText}
                        </button>
                    </div>

                </div>
                {/* TESTE */}
                {/* <div className="py-4 px-2">
                    <button className="bg-red-400 py-2 px-4 text-white font-medium text-xs rounded" onClick={testeQueryData}>teste</button>
                </div> */}
                {/* ^^^^^^^^ */}
            </main>
            </>
        )} else if (tab === 1){
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
                        handleSearch={handleSearch}
                        clearSearch={clearSearch}
                    />

                </div>
                <div className="flex justify-center items-center pt-6 pb-2">
                    {/* <h1 className="font-bold text-xl subpixel-antialiased ">Transferências</h1>  */}
                    <button 
                    className="opacity-50 bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded-l shadow-md"
                    onClick={() => setTab(0)}
                    >
                        Transferências
                    </button>
                    <button 
                    className="bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase rounded-r shadow-md"
                    >
                        cadastros
                    </button>
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
                                    {txShow.map((e,i) => {
                                        let id                                      
                                        if(showUpdater.current === 1){
                                            id = e.area.toString()
                                        }
                                        const key = i.toString()
                                        let action = 'Cadastro'
                                        if(!e.added) {
                                            action = 'Revogação'
                                        }
                                        return (
                                            <tr key={key} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {txIndex + i + 1}
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
                <div className="flex justify-start">
                    <div className="px-2 pb-2">
                        <button className={prevButtonClass} onClick={txPrevHandler}>
                            {prevButtonText}
                        </button>
                    </div>
                    <div>
                        <button className={nextButtonClass} onClick={txNextHandler}>
                            {nextButtonText}
                        </button>
                    </div>

                </div>

            </main>
            
            </>
            
            )
        }
        else{
            return(
                <>
                <h1 className="text-2xl font-bold uppercase">erro: <br></br> {error_msg_filter}</h1>
                </>
            )
        }
    
}

export default main;