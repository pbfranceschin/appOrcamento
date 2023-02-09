import Head from 'next/head';
import Header from './itens/Header';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useContract, useSigner } from 'wagmi';

import { getContractData } from '../utils';
import AddOrg from '../components/owner/AddOrg';
import AddArea from '../components/owner/AddArea';
import SubOrg from '../components/owner/SubOrg';
import SubArea from '../components/owner/SubArea';
import Burn from '../components/owner/Burn'
import Mint from '../components/owner/Mint'



const [contractAddress, contractABI] = getContractData()
const buttonSendDefault = "Enviar";
const success_msg = 'Operação realizada com sucesso'


export default function OwnerPage() {
    
    const { data: signerData } = useSigner();
    const Contract = useContract({
        address: contractAddress,
        abi: contractABI,
        signerOrProvider: signerData
    });

    const [buttonAddOrgText, setButtonAddOrgText ] = useState(buttonSendDefault);
    const [buttonAddAreaText, setButtonAddAreaText ] = useState(buttonSendDefault);
    const [buttonSubOrgText, setButtonSubOrgText] = useState(buttonSendDefault);
    const [buttonSubAreaText, setButtonSubAreaText ] = useState(buttonSendDefault);
    const [buttonMintText, setButtonMintText] = useState(buttonSendDefault);
    const [buttonBurnText, setButtonBurnText] = useState(buttonSendDefault);
    
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
    // mint
    const [valueMint, setValueMint] = useState('');
    const [addressMint, setAddressMint] = useState('');
    const [areaMint, setAreaMint] = useState('')
    // burn
    const [valueBurn, setValueBurn] = useState('');
    const [addressBurn, setAddressBurn] = useState('');
    const [areaBurn, setAreaBurn] = useState('');
    
    // // // // // // // //
    // contract callers //
    // // // // // // // /
    const addOrg = async (
        account,
        area,
        name
    ) => {
        if(!signerData) {
            alert("Conecte a carteira para realizar essa operação")
            return
        }
        if(buttonAddOrgText !== buttonSendDefault){
            return
        }
        let error = null
        let txReceipt
        try {
            setButtonAddOrgText('Assinando...')
            console.log('Adding account', account,'to area', area)
            const tx = await Contract.addOrg(account, area, name)
            setButtonAddOrgText('Enviando...')
            txReceipt = await tx.wait()
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonAddOrgText(buttonSendDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            alert(success_msg)
            setButtonAddOrgText(buttonSendDefault)
            setAddress1stAdd('')
            setArea1stAdd('')
            setNameAdd('')
        }
    }
    
    const addArea = async (
        account,
        area
        ) => {
            if(!signerData) {
                alert("Conecte a carteira para realizar essa operação")
                return
            }
            if(buttonAddAreaText !== buttonSendDefault){
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
                setButtonAddAreaText(buttonSendDefault)
            }
            if(error === null) {
                console.log('success')
                console.log(txReceipt)
                alert(success_msg)
                setButtonAddAreaText(buttonSendDefault)
                setAddressAdd('')
                setAreaAdd('')
            }
    }

    const subOrg = async (account) => {
        if(!signerData) {
            alert("Conecte a carteira para realizar essa operação")
            return
        }
        if(buttonSubOrgText !== buttonSendDefault) {
            return
        }
        let error = null
        let txReceipt
        try{
            setButtonSubOrgText('Assinando...')
            console.log('Revoking account', account)
            const tx = await Contract.subOrg(account)
            setButtonSubOrgText('Enviando...')
            txReceipt = await tx.wait()
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonSubOrgText(buttonSendDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            alert(success_msg)
            setButtonSubOrgText(buttonSendDefault)
            setAddressSubOrg('')            
        }
    }

    const subArea = async (
        account,
        area
        ) => {
        if(!signerData) {
            alert("Conecte a carteira para realizar essa operação")
            return
        }
        if( buttonSubAreaText !== buttonSendDefault) {
            return
        }
        let error = null
        let txReceipt
        try{
            setButtonSubAreaText('Assinando...')
            console.log('Subtracting account', account, 'from area', area)
            const tx = await Contract.subArea(account, area)
            setButtonSubOrgText('Enviando...')
            txReceipt = await tx.wait()
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonSubAreaText(buttonSendDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            alert(success_msg)
            setButtonSubAreaText(buttonSendDefault)
            setAddressSubArea('')
            setAreaSub('')
        }
    }

    const mint = async (
        account,
        area,
        amount
    ) => {
        if(!signerData) {
            alert("Conecte a carteira para realizar essa operação")
            return
        }
        if( buttonSubAreaText !== buttonSendDefault) {
            return
        }
        let error = null
        let txReceipt
        try{
            setButtonSubAreaText('Assinando...')
            console.log('minting', amount,'of area', area, 'to account', account)
            const tx = await Contract.mint(account, area, amount)
            setButtonMintText('Enviando...')
            txReceipt = await tx.wait()
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonMintText(buttonSendDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            alert(success_msg)
            setButtonMintText(buttonSendDefault)
            setValueMint('')
            setAddressMint('')
            setAreaMint('')
        }
    }

    const burn = async (
        account,
        area,
        amount
    ) => {
        if(!signerData) {
            alert("Conecte a carteira para realizar essa operação")
            return
        }
        if( buttonSubAreaText !== buttonSendDefault) {
            return
        }
        let error = null
        let txReceipt
        try{
            setButtonBurnText('Assinando...')
            console.log('burning', amount,'of area', area, 'from account', account)
            const tx = await Contract.burn(account, area, amount)
            setButtonBurnText('Enviando...')
            txReceipt = await tx.wait()
        } catch(err){
            console.log(err)
            error = err
            let msg = "Erro:\n".concat(err)
            alert(msg)
            setButtonBurnText(buttonSendDefault)
        }
        if(error === null) {
            console.log('success')
            console.log(txReceipt)
            alert(success_msg)
            setButtonBurnText(buttonSendDefault)
        }
    }

    // // // // // //
    // handlers // /
    // // // // // /

    const handleAddOrg = () => {
        if(!address1stAdd) {
            alert('Preencha o campo do endereço')
            return
        }
        if(!area1stAdd) {
            addOrg(address1stAdd, 0, nameAdd)
            return
        }
        addOrg(address1stAdd, area1stAdd, nameAdd)
        
    }

    const handleAddArea = () => {
        if(!addressAdd || !areaAdd){
            alert('Preencha os campos _endereço_ e _area_')
            return
        }
        addArea(addressAdd, areaAdd)
        
    }

    const handleSubOrg = () => {
        if(!addressSubOrg) {
            alert('Preencha o campo endereço')
            return
        }
        subOrg(addressSubOrg)
    }

    const handleSubArea = () => {
        if(!addressSubArea || !areaSub) {
            alert('Preencha os campos _endereço_ e _area_')
            return
        }
        subArea(addressSubArea, areaSub)
    }

    const handleMint = () => {
        if(!valueMint || !addressMint || !areaMint){
            alert('preencha todos os campos')
            return
        }
        mint(addressMint, areaMint, valueMint)
    }

    const handleBurn = () => {
        if(!valueBurn || ! addressBurn || !areaBurn){
            alert('preencha todos os campos')
            return
        }
        burn(addressBurn, areaBurn, valueBurn)
        setValueBurn('')
        setAddressBurn('')
        setAreaBurn('')
    }

    
    return (
        <>
        <Head>
            <title>App Orçamento da União</title>
            <meta name="description" content="Created by FGV-ECMI" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header title='Controle do Orçamento' />
        <div className='px-2 py-2'>
        <ConnectButton />
        </div>

        <main>
            <div className='py-2 px-2 flex justify-center'>
                <h1 className='text-lg font-semibold text-red-500 italic'>
                    Essa seção é de uso exclusivo do órgão de controle do Orçamento
                </h1>
            </div>
            <div className='px-2 py-2 grid grid-rows-2 gap-4'>
                <div className='rounded-lg shadow-md bg-slate-100'>
                    <div className='px-2 py-2 justify-center content-center items-center'>
                        <h1 className='text-lg font-medium'>Cadastro</h1>
                    </div>
                    <div className='grid grid-rows-2'>
                        
                        <div className='px-2 grid grid-cols-2'>
                            <div>
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
                        <div className='py-2 px-2 grid grid-cols-2'>
                            <div>
                                <SubOrg 
                                addressSubOrg={addressSubOrg}
                                setAddressSubOrg={setAddressSubOrg}
                                handleSubOrg={handleSubOrg}
                                buttonSubOrgText={buttonSubOrgText}
                                />
                            </div>
                            <div>
                                <SubArea 
                                addressSubArea={addressSubArea}
                                setAddressSubArea={setAddressSubArea}
                                areaSub={areaSub}
                                setAreaSub={setAreaSub}
                                buttonSubAreaText={buttonSubAreaText}
                                handleSubArea={handleSubArea}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='rounded-lg shadow-md bg-slate-100'>
                    <div className='px-2 py-2 justify-center content-center items-center'>
                        <h1 className='text-lg font-medium'>Controle da Verba</h1>
                    </div>
                    <div className='px-2 grid grid-cols-2'>
                        <div>
                            <Mint
                            addressMint={addressMint}
                            setAddressMint={setAddressMint}
                            areaMint={areaMint}
                            setAreaMint={setAreaMint}
                            valueMint={valueMint}
                            setValueMint={setValueMint}
                            handleMint={handleMint}
                            buttonMintText={buttonMintText}
                            />
                        </div>
                        <div>
                        <Burn 
                            addressBurn={addressBurn}
                            setAddressBurn={setAddressBurn}
                            areaBurn={areaBurn}
                            setAreaBurn={setAreaBurn}
                            valueBurn={valueBurn}
                            setValueBurn={setValueBurn}
                            handleBurn={handleBurn}
                            buttonBurnText={buttonBurnText}
                            />
                        </div>
                    </div>

                </div>

            </div>

        </main>
        
        </>


    )
}