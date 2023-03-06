import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { getContractData, fetchData } from "../utils";
import { ethers } from "ethers";
import { useContract, useProvider } from "wagmi";
import AreaDropdown from "../components/AreaDropdown";

let dataInit = false
let blockInit = false
let otherInit = false
let blocks = new Array()

const queryFilter = async (contract, filter) => {

    let logs = await contract.queryFilter(filter)
    return logs
}

const block = async (provider, log) => {

    const block = await provider.getBlock(log.blockNumber)
    return block

}


const main = () => {

    const [area, setArea] = useState('');

    // const arr = [['sim', 'nao'], ['sim', 'nao', 'nao'], ['talvez', 'talvez']]
    // const [filteredArr, setFilteredArr] = useState([])
    // const [Var_ , setVar_ ]= useState()
    // const ref = useRef(false)
    // const [inputValue, setInputValue] = useState('')
    
    // const [txData, setTxData] = useState([])
    // const [addData, setAddData] = useState([])
    // const [block0, setBlock0] = useState()
    // const [block1, setBlock1] = useState()


    // const [contractAddress, contractABI] = getContractData()
    // const provider = useProvider()
    // const contract = useContract({
    //     address: contractAddress,
    //     abi: contractABI,
    //     signerOrProvider: provider
    // })

    // const txFilter = contract.filters.TransferSingle()
    // const addFilter = contract.filters.Registry()
    
    // useEffect(() =>{
    //     queryFilter(contract, txFilter).then(response => {
    //         setTxData(response)
    //         dataInit = true
    //     })
    //     queryFilter(contract, addFilter).then(response => {
    //         setAddData(response)
    //     })
        
    // },[])

    // useEffect(() => {
    //     if(dataInit){
    //         block(provider, txData[0]).then(response => {
    //             setBlock0(response)
    //             blockInit = true
    //         })
    //         block(provider, addData[0]).then(response => {
    //             setBlock1(response)
    //             otherInit = true
    //         })
    //     }
    // },[txData])

    // // useEffect(() => {
    // //     for(let i=0; i<txData.length; i++){
    // //         blocks[i] = txData[i].blockNumber
    // //     }
    // // })
        

    // if(blockInit){
        
    //     const tx_ = txData.slice(0,4)
    //     console.log('slice', tx_)

    //     console.log('length', txData.length, tx_.length)
    //     console.log('from', txData[0].args.from)
    //     console.log('account', addData[0].args.account)
    //     // console.log('block[0]', txData[0].blockHash)
    //     console.log('block0', block0)
    //     const time_ = block0.timestamp
    //     console.log('block0 time', time_)
    //     const date_ = new Date(time_*1000)
    //     console.log('data', date_)
    //     console.log(
    //         date_.getDate()+
    //         '/'+(date_.getMonth()+1)+
    //         '/'+date_.getFullYear()+
    //         ' '+date_.getHours()+
    //         ':'+date_.getMinutes()+
    //         ':'+date_.getSeconds()
    //     )

    // }


    // console.log(filteredArr)

    const onClick1 = () => {

        setVar_(Var_ + 1)
        console.log(Var_, ref.current)

    }

    const onClick2 = () => {
        ref.current = !ref.current
    }

    const filterArray = (filter, arr) => {
        const _arr = new Array()
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr[i].length; j++){
                if(arr[i][j] === filter){
                    _arr.push(arr[i])
                    console.log(j)
                    break
                }
            }
        }
        return _arr
    }

    const hanldleFilterClick = () => {
        if(!inputValue) {
            return
        }
        setFilteredArr(filterArray(inputValue, arr))
    }
    
    const handleDropdown = () => {
        const e = document.getElementById("area_1");
        const area = e.value;
        console.log(area);
    }

    const onSelect = () => {
        const e = document.getElementById("area_1");
        const area = e.defaultValue;
        console.log(area);
    }

    return (
        <>
        {/* <h1 className="font-bold text-xl subpixel-antialiased" >TESTE</h1>
        <button className="border" onClick={onClick1}> update var </button>
        <p className="py-2"> Var: {Var_}, ref: {ref.current} </p>

        <button className="border" onClick={onClick2}> update ref </button>

        <div className="py-4">
        <input className="border py-2" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button className="border" onClick={hanldleFilterClick}>Filtrar arr</button>
        <p className="py-2"> R: {filteredArr} </p>
        </div> */}
        {/* <div className="py-6 px-6">
            <select id="area_1" onChange={(e) => console.log(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                <option defaultValue="">escolha uma área</option>
                <option value="0">Ordinária</option>
                <option value="1">Educação</option>
                <option value="2">Infraestrutura</option>
                <option value="3">Saúde</option>
            </select>
            <button className="p-4 border rounded bg-red-500 text-white font-bold" onClick={handleDropdown}> dropDown test</button>

        </div> */}

        <AreaDropdown
        setArea={setArea}
        defaultValue=""
        defaultLabel="escolha"
        />

        </>
    )

}

export default main;