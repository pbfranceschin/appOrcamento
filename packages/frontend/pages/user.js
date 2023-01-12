import Head from 'next/head';
import Link from 'next/link';
import Header from './itens/Header';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import styles from '../styles/Home.module.css'
import newStyle from '../styles/new.module.css'

import SingleTransfer from '../components/user/SingleTransfer';
import BatchTransfer from '../components/user/BatchTransfer';
import GetArea from '../components/user/GetArea';
import GetBalance from '../components/user/GetBalance';
import AddOrg from '../components/owner/AddOrg';
import AddArea from '../components/owner/AddArea';

import {
    useContract,
    useContractRead,
    usePrepareContractWrite,
    useContractWrite,
    useSigner,
    useWaitForTransaction,
    chain,
} from "wagmi";

import { getContractData } from '../utils';
import { arrayify } from 'ethers/lib/utils';


const [contractAddress, contractABI] = getContractData();

const buttonTransferDefault = "Transferir";
// const buttonBatchDefault = "Transferir";
const buttonViewDefault = "Consultar";
// const buttonGetAreaDefault = "Consultar";
const buttonAddDefault = "Cadastrar";
// const buttonAddAreaDefault = "Cadastrar";

export default function ApplicationSite() {

    const { data: signerData } = useSigner();
    const Contract = useContract({
        address: contractAddress,
        abi: contractABI,
        signerOrProvider: signerData
    });

    const [buttonSingleText, setButtonSingleText] = useState(buttonTransferDefault);
    const [buttonBatchText, setButtonBatchText] = useState(buttonTransferDefault);
    const [buttonGetBalanceText, setButtonGetBalanceText] = useState(buttonViewDefault);
    const [buttonGetAreaText, setButtonGetAreaText] = useState(buttonViewDefault);
    const [buttonAddOrgText, setButtonAddOrgText ] = useState(buttonAddDefault);
    const [buttonAddAreaText, setButtonAddAreaText ] = useState(buttonAddDefault);

    // SingleTransfer
    const [valueSingle, setValueSingle] = useState('');
    const [areaSingle, setAreaSingle] = useState('');
    const [addressSingle, setAddressSingle] = useState('');

    // BatchTransfer
    const [batchAddress, setBatchAddress] = useState('');
    const [batchValue1, setBatchValue1] = useState('');
    const [batchArea1, setBatchArea1] = useState('');
    const [batchValue2, setBatchValue2] = useState('');
    const [batchArea2, setBatchArea2] = useState('');
    const [batchValue3, setBatchValue3] = useState('');
    const [batchArea3, setBatchArea3] = useState('');
    const [batchValue4, setBatchValue4] = useState('');
    const [batchArea4, setBatchArea4] = useState('');
    // getBalance
    const [addressBalance, setAddressBalance] = useState('');
    const [areaBalance, setAreaBalance] = useState('');
    const [balance, setBalance] = useState('');
    // getArea
    const [areaGet, setAreaGet] = useState('');
    const [areas, setAreas] = useState('');

    // addOrg
    const [address1stAdd, setAddress1stAdd] = useState('');
    const [area1stAdd, setArea1stAdd] = useState('');
    // addArea
    const [addressAdd, setAddressAdd] = useState('');
    const [areaAdd, setAreaAdd] = useState('');
    

    // // contract callers // // // //
    // // // // // // // // // // // /
    const transferSingle = async (
        to,
        area,
        amount,    
        ) =>{
        if(!signerData) {
            alert("Conecte a carteira para transferir")
            return
        }
        if(buttonSingleText !== buttonTransferDefault){
            return
        }
        const signerAddress = await signerData.getAddress()
        let error = null
        let txReceipt
        try {
            setButtonSingleText("Assinando...")
            console.log('singleTransfer from', signerAddress, 'to', to)
            const tx = await Contract.safeTransferFrom(
                signerAddress,
                to,
                area,
                amount,
                '0x00'
            )
            setButtonSingleText("Enviando...")
            txReceipt = await tx.wait()
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonSingleText(buttonTransferDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            setButtonSingleText(buttonTransferDefault)
            setAddressSingle('')
            setValueSingle('')
            setAreaSingle('')
            alert('Transferencia realizada com sucesso')
        }
    }

    const transferBatch = async (
        to,
        areas,
        amounts,
        ) =>{
        if(!signerData) {
            alert("Conecte a carteira para transferir")
            return
        }
        if(buttonBatchText !== buttonTransferDefault){
            return
        }
        const signerAddress = await signerData.getAddress()
        let error = null
        let txReceipt
        try {
            setButtonBatchText("Assinando...")
            console.log('batchTransfer from', signerAddress, 'to', to)
            const tx = await Contract.safeBatchTransferFrom(
                signerAddress,
                to,
                areas,
                amounts,
                '0x00'
            )
            setButtonBatchText("Enviando...")
            txReceipt = await tx.wait()
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonBatchText(buttonTransferDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            setButtonBatchText(buttonTransferDefault)
            setBatchValue1('')
            setBatchValue2('')
            setBatchValue3('')
            setBatchValue4('')
            setBatchArea1('')
            setBatchArea2('')
            setBatchArea3('')
            setBatchArea4('')
            alert('Transferencia realizada com sucesso')
        }
    }

    const getBalance = async (
        account,
        area
    ) => {
        if(buttonGetBalanceText !== buttonViewDefault) {
            return
        }
        let error = null
        let bal
        try {
            setButtonGetBalanceText('Consultando...')
            bal = await Contract.balanceOf(account, area)
            console.log('piiing2')
        } catch(err) {
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonGetBalanceText(buttonViewDefault)
        }
        if(error == null) {
            console.log('success')
            setButtonGetBalanceText(buttonViewDefault)
            setBalance(bal.toString())
        }

    }

    
    const getArea = async (
        account,        
    ) => {
        if(buttonGetAreaText !== buttonViewDefault){
            return
        }
        setAreas('')
        let error = null
        let areas_
        try {
            setButtonGetAreaText('Carregando...')
            areas_ = await Contract.getAreas(account)
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonGetAreaText(buttonViewDefault)
        }
        if(error === null) {
            console.log('success')
            setButtonGetAreaText(buttonViewDefault)
            setAreas(areas_.toString())
        }
    }
    
    const addOrg = async (
        account,
        area
    ) => {
        if(buttonAddOrgText !== buttonAddDefault){
            return
        }
        let error = null
        let txReceipt
        try {
            setButtonAddOrgText('Assinando...')
            console.log('Adding account', account,'to area', area)
            const tx = await Contract.addOrg(account, area)
            setButtonAddOrgText('Enviando...')
            txReceipt = await tx.wait()
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonAddOrgText(buttonAddDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            alert('Cadastro realizado com sucesso!')
            setButtonAddOrgText(buttonAddDefault)
            setAddress1stAdd('')
            setArea1stAdd('')
        }
    }
    
    const addArea = async (
        account,
        area
        ) => {
            if(buttonAddAreaText !== buttonAddDefault){
                return
            }
            let error = null
            let txReceipt
            try{
                setButtonAddAreaText('Assinando...')
                console.log('Adding account', account,'to area', area)
                const tx = await Contract.addArea(account, area)
                setButtonAddAreaText('Enviando...')
                txReceipt = await tx.wait()
            } catch(err){
                console.log(err)
                error = err
                let msg = "Erro:\n".concat(err)
                alert(msg)
                setButtonAddAreaText(buttonAddDefault)
            }
            if(error === null) {
                console.log('success')
                console.log(txReceipt)
                alert('Cadastro realizado com sucesso!')
                setButtonAddAreaText(buttonAddDefault)
                setAddressAdd('')
                setAreaAdd('')
            }
    }

    // // // // handlers // // // 
    // // // // // // // // // //
    const handleSingleTransfer = () => {
        if(!valueSingle || !addressSingle){
            alert('Preencha os campos _endereço_ e _montante_')
            return
        }
        transferSingle(addressSingle, areaSingle, valueSingle)
    }
 
    const handleBatchTransfer = () => {
        if(!batchAddress){
            alert('Preencha o campo _endereço_ ')
            return
        }
        if(
            !(batchValue1 && batchArea1) &&
            !(batchValue2 && batchArea2) &&
            !(batchValue3 && batchArea3) &&
            !(batchValue4 && batchArea4)
            ) {
                alert('preencha pelo menos um dos pares (area, montante)')
                return
            }
        if(
            (!batchValue1 && batchArea1) ||
            (batchValue1 && !batchArea1) ||
            (!batchValue2 && batchArea2) ||
            (batchValue2 && !batchArea2) ||
            (!batchValue3 && batchArea3) ||
            (batchValue3 && !batchArea3) ||
            (!batchValue4 && batchArea4) ||
            (batchValue4 && !batchArea4)
        ) {
            alert('um dos pares (area, montante) está imcompleto!')
            return
        }
        let values = new Array()
        let areas = new Array()
        if(batchValue1){
            values.push(batchValue1)
            areas.push(batchArea1)
        }
        if(batchValue2){
            values.push(batchValue2)
            areas.push(batchArea2)
        }
        if(batchValue3){
            values.push(batchValue3)
            areas.push(batchArea3)
        }
        if(batchValue4){
            values.push(batchValue4)
            areas.push(batchArea4)
        }
        
        transferBatch(batchAddress, areas, values)
    }

    const handleGetBalance = () =>{
        if(!addressBalance || !areaBalance) {
            alert('Preencha os campos _endereço_ e _area_')
            return
        }
        getBalance(addressBalance, areaBalance)
    }

    const handleGetArea = () => {
        if(!areaGet) {
            alert('Preencha o campo _endereço_')
            return
        }
        getArea(areaGet)
    }

    const handleAddOrg = () => {
        if(!address1stAdd) {
            alert('Preencha o campo do endereço')
            return
        }
        if(!area1stAdd) {
            addOrg(address1stAdd, 0)
            // setAddress1stAdd('')
            // setArea1stAdd('')
            return
        }
        addOrg(address1stAdd, area1stAdd)
        // setAddress1stAdd('')
        // setArea1stAdd('')
    }

    const handleAddArea = () => {
        if(!addressAdd || !areaAdd){
            alert('Preencha os campos _endereço_ e _area_')
            return
        }
        addArea(addressAdd, areaAdd)
        // setAddressAdd('')
        // setAreaAdd('')
    }



    ///////////////// TESTE ///////////////////////
    //////////////////////////////////////////////
    // const teste2 = () => {
    //     alert('botao funcionando')
    // }
    
    // const [trossoqualquer, setTrossoqualquer] = useState(0);

    // const teste = async(xxx) => {
    //     let error = null
    //     let txReceipt
    //     const signerAddress = await signerData.getAddress()
    //     try {            
    //         console.log('trossoqualquer', xxx, 'de', signerAddress)
    //         const tx = await Contract.teste(xxx)
    //         txReceipt = await tx.wait()
    //     } catch(err){
    //         console.log(err)
    //         error = err
    //         let msg = "Erro:\n".concat(err)
    //         alert(msg)
    //         setButtonSingleText(buttonSingleDefault)
    //     }
    //     if(error === null) {
    //         console.log('success')
    //         console.log(txReceipt)
    //     }        
    // }

    // const handleTrossoqualquer = () => {
    //     teste(trossoqualquer)
    // }

    ///////////////////////////////////////////////

    const verba_ = 10**12
    const chartData = [
        {name: 'Ordinária', value: (verba_*80)/100},
        {name: 'Educação', value: (verba_*5)/100},
        {name: 'Infra', value: (verba_*10)/100},
        {name: 'Saúde', value: (verba_*5)/100 },
    ]

    return (
        <>
            <Head>
                <title>App Orçamento da União</title>
                <meta name="description" content="Created by FGV-ECMI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <ConnectButton />
            

            <main className="justify-center content-center justify-items-center p-6">
            <div className={newStyle.centerClose}>
                <h2 className='font-bold text-xl'>Orçamento: {verba_}</h2>
            </div>
            <div className={newStyle.centerClose}>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />          
                    <Tooltip />
                </PieChart>
            </div>
                <div className={newStyle.center}>
                    <h2 className='font-bold text-xl'>Repasses</h2>
                </div>
                <div className='p-4'>
                <p className='pb-2 italic'><b>Áreas: </b>
                    0 = Verba Ordinária;
                    1 = Educação;
                    2 = Infraestrutura;
                    3 = Saúde
                    </p>
                {/* </div>
                <div> */}
                    <p >Transferência simples</p>
                    <SingleTransfer 
                        addressSingle={addressSingle}
                        valueSingle={valueSingle}
                        areaSingle={areaSingle}
                        setValueSingle={setValueSingle}
                        setAreaSingle={setAreaSingle}
                        setAddressSingle={setAddressSingle}
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSingleTransfer}
                    >
                        {buttonSingleText}
                    </button>
                {/* </div>
                <div> */}
                    <p className='pt-6'>Transferência em lote</p>
                    <BatchTransfer
                        batchAddress={batchAddress}                        
                        setBatchAddress={setBatchAddress}
                        batchValue1={batchValue1}
                        setBatchValue1={setBatchValue1}
                        batchValue2={batchValue2}
                        setBatchValue2={setBatchValue2}
                        batchValue3={batchValue3}
                        setBatchValue3={setBatchValue3}
                        batchValue4={batchValue4}
                        setBatchValue4={setBatchValue4}
                        batchArea1={batchArea1}
                        setBatchArea1={setBatchArea1}
                        batchArea2={batchArea2}
                        setBatchArea2={setBatchArea2}
                        batchArea3={batchArea3}
                        setBatchArea3={setBatchArea3}
                        batchArea4={batchArea4}
                        setBatchArea4={setBatchArea4}
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleBatchTransfer}
                    >
                        {buttonBatchText}
                    </button>
                </div>
                <div className={newStyle.center}>
                    <h2 className='font-bold text-xl'>Consultas</h2>                    
                </div>
                <div>
                    <p className='justify-self-center pb-2 italic'><b>Áreas: </b>
                    0 = Verba Ordinária;
                    1 = Educação;
                    2 = Infraestrutura;
                    3 = Saúde
                    </p>
                </div>
                <div >
                    <p>Consulta de Saldos</p>
                    <GetBalance 
                        addressBalance={addressBalance}
                        setAddressBalance={setAddressBalance}
                        areaBalance={areaBalance}
                        setAreaBalance={setAreaBalance}
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleGetBalance}
                    >
                        {buttonGetBalanceText}
                    </button>
                    <p className='py-2'>Saldo: {balance}</p>
                </div>
                <div >
                    <p>Consulta de Áreas</p>
                    <GetArea 
                        areaGet={areaGet}
                        setAreaGet={setAreaGet}
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleGetArea}
                    >
                        {buttonGetAreaText}
                    </button>
                    <p className='pt-2'>Áreas: {areas}</p>              
                    
                </div>
                
                
                <div className={newStyle.center}>
                    <h2 className='font-bold text-xl'>Controle</h2>
                    
                </div>
                <div className='pb-4'>
                    <p className='text-red-400 font-bold italic'>
                        Os métodos abaixo são de
                        uso exclusivo do órgão de controle
                    </p>
                </div>
                <div>
                    <p>Cadastramento de novo órgão</p>
                    <AddOrg 
                        address1stAdd={address1stAdd}
                        setAddress1stAdd={setAddress1stAdd}
                        area1stAdd={area1stAdd}
                        setArea1stAdd={setArea1stAdd}
                    />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddOrg}
                    >
                        {buttonAddOrgText}
                    </button>
                </div>
                <div>
                    <p className='pt-2'>Cadastramento de órgão a nova área</p>
                    <AddArea
                        addressAdd={addressAdd}
                        setAddressAdd={setAddressAdd}
                        areaAdd={areaAdd}
                        setAreaAdd={setAreaAdd}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddArea}
                    >
                        {buttonAddAreaText}
                    </button>
                </div>
                
            </main>

        </>      
    )

}