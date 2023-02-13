import { parse } from "@ethersproject/transactions";
import { ethers } from "ethers";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { queryData } from '../utils';
import { useData } from '../hooks/data'

import Head from 'next/head';
import Header from "./itens/DataHeader";
import Search from '../components/scan/Search'
import NameTable from "../components/scan/NameTable";
import AddTable from "../components/scan/AddTable";
import TxTable from "../components/scan/TxTable";
import NavButton from "../components/scan/NavButton";
import Tabs from "../components/scan/Tabs";


let nameMap = new Map()

const main = () => {

    const [searchValue, setSearchValue] = useState('')
    const [txData, addData, txUpdater, addUpdater] = useData()
    const [dataIndex, setDataIndex] = useState(0)
    const [dataShow, setDataShow] = useState([])
    const [txSearchedData, setTxSearchedData] = useState([])
    const [addSearchedData, setAddSearchedData] = useState([])
    const [nameSearchedData, setNameSearchedData] = useState([])
    const dataInitializer = useRef(false)
    const [txSearched, setTxSearched] = useState(false)
    const showUpdater = useRef()
    const nameInitializer = useRef(false)
    const nameIndex = useRef(0)

    const [tab, setTab] = useState(0) // tab = 0 => transfers // tab = 1 => registries // tab = 2 => addresses
    const buttonDisabled = "bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded shadow-md opacity-50 cursor-not-allowed"
    const buttonActive = "bg-blue-600 py-3 px-3 text-white font-medium text-xs uppercase rounded shadow-md"
    const [prevButtonClass, setPrevButtonClass ] = useState(buttonDisabled)
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
    const [nextButtonClass, setNextButtonClass] = useState(buttonActive)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
    
    const error_msg_filter = 'erro: filtro de dado não reconhecido'

    // update map of names
    useEffect(() => {
        console.log('name updater')
        console.log('nameInitializer', nameInitializer.current)
        
        
        if(!nameInitializer.current && addData.length > 0){
            for(let i=0; i<addData.length; i++){
                // console.log('round', i, addData[0].account, addData[0].name)
                nameMap.set(addData[i].account, addData[i].name)
            }
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
            setDataShow(txData.slice(0, 10))
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
            } else if (tab === 1) {
                console.log('Showing searched data')
                if(dataIndex + 10 >= addSearchedData.length){
                    setDataShow(addSearchedData.slice(dataIndex))
                    setNextButtonDisabled(true)
                    setNextButtonClass(buttonDisabled)
                    return
                }
                setDataShow(addSearchedData.slice(dataIndex, dataIndex + 10))
                return
            } 
            else if(tab === 2) {
                if(dataIndex + 10 >= nameSearchedData.length){
                    setDataShow(nameSearchedData.slice(dataIndex))
                    setNextButtonDisabled
                    setNextButtonClass(buttonDisabled)
                    return
                }
                setDataShow(nameSearchedData.slice(dataIndex, dataIndex + 10))
                return
            } 
            else{
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

        } else if(tab === 1 ){
            if(dataIndex + 10 >= addData.length) {
                setDataShow(addData.slice(dataIndex))
                setNextButtonDisabled(true)
                setNextButtonClass(buttonDisabled)
                console.log('last_page', 'nextButtonDisabled ?', nextButtonDisabled)
                return
            }
            setDataShow(addData.slice(dataIndex, dataIndex + 10))

        } else if(tab === 2){
            const arr_ = Array.from(nameMap)
            if(dataIndex + 10 >= nameMap.size){
                setDataShow(arr_.slice(dataIndex))
                setNextButtonDisabled(true)
                setNextButtonClass(buttonDisabled)
                console.log('last_page', 'nextButtonDisabled ?', nextButtonDisabled)
                return
            }
            setDataShow(arr_.slice(dataIndex, dataIndex + 10))
            console.log('check', arr_)

        } else {
            console.log(error_msg_filter)
            alert(error_msg_filter)
        }

    }, [txSearched, dataIndex, tab])
    
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
        } else if(tab === 1 ){
            if(addData.length <= 10){
                setNextButtonDisabled(true)
                // console.log('check the length: single page/full data')
            } else{
                setNextButtonDisabled(false)
                // console.log('check the length: multiple pages/full data')
            }       
        } else if(tab === 2){
            if(nameMap.size <= 10){
                setNextButtonDisabled(true)
            } else{
                setNextButtonDisabled(false)
            }
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
    const nextHandler = () => {
        if(nextButtonDisabled){
            // console.log('button disabled checked')
            return
        }
        setDataIndex(dataIndex + 10)
        setPrevButtonDisabled(false)
    }
    
    const prevHandler = () => {
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
        setNameSearchedData(queryData(Array.from(nameMap), searchValue))
        // console.log('searched Data', txSearchedData)
        
    }

    const clearSearch = () => {
        console.log('clear search')
        setTxSearched(false)
        setSearchValue('')
        setDataIndex(0)
    }

    if(tab === 0){
        return (
            <>
            <main>
                <Head>
                    <title>Orçamento Público | FGV-ECMI</title>
                    <meta content="Desenvolvido por FGV-ECMI"/>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header title='Rastreador do Orçamento' /> 
                <div className="pt-4">
                    <Search
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleSearch={handleSearch}
                        clearSearch={clearSearch}
                    />

                </div>

                <Tabs
                    tab={tab}
                    setTab={setTab}
                    setDataIndex={setDataIndex}
                />
                
                <TxTable
                    data={dataShow}
                    index={dataIndex}
                    showUpdater={showUpdater.current}
                />
                
                <NavButton
                    prevButtonClass={prevButtonClass}
                    nextButtonClass={nextButtonClass}
                    prevHandler={prevHandler}
                    nextHandler={nextHandler}
                />
                
                
            </main>
            </>
        )
    } else if (tab === 1){
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
               
                <Tabs
                    tab={tab}
                    setTab={setTab}
                    setDataIndex={setDataIndex}
                />
                
                <AddTable
                    data={dataShow}
                    index={dataIndex}
                    showUpdater={showUpdater.current}
                />

                <NavButton
                    prevButtonClass={prevButtonClass}
                    nextButtonClass={nextButtonClass}
                    prevHandler={prevHandler}
                    nextHandler={nextHandler}
                />
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
                    <Tabs
                        tab={tab}
                        setTab={setTab}
                        setDataIndex={setDataIndex}
                    />

                    <NameTable
                    data={dataShow}
                    index={dataIndex}
                    showUpdater={showUpdater.current}
                    />

                    <NavButton
                    prevButtonClass={prevButtonClass}
                    nextButtonClass={nextButtonClass}
                    prevHandler={prevHandler}
                    nextHandler={nextHandler}
                    />

                </main>
                </>
        )
    } else{
        return (
                <>
                <h1 className="text-2xl font-bold uppercase">erro: <br></br> {error_msg_filter}</h1>
                </>
        )
    }
    
}

export default main;