import React from "react";

const Mint = (props) => {

    return (
        <>
        <div className='form-control pb-2'>
            <input
                className="border rounded"
                type='text'
                placeholder = "endereço"
                value={props.addressMint}
                onChange = {(e) => props.setAddressMint(e.target.value)}
            />
            <input
                className="border rounded"
                type='number'
                placeholder = "área"
                value={props.areaMint}
                onChange = {(e) => props.setAreaMint(e.target.value)}
            />
            <input
                className="border rounded"
                type='number'
                placeholder = "montante"
                value={props.amountMint}
                onChange = {(e) => props.setAmountMint(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={props.handleMint}
            >
                Emitir
            </button>
        </div>
        </>
    )
}

export default Mint;