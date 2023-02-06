import { parse } from "@ethersproject/transactions";
import { ethers } from "ethers";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { getContractData, fetchData, sliceData, fetchName } from '../utils';
import { useData, useName } from '../hooks/data'
import { useProvider } from 'wagmi';

import Head from 'next/head';
import Header from "./itens/ScanHeader";
import Search from '../components/scan/Search'
import NameTable from "../components/scan/NameTable";
import AddTable from "../components/scan/AddTable";
import TxTable from "../components/scan/TxTable";


const queryData = (
    data,
    filter,
) => {

    let array_ = new Array()
    for(let i = 0; i < data.length; i++) {
        if(
            getName(data[i][0]) === filter ||
            getName(data[i][1]) === filter ||
            getName(data[i][2]) === filter            
        ) {
            array_.push(data[i])
        } else{        
            for(let j = 0; j < data[i].length; j++){
                if(data[i][j].toString() === filter){
                    array_.push(data[i])
                    break
                }
            }
        }
    }
    return array_
}



const main = () => {

    const provider = useProvider();

    const [searchValue, setSearchValue] = useState('')
    const [txData, addData, txUpdater, addUpdater] = useData()
    const [dataIndex, setDataIndex] = useState(0)
    const [dataShow, setDataShow] = useState([])
    const [txSearchedData, setTxSearchedData] = useState([])
    const [addSearchedData, setAddSearchedData] = useState([])
    const dataInitializer = useRef(false)
    const [txSearched, setTxSearched] = useState(false)
    const showUpdater = useRef()
    let nameMap = new Map()
    const nameInitializer = useRef(false)
    const nameIndex = useRef(0)


    
    const [tab, setTab] = useState(0) // tab = 0 => transfers // tab = 1 => registries // tab = 2 => addresses
    const buttonDisabled = "bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded shadow-md opacity-50 cursor-not-allowed"
    const buttonActive = "bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded shadow-md"
    const [prevButtonClass, setPrevButtonClass ] = useState(buttonDisabled)
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
    const [nextButtonClass, setNextButtonClass] = useState(buttonActive)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
    const prevButtonText = '<<Anterior'
    const nextButtonText = 'Próxima>>'
    const error_msg_filter = 'erro: filtro de dado não reconhecido'



    // console.log(txSearched)
    // console.log('tab', tab)
    // console.log('showUpdater', showUpdater.current)
    // let x = addData.slice(0, -10)
    // console.log('addData slice', x[0][0])
    console.log('addData', addData)
    // console.log('tipo' , typeof addData[0])
    // console.log(nameMap)
    // console.log('nameIndex', nameIndex.current)
    // console.log('addData length', addData.length)

    console.log(
        'nameMap', nameMap,
        'nameInitializer', nameInitializer.current,
        'addData length', addData.length,
        'nameIndex', nameIndex.current
    )

    // update map of names
    useEffect(() => {
        console.log('name updater')
        console.log('nameInitializer', nameInitializer.current)
        
        
        if(!nameInitializer.current && addData.length > 0){
            console.log('entrou no if')
            for(let i=0; i<addData.length; i++){
                nameMap.set( addData[i].account, addData[i].name)
            }
            console.log('passou do for')
            nameInitializer.current = true
            nameIndex.current = addData.length
            return
            
        }
        const data_ = addData.slice(0, -nameIndex.current)
        for(let i=0; i<data_.length; i++){
            nameMap.set( addData[i].account, addData[i].name)
        }
        nameIndex.current = nameIndex.current + data_.length

    })
    
    // initiate tx list
    useEffect(() => {
        if(!dataInitializer.current && txData.length > 0){
            setDataShow(sliceData(txData, 0, 10))
            dataInitializer.current = true
        }
    },[txData, dataInitializer])

    
    // update dataShow
    useLayoutEffect(() => {
        
        console.log('dataShow updater')

        if(tab === 0){
            showUpdater.current = 0
        } else if(tab === 1){
            showUpdater.current = 1
        } else if (tab === 2){
            showUpdater.current = 2
        } else {
                alert(error_msg_filter)
            return
        }
        
        if(txSearched){
            if(tab === 0){
                console.log('Showing searched data')
                if(dataIndex + 10 >= txSearchedData.length){
                    setDataShow(txSearchedData.slice(dataIndex))
                    setNextButtonDisabled(true)
                    setNextButtonClass(buttonDisabled)
                    return
                }
                setDataShow(txSearchedData.slice(dataIndex, dataIndex + 10))
                return
            } else if (tab === 1 || tab === 2) {
                console.log('Showing searched data')
                if(dataIndex + 10 >= addSearchedData.length){
                    setDataShow(addSearchedData.slice(dataIndex))
                    setNextButtonDisabled(true)
                    setNextButtonClass(buttonDisabled)
                    return
                }
                setDataShow(addSearchedData.slice(dataIndex, dataIndex + 10))
                return
            } else{
                alert(error_msg_filter)
                return
            }

        }
        
        if(tab === 0){
            if(dataIndex + 10 >= txData.length) {
                setDataShow(txData.slice(dataIndex))
                setNextButtonDisabled(true)
                setNextButtonClass(buttonDisabled)
                console.log('last_page', 'nextButtonDisabled ?', nextButtonDisabled)
                return
            }
            setDataShow(txData.slice(dataIndex, dataIndex + 10))            
        } else if(tab === 1 || tab === 2){
            if(dataIndex + 10 >= addData.length) {
                setDataShow(addData.slice(dataIndex))
                setNextButtonDisabled(true)
                setNextButtonClass(buttonDisabled)
                console.log('last_page', 'nextButtonDisabled ?', nextButtonDisabled)
                return
            }
            setDataShow(addData.slice(dataIndex, dataIndex + 10))
            console.log('check')

        } else {
            console.log(error_msg_filter)
            alert(error_msg_filter)
        }

    }, [txSearched, dataIndex, tab, showUpdater.current])
    
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
        } else if(tab === 2){


        } else {
            console.log(error_msg_filter)
            alert(error_msg_filter)
        }
    }, ([txSearched, txUpdater, tab]))

    
    // check the index, update prevButton state
    useLayoutEffect(() => {
        if(dataIndex === 0){
            setPrevButtonDisabled(true)
        }
    },([dataIndex]))
    

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
        setDataIndex(dataIndex + 10)
        setPrevButtonDisabled(false)
    }
    
    const txPrevHandler = () => {
        if(prevButtonDisabled){
            // console.log('button disabled checked')
            return
        }
        setDataIndex(dataIndex - 10)
        setNextButtonDisabled(false)
        
        if(dataIndex === 0){
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
        setDataIndex(0)
        console.log('buscar')
        setTxSearchedData(queryData(txData, searchValue))        
        setAddSearchedData(queryData(addData, searchValue))
        // console.log('searched Data', txSearchedData)
        
    }

    const clearSearch = () => {
        console.log('clear search')
        setTxSearched(false)
        setSearchValue('')
        setDataIndex(0)
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
                    className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase shadow-md"
                    onClick={() => setTab(1)}
                    >
                        cadastros
                    </button>
                    <button
                    className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase rounded-r shadow-md"
                    onClick={() => setTab(2)}
                    >
                        Endereços
                    </button>
                </div>

                <TxTable
                    data={dataShow}
                    index={dataIndex}
                    showUpdater={showUpdater.current}
                />
                
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
                    className="bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase shadow-md"
                    >
                        cadastros
                    </button>
                    <button
                    className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase rounded-r shadow-md"
                    onClick={() => setTab(2)}
                    >
                        Endereços
                    </button>
                </div>
                
                <div className="flex justify-center items-center pt-6 pb-2">
                    <h1 className="font-bold text-xl subpixel-antialiased ">Cadastros</h1> 
                </div>
                <AddTable
                    data={dataShow}
                    index={dataIndex}
                    showUpdater={showUpdater.current}
                />


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
        } else if( tab === 2 ){
            return(
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
                        className="opacity-50 bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase shadow-md"
                        onClick={() => setTab(1)}
                        >
                            cadastros
                        </button>
                        <button
                        className="bg-blue-600 py-3 px-6 text-white font-medium text-xs uppercase rounded-r shadow-md"
                        >
                            Endereços
                        </button>
                    </div>
                    
                    <div className="flex justify-center items-center pt-6 pb-2">
                        <h1 className="font-bold text-xl subpixel-antialiased ">Endereços</h1> 
                    </div>
                    
                    <NameTable
                    data={dataShow}
                    index={dataIndex}
                    />

            
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