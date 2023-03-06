import React from "react";
import AreaDropdown from "../AreaDropdown";

const Burn = (props) => {

    return (
        <>
        <div>
            <h1 >
                Queima de saldo
            </h1>
        </div>
        <div className='form-control pb-2'>
            <input
                className="border rounded p-1"
                type='text'
                placeholder = "endereço"
                value={props.addressBurn}
                onChange = {(e) => props.setAddressBurn(e.target.value)}
            />
            {/* <input
                className="border rounded p-1"
                type='number'
                placeholder = "área"
                value={props.areaBurn}
                onChange = {(e) => props.setAreaBurn(e.target.value)}
            /> */}
            <input
                className="border rounded p-1"
                type='number'
                placeholder = "montante"
                value={props.valueBrun}
                onChange = {(e) => props.setValueBurn(e.target.value)}
            />
            <AreaDropdown
                setArea={props.setAreaBurn}
                defaultValue=""
                defaultLabel="área"
            />
        </div>
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={props.handleBurn}
            >
                {props.buttonBurnText}
            </button>
        </div>
        </>
    )
}

export default Burn;