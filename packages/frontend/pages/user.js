import Head from 'next/head';
import Header from './itens/DataHeader';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, PureComponent } from 'react';
// import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

// import newStyle from '../styles/new.module.css'

import SingleTransfer from '../components/user/SingleTransfer';
import BatchTransfer from '../components/user/BatchTransfer';
import GetArea from '../components/user/GetArea';
import GetBalance from '../components/user/GetBalance';
import GetAddress from '../components/user/GetAddress';
import GetName from '../components/user/GetName';

import {
    useContract,
    useProvider,
    useSigner,
} from "wagmi";

import { getContractData } from '../utils';

const [contractAddress, contractABI] = getContractData();
const buttonSendDefault = "Enviar";
const buttonViewDefault = "Consultar";


export default function ApplicationSite() {

    const { data: signerData } = useSigner();
    const provider = useProvider();
    const Contract = useContract({
        address: contractAddress,
        abi: contractABI,
        signerOrProvider: provider
    });

    const [buttonSingleText, setButtonSingleText] = useState(buttonSendDefault);
    const [buttonBatchText, setButtonBatchText] = useState(buttonSendDefault);
    const [buttonGetBalanceText, setButtonGetBalanceText] = useState(buttonViewDefault);
    const [buttonGetAreaText, setButtonGetAreaText] = useState(buttonViewDefault);
    const [buttonGetAddressText, setButtonGetAddressText ] = useState(buttonViewDefault);
    const [buttonGetNameText, setButtonGetNameText] = useState(buttonViewDefault);
    const [buttonAddOrgText, setButtonAddOrgText ] = useState(buttonSendDefault);
    const [buttonAddAreaText, setButtonAddAreaText ] = useState(buttonSendDefault);
    const [buttonSubOrgText, setButtonSubOrgText] = useState(buttonSendDefault);
    const [buttonSubAreaText, setButtonSubAreaText ] = useState(buttonSendDefault);

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
    // getAddress
    const [nameGet, setNameGet] = useState('');
    const [addressShow, setAddressShow] = useState('');

    // getName
    const [addressGet, setAddressGet] = useState('')
    const [nameShow, setNameShow] = useState('')

    // addOrg
    const [address1stAdd, setAddress1stAdd] = useState('');
    const [area1stAdd, setArea1stAdd] = useState('');
    const [nameAdd, setNameAdd] = useState('');
    // addArea
    const [addressAdd, setAddressAdd] = useState('');
    const [areaAdd, setAreaAdd] = useState('');
    // subOrg
    const [addressSubOrg, setAddressSubOrg] = useState('');
    // subArea
    const [addressSubArea, setAddressSubArea] = useState('');
    const [areaSub, setAreaSub] = useState('');
    
    // chartData
    // const [budgetTotal, setBudgetTotal] = useState(0);
    // const [budget0, setBudget0] = useState(0);
    // const [budget1, setBudget1] = useState(0);
    // const [budget2, setBudget2] = useState(0);
    // const [budget3, setBudget3] = useState(0);


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
        if(buttonSingleText !== buttonSendDefault){
            return
        }
        const signerAddress = await signerData.getAddress()
        let error = null
        let txReceipt
        try {
            setButtonSingleText("Assinando...")
            console.log('singleTransfer from', signerAddress, 'to', to)
            const tx = await Contract.connect(signerData).safeTransferFrom(
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
            setButtonSingleText(buttonSendDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            setButtonSingleText(buttonSendDefault)
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
        if(buttonBatchText !== buttonSendDefault){
            return
        }
        const signerAddress = await signerData.getAddress()
        let error = null
        let txReceipt
        try {
            setButtonBatchText("Assinando...")
            console.log('batchTransfer from', signerAddress, 'to', to)
            const tx = await Contract.connect(signerData).safeBatchTransferFrom(
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
            setButtonBatchText(buttonSendDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            setButtonBatchText(buttonSendDefault)
            setBatchAddress('')
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

    const getAddress = async (
        name
    ) => {
        if(buttonGetAddressText !== buttonViewDefault){
            return
        }
        setAddressShow('')
        let error = null
        let address_
        try {
            setButtonGetAddressText('Carregando...')
            address_ = await Contract.getAddress(name)
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonGetAddressText(buttonViewDefault)
        }
        if(error === null){
            console.log('success')
            setButtonGetAddressText(buttonViewDefault)
            console.log(address_)
            if(address_.toString() === '0x0000000000000000000000000000000000000000'){
                setAddressShow('Inexistente')
                return
            }
            setAddressShow(address_.toString())
        }
    }

    const getName = async (
        address
    ) => {
        if(buttonGetNameText !== buttonViewDefault){
            return
        }
        setNameShow('')
        let error = null
        let name_
        try {
            setButtonGetNameText('Carregando...')
            name_ = await Contract.getName(address)
        } catch(err) {
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonGetNameText(buttonViewDefault)
        }
        if(error === null) {
            console.log('success')
            setButtonGetNameText(buttonViewDefault)
            console.log(name_)
            if(name_.toString() === ''){
                setNameShow('Não registrado')
                return
            }
            setNameShow(name_.toString())
        }
    }
    

    // // // // handlers // // // 
    // // // // // // // // // //
    const handleSingleTransfer = () => {
        if(!valueSingle || !addressSingle || !areaSingle){
            alert('Preencha os campos endereço , montante e selecione a área de atuação')
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
            alert('pelo menos um dos pares (area, montante) está imcompleto!')
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

    const handleGetBalance = () => {
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

    const handleGetAddress = () => {
        if(!nameGet){
            alert('Preencha o campo com o nome do órgão')
            return
        }
        getAddress(nameGet)
    }

    const handleGetName = () => {
        if(!addressGet){
            alert('Preencha o campo com o endereço')
            return
        }
        getName(addressGet)
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
                <title>Orçamento Público | FGV-ECMI</title>
                <meta name="description" content="Created by FGV-ECMI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header title='App Orçamento Público' />
            <div className='py-2 px-2'>
                <ConnectButton />
            </div>
            

            <main className="p-6">
            {/* <div className={newStyle.centerClose}>
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
            </div> */}
                <div className='flex justify-center py-6'>
                    <h2 className='font-bold text-xl'>Repasses</h2>
                </div>
                <div className='rounded-lg shadow-md bg-slate-100 px-4 py-4 '>
                    <div className='flex justify-center p-4'>
                    <p className='pb-2 italic'><b>Áreas: </b>
                        0 = Verba Ordinária;
                        1 = Educação;
                        2 = Infraestrutura;
                        3 = Saúde
                        </p>
                    </div>
                    <div className='pb-6 px-2 lg:grid grid-cols-2'>
                        <div className=''>
                            <p className='py-2' >Transferência simples</p>
                            <SingleTransfer 
                                addressSingle={addressSingle}
                                valueSingle={valueSingle}
                                areaSingle={areaSingle}
                                setValueSingle={setValueSingle}
                                setAreaSingle={setAreaSingle}
                                setAddressSingle={setAddressSingle}
                                handleSingleTransfer={handleSingleTransfer}
                                buttonSingleText={buttonSingleText}
                            />
                        </div>
                        <div>
                            <p className='py-2'>Transferência em lote</p>
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
                                handleBatchTransfer={handleBatchTransfer}
                                buttonBatchText={buttonBatchText}
                            />                    
                        </div>
                    </div>
                </div>
                <div className='flex justify-center py-6 pt-10'>
                    <h2 className='font-bold text-xl'>Consultas</h2>                    
                </div>
                <div className='rounded-lg shadow-md bg-slate-100 px-4 pt-4 pb-6 mb-8'>
                    <div className='flex justify-center p-4'>
                        <p className='pb-2 italic'><b>Áreas: </b>
                        0 = Verba Ordinária;
                        1 = Educação;
                        2 = Infraestrutura;
                        3 = Saúde
                        </p>
                    </div>
                    <div className='lg:grid grid-cols-2'>
                        <div>
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
                                <p className='py-2'><i>Saldo:</i> {balance}</p>
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
                                <p className='pt-2'><i>Áreas:</i> {areas}</p>              
                                
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Consulta de Endereço</p>
                                <GetAddress
                                    nameGet={nameGet}
                                    setNameGet={setNameGet}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleGetAddress}
                                >
                                    {buttonGetAddressText}
                                </button>
                                <p className='pt-2'><i>Endereço:</i> {addressShow}</p>
                            </div>
                            <div className='pt-2'>
                                <p>Consulta de Nome</p>
                                <GetName
                                    addressGet={addressGet}
                                    setAddressGet={setAddressGet}
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleGetName}
                                >
                                    {buttonGetNameText}
                                </button>
                                <p className='pt-2'><i>Nome:</i> {nameShow}</p>
                            </div>

                        </div>
                    </div>
                </div>
                
                {/* <div className={newStyle.center}>
                    <h2 className='font-bold text-xl'>Controle</h2>
                    
                </div>
                <div className='pb-4 flex justify-center items-center'>
                    <p className='text-red-400 font-bold italic'>
                        Os métodos abaixo são de
                        uso exclusivo do órgão de controle
                    </p>
                </div>
                <div className='grid grid-cols-2'>
                    <div>
                        <div className='pb-2'>
                            <AddOrg 
                                address1stAdd={address1stAdd}
                                setAddress1stAdd={setAddress1stAdd}
                                area1stAdd={area1stAdd}
                                setArea1stAdd={setArea1stAdd}
                                nameAdd={nameAdd}
                                setNameAdd={setNameAdd}
                                handleAddOrg={handleAddOrg}
                                buttonAddOrgText={buttonAddOrgText}
                            />
                            
                        </div>
                        <div>
                            <AddArea
                                addressAdd={addressAdd}
                                setAddressAdd={setAddressAdd}
                                areaAdd={areaAdd}
                                setAreaAdd={setAreaAdd}
                                handleAddArea={handleAddArea}
                                buttonAddAreaText={buttonAddAreaText}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <SubOrg
                            addressSubOrg={addressSubOrg}
                            setAddressSubOrg={setAddressSubOrg}
                            handleSubOrg={handleSubOrg}
                            buttonSubOrgText={buttonSubOrgText}
                            />
                            
                        </div>
                        <div className='pt-2'>
                            <SubArea
                            addressSubArea={addressSubArea}
                            setAddressSubArea={setAddressSubArea}
                            areaSub={areaSub}
                            setAreaSub={setAreaSub}
                            handleSubArea={handleSubArea}
                            buttonSubAreaText={buttonSubAreaText}
                            />                            
                        </div>
                    </div>
                </div> */}
            </main>

        </>      
    )

}