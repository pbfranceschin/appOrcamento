import Head from 'next/head';
// import Header from './itens/OwnerHeader';
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



export default function OwnerPage() {
    
    // const { data: signerData } = useSigner();
    // const Contract = useContract({
    //     address: contractAddress,
    //     abi: contractABI,
    //     signerOrProvider: signerData
    // });

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

        <main>
            <div className='grid grid-rows-3 gap-2'>
                <div>
                    <AddOrg />
                    <AddArea />
                </div>
                <div>
                    <SubOrg />
                    <SubArea />
                </div>
                <div>
                    <Mint />
                    <Burn />

                </div>

            </div>

        </main>
        
        </>


    )
}