import { ethers } from "ethers";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { getContractData } from '../utils';
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

const main = () => {

    const provider = useProvider()
    const contract = useContract({
        address: contractAddress,
        abi: contractABI,
        signerOrProvider: provider
    })

    const [budget, setBudget] = useState([])
    const budgetLen = useRef(0)
    const area0initial$ = useRef(0)
    const area1initial$ = useRef(0)
    const area2initial$= useRef(0)
    const area3initial$ = useRef(0)
    
    
    useEffect(() => {
        if(budgetLen.current > 0){
            console.log('atualiza as areas')
            area0initial$.current = (budget[budgetLen.current - 1].mul(budget[0])).div(100)
            area1initial$.current = (budget[budgetLen.current - 1].mul(budget[1])).div(100)
            area2initial$.current = (budget[budgetLen.current - 1].mul(budget[2])).div(100)
            area3initial$.current = (budget[budgetLen.current - 1].mul(budget[3])).div(100)
            console.log('verbas', area0initial$, area1initial$) //<<<======= ta atualizando as area$: fazer o gráfico !!!!

        }
    },[budgetLen.current])
    
    useEffect(() => {
        console.log('budget initializer')
        getBudget(contract).then(response => {
            setBudget(response)
            budgetLen.current = response.length
        })
        
    },[])

    
    const chartData = [
        {name: 'Ordinária', value: area0initial$},
        {name: 'Educação', value: area1initial$},
        {name: 'Infra', value: area2initial$},
        {name: 'Saúde', value: area3initial$ },
    ]   
        

    return (
        <>
        <main>
            <Head>
                <title>Dados do Orçamento - Desenvolvido por FGV-ECMI</title>
                <meta content="Desenvolvido por FGV-ECMI"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="grid grid-cols-3 py-4 px-2 justify-center">
                <div className="flex justify-center items-center border py-3 px-2 grid grid-rows-2">
                    <div>
                        <h2 className="subpixel-antialiased font-medium text-lg lining-nums hover:font-bold"
                        >
                            Orçamento Inicial: {budgetLen.current > 0 ? budget[budgetLen.current - 1].toString() : 0 }
                        </h2>
                    </div>
                    <div>
                        <p className="subpixel-antialiased font-normal lining-nums text-base">
                            -Ordinária: {budgetLen.current > 0 ? budget[0].toString() : 0}<br></br>
                            -Educação: {budgetLen.current > 0 ? budget[1].toString() : 0}<br></br>
                        </p>
                    </div>
                </div>
                
            </div>

        </main>
        </>
    )


    
}

export default main;