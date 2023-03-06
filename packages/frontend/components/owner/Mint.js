import React from "react";
import AreaDropdown from "../AreaDropdown";

const Mint = (props) => {

    return (
        <>
        <div>
            <h1 >
                Emissão de saldo
            </h1>
        </div>
        <div className='form-control pb-2'>
            <input
                className="border rounded p-1"
                type='text'
                placeholder = "endereço"
                value={props.addressMint}
                onChange = {(e) => props.setAddressMint(e.target.value)}
            />
            {/* <input
                className="border rounded"
                type='number'
                placeholder = "área"
                value={props.areaMint}
                onChange = {(e) => props.setAreaMint(e.target.value)}
            /> */}
            <input
                className="border rounded p-1"
                type='number'
                placeholder = "montante"
                value={props.valueMint}
                onChange = {(e) => props.setValueMint(e.target.value)}
            />
            <AreaDropdown
                setArea={props.setAreaMint}
                defaultValue=""
                defaultLabel="área"
            />
        </div>
        <div >
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={props.handleMint}
            >
                {props.buttonMintText}
            </button>
        </div>
        </>
    )
}

export default Mint;