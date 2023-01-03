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


const [contractAddress, contractABI] = getContractData();

const buttonSingleDefault = "Transferir";
const buttonGetBalanceDefault = "Consultar";
const buttonGetAreaDefault = "Consultar";
const buttonAddOrgDefault = "Cadastrar";
const buttonAddAreaDefault = "Cadastrar";

export default function ApplicationSite() {

    const { data: signerData } = useSigner();
    const Contract = useContract({
        address: contractAddress,
        abi: contractABI,
        signerOrProvider: signerData
    });

    const [buttonSingleText, setButtonSingleText] = useState(buttonSingleDefault);
    const [buttonGetBalanceText, setButtonGetBalanceText] = useState(buttonGetBalanceDefault);
    const [buttonGetAreaText, setButtonGetAreaText] = useState(buttonGetAreaDefault);
    const [buttonAddOrgText, setButtonAddOrgText ] = useState(buttonAddOrgDefault);
    const [buttonAddAreaText, setButtonAddAreaText ] = useState(buttonAddAreaDefault);

    // SingleTransfer
    const [valueSingle, setValueSingle] = useState('');
    const [areaSingle, setAreaSingle] = useState('');
    const [addressSingle, setAddressSingle] = useState('');

    // BatchTransfer
    // const [batchAddress, setBatchAddress] = useState();
    // const [batchValue1, setBacthValue1] = useState();
    // const [batchArea1, setBatchArea1] = useState();
    // const [batchValue2, setBacthValue2] = useState();
    // const [batchArea2, setBatchArea2] = useState();
    // const [batchValue3, setBacthValue3] = useState();
    // const [batchArea3, setBatchArea3] = useState();
    
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
    
    const transferSingle = async (
        to,
        area,
        amount,    
        ) =>{
        if(!signerData) {
            alert("Conecte a carteira para transferir")
            return
        }
        if(buttonSingleText !== buttonSingleDefault){
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
            setButtonSingleText(buttonSingleDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            setButtonSingleText(buttonSingleDefault)
            setAddressSingle('')
            setValueSingle('')
            setAreaSingle('')
        }
    }


    const getBalance = async (
        account,
        area
    ) => {
        if(buttonGetBalanceText !== buttonGetBalanceDefault) {
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
            setButtonGetBalanceText(buttonGetBalanceDefault)
        }
        if(error == null) {
            console.log('success')
            setButtonGetBalanceText(buttonGetBalanceDefault)
            setBalance(bal.toString())
        }

    }

    
    const getArea = async (
        account,        
    ) => {
        if(buttonSingleText !== buttonSingleDefault){
            return
        }
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
            setButtonGetAreaText(buttonGetAreaDefault)
        }
        if(error === null) {
            console.log('success')
            setButtonGetAreaText(buttonGetAreaDefault)
            setAreas(areas_.toString())
        }
    }
    
    const addOrg = async (
        account,
        area
    ) => {
        if(buttonAddOrgText !== buttonAddOrgDefault){
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
            setButtonAddOrgText(buttonAddOrgDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            alert('Endereço', account, 'adicionado à área', area, 'com sucesso!')
            setButtonAddOrgText(buttonAddOrgDefault)
        }
    }
    
    const addArea = async (
        account,
        area
        ) => {
            if(buttonAddAreaText !== buttonAddAreaDefault){
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
                setButtonAddAreaText(buttonAddAreaDefault)
            }
            if(error === null) {
                console.log('success')
                console.log(txReceipt)
                alert('Endereço ${account}, adicionado à área ${area} com sucesso!')
                setButtonAddAreaText(buttonAddAreaDefault)
            }
    }
 

    const handleSingleTransfer = () => {
        if(!valueSingle || !addressSingle){
            alert('Preencha os campos _endereço_ e _montante_')
            return
        }
        transferSingle(addressSingle, areaSingle, valueSingle)
    }

    const handleGetBalance = () =>{
        if(!addressBalance || !areaBalance) {
            alert('Preencha os campos _endereço_ e _montante_')
            return
        }
        console.log('piiiing')
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
            setAddress1stAdd('')
            setArea1stAdd('')
            return
        }
        addOrg(address1stAdd, area1stAdd)
        setAddress1stAdd('')
        setArea1stAdd('')
    }

    const handleAddArea = () => {
        if(!addressAdd || !areaAdd){
            alert('Preencha os campos _endereço_ e _area_')
            return
        }
        addArea(addressAdd, areaAdd)
        setAddressAdd('')
        setAreaAdd('')
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
                <title>App Orçamento da União 2023</title>
                <meta name="description" content="Created by FGV-ECMI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <ConnectButton />
            <div className={newStyle.center}>
                <h2>Orçamento: {verba_}</h2>
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

            <main className={styles.main}>
                <div className={styles.center}>
                    <h2>Repasses</h2>
                </div>
                <div>
                <p>Áreas:</p>
                    <p>0 = Verba Ordinária;
                    1 = Educação;
                    2 = Infraestrutura;
                    3 = Saúde
                    </p>
                </div>
                <div>
                    <p>Transferência simples</p>
                    <SingleTransfer 
                        addressSingle={addressSingle}
                        valueSingle={valueSingle}
                        areaSingle={areaSingle}
                        setValueSingle={setValueSingle}
                        setAreaSingle={setAreaSingle}
                        setAddressSingle={setAddressSingle}
                    />
                    <button
                        onClick={handleSingleTransfer}
                    >
                        {buttonSingleText}
                    </button>
                </div>
                <div>
                    <p>Transferência em lote</p>
                    <BatchTransfer
                        // setBatchAddress={setBatchAddress}
                        // setBacthValue1={setBacthValue1}
                        // setBacthValue2={setBacthValue2}
                        // setBacthValue3={setBacthValue3}
                        // setBatchArea1={setBatchArea1}
                        // setBatchArea2={setBatchArea2}
                        // setBatchArea3={setBatchArea3}
                    />
                </div>
                <div className={styles.center}>
                    <h2>Consultas</h2>                    
                </div>
                <div>
                    <p>Áreas:</p>
                    <p>0 = Verba Ordinária;
                    1 = Educação;
                    2 = Infraestrutura;
                    3 = Saúde
                    </p>
                </div>

                <div>
                    <p>Consulta de Saldos</p>
                    <GetBalance 
                        addressBalance={addressBalance}
                        setAddressBalance={setAddressBalance}
                        areaBalance={areaBalance}
                        setAreaBalance={setAreaBalance}
                    />
                    <button onClick={handleGetBalance}>
                        {buttonGetBalanceText}
                    </button>
                    <p>Saldo: {balance}</p>
                </div>
                <div>
                    <p>Consulta de Áreas</p>
                    <GetArea 
                        areaGet={areaGet}
                        setAreaGet={setAreaGet}
                    />

                    <p>Áreas: {areas}</p>              
                    
                </div>
                
                
                <div className={styles.center}>
                    <h2>Área de Controle</h2>
                    <button onClick={handleGetArea}>
                        {buttonGetAreaText}
                    </button>
                
                    
                </div>
                <div><p>Os métodos abaixo são de uso exclusivo do órgão de controle</p></div>
                <div>
                    <p>Cadastramento de novo órgão</p>
                    <AddOrg 
                        address1stAdd={address1stAdd}
                        setAddress1stAdd={setAddress1stAdd}
                        area1stAdd={area1stAdd}
                        setArea1stAdd={setArea1stAdd}
                    />
                    <button onClick={handleAddOrg}>
                        {buttonAddOrgText}
                    </button>
                </div>
                <div>
                    <p>Cadastramento de órgão a nova área</p>
                    <AddArea
                        addressAdd={addressAdd}
                        setAddressAdd={setAddressAdd}
                        areaAdd={areaAdd}
                        setAreaAdd={setAreaAdd}
                    />
                    <button onClick={handleAddArea}>
                        {buttonAddAreaText}
                    </button>
                </div>
                
            </main>

        </>      
    )

}