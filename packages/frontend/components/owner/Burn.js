import React from "react";

const Burn = (props) => {

    return (
        <>
        <div className='form-control pb-2'>
            <input
                className="border rounded"
                type='text'
                placeholder = "endereço"
                value={props.addressBurn}
                onChange = {(e) => props.setAddressBurn(e.target.value)}
            />
            <input
                className="border rounded"
                type='number'
                placeholder = "área"
                value={props.areaBurn}
                onChange = {(e) => props.setAreaBurn(e.target.value)}
            />
            <input
                className="border rounded"
                type='number'
                placeholder = "montante"
                value={props.amountBrun}
                onChange = {(e) => props.setAmountBurn(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={props.handleBurn}
            >
                Queimar
            </button>
        </div>
        </>
    )
}

export default Burn;