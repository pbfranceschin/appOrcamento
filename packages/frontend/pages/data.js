import { ethers } from "ethers";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { getContractData, fetchData } from '../utils';
import { useContract, useProvider } from "wagmi";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';


import Head from 'next/head';
import Header from './itens/DataHeader';

const [contractAddress, contractABI] = getContractData();

const getBudget = async (contract) => {
    let budget_ = new Array()
    budget_ = await contract.getInitialBudget()
    return budget_
}

const getMints = async (contract) => {
    let mints_ = new Array()
    mints_ = await contract.getTotalMinted()
    return mints_
}

const getBurns = async (contract) => {
    let burns_ = new Array()
    burns_ = await contract.getTotalBurned()
    return burns_
}

const main = () => {

    const provider = useProvider()
    const contract = useContract({
        address: contractAddress,
        abi: contractABI,
        signerOrProvider: provider
    })

    const [render, setRender] =useState(true)
    
    const [budget, setBudget] = useState([])
    const budgetLen = useRef(0)
    const [area0initial, setArea0initial] = useState(0)
    const [area1initial, setArea1initial] = useState(0)
    const [area2initial, setArea2initial]= useState(0)
    const [area3initial, setArea3initial] = useState(0)
    
    // total minted
    const [area0Minted,  setArea0Minted] = useState(0)
    const [area1Minted, setArea1Minted] = useState(0)
    const [area2Minted, setArea2Minted] = useState(0)
    const [area3Minted, setArea3Minted] = useState(0)
    // total burned
    const [area0burned, setArea0burned] = useState(0)
    const [area1burned, setArea1burned] = useState(0)
    const [area2burned, setArea2burned] = useState(0)
    const [area3burned, setArea3burned] = useState(0)

    console.log(
        'area[i] minted/burned:',
        area0Minted,
        area0burned,
        area1Minted,
        area1burned,
        area2Minted,
        area2burned,
        area3Minted,
        area3burned
    )

    const handleRender = () => {
        setRender(!render)
    }

    // ========>>> totalminted: fazer o subscription com provider.on filtrando por transfer da account 0 !!!!!
    useEffect(() => {
        console.log('mint/burn sub initializer')

        const zeroAddress = '0x0000000000000000000000000000000000000000'
        const mintFilter = contract.filters.TransferSingle(zeroAddress)
        const burnFilter = contract.filters.TransferSingle(null, zeroAddress)
        
        getMints(contract).then(response => {
            // console.log('updating total minted')
            setArea0Minted(response[0].toNumber())
            setArea1Minted(response[1].toNumber())
            setArea2Minted(response[2].toNumber())
            setArea3Minted(response[3].toNumber())
        })
        getBurns(contract).then(response => {
            // console.log('updating total burned')
            setArea0burned(response[0].toNumber())
            setArea1burned(response[1].toNumber())
            setArea2burned(response[2].toNumber())
            setArea3burned(response[3].toNumber())
        })
        
        provider.on(mintFilter, (log) => {
            getMints(contract).then(response => {
                console.log('updating total minted')
                setArea0Minted(response[0].toNumber())
                setArea1Minted(response[1].toNumber())
                setArea2Minted(response[2].toNumber())
                setArea3Minted(response[3].toNumber())
            })
        })
        provider.on(burnFilter, (log) => {
            getBurns(contract).then(response => {
                console.log('updating total burned')
                setArea0burned(response[0].toNumber())
                setArea1burned(response[1].toNumber())
                setArea2burned(response[2].toNumber())
                setArea3burned(response[3].toNumber())
            })
        })
    },[])
    
    
    useLayoutEffect(() => {
        if(budgetLen.current > 0){
            console.log('atualiza as areas')
            const area0_ = (budget[budgetLen.current - 1].mul(budget[0])).div(100)
            const area1_ = (budget[budgetLen.current - 1].mul(budget[1])).div(100)
            const area2_ = (budget[budgetLen.current - 1].mul(budget[2])).div(100)
            const area3_ = (budget[budgetLen.current - 1].mul(budget[3])).div(100)
            
            // console.log('area0_',area0_.toNumber())
            // console.log('area0initial', area0initial$.current)

            setArea0initial(area0_.toNumber())
            setArea1initial(area1_.toNumber())
            setArea2initial(area2_.toNumber())
            setArea3initial(area3_.toNumber())

            console.log('area0initial', area0initial)
            
        }
    },[budgetLen.current])
    
    useEffect(() => {
        console.log('budget initializer')
        getBudget(contract).then(response => {
            setBudget(response)
            budgetLen.current = response.length
        })
        
    },[])

    
    const initialBudgetChartData = [
        {name: 'Ordinária', value: area0initial},
        {name: 'Educação', value: area1initial},
        {name: 'Infra', value: area2initial},
        {name: 'Saúde', value: area3initial },
    ]   
        
    console.log('chart data', initialBudgetChartData)
    
    return (
        <>
        <main>
            <Head>
                <title>Dados do Orçamento - Desenvolvido por FGV-ECMI</title>
                <meta content="Desenvolvido por FGV-ECMI"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="grid grid-rows-3 py-4 px-3 justify-center border">
                <div className="justify-center content-start items-center object-cover border box-border h-45 py-4 px-2 grid grid-cols-3">
                    <div className="flex justify-start container mx-auto grid grid-rows-2">
                        <div>
                            <h2 className="subpixel-antialiased font-medium text-base lining-nums"
                            >
                                Orçamento Inicial: {budgetLen.current > 0 ? budget[budgetLen.current - 1].toString() : 0 }<br></br>
                            </h2>
                        </div>
                        <div>
                            <p className="subpixel-antialiased font-light lining-nums text-base ">
                                - Ordinária: {area0initial}<br></br>
                                - Educação: {area1initial}<br></br>
                                - Infra: {area2initial}<br></br>
                                - Saúde: {area3initial}<br></br>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center grid grid-rows-2 py-2">
                        <div>
                            <h2 className="subpixel-antialiased font-medium text-base lining-nums ">
                                Total Emitido: {area0Minted + area1Minted + area2Minted + area3Minted }<br></br>
                            </h2>
                        </div>
                        <div>
                            <p className="subpixel-antialiased font-light lining-nums text-base ">
                                - Ordinária: {area0Minted}<br></br>
                                - Educação: {area1Minted}<br></br>
                                - Infra: {area2Minted}<br></br>
                                - Saúde: {area3Minted}<br></br>
                            </p>
                            <p className="subpixel-antialiased font-normal lining-nums text-base">
                                Déficit Potencial: 
                                {budgetLen.current > 0 ? 
                                    (area0Minted + area1Minted + area2Minted + area3Minted) - budget[budgetLen.current - 1].toNumber() : 0 
                                }

                            </p>
                            <p className="subpixel-antialiased font-normal lining-nums text-base">
                                Déficit Corrente:
                                {budgetLen.current > 0 ?
                                    (area0burned + area1burned + area2burned + area3burned) - budget[budgetLen.current - 1].toNumber()
                                    : 0
                                }
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end grid grid-rows-2 py-2">
                        <div>
                            <h2 className="subpixel-antialiased font-medium text-base lining-nums ">
                                Total Executado: {area0burned + area1burned + area2burned + area3burned }<br></br>
                            </h2>
                        </div>
                        <div>
                            <p className="subpixel-antialiased font-light lining-nums text-base ">
                                - Ordinária: {area0burned}<br></br>
                                - Educação: {area1burned}<br></br>
                                - Infra: {area2burned}<br></br>
                                - Saúde: {area3burned}<br></br>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="py-6 overflow-visible">
                        <PieChart width={400} height={400} >
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={initialBudgetChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />          
                            <Tooltip />
                        </PieChart>
                    </div>

                </div>


                
            </div>
        <button className="border rounded bg-red-400" onClick={handleRender}> render </button>
        </main>
        </>
    )


    
}

export default main;