import React from 'react';


const SingleTransfer = (props) => {


    return (
        <>
        <div className='form-control pb-2'>
            <div>
                <input
                    className="border rounded p-1"
                    type='text'
                    placeholder = "endereço"
                    value={props.addressSingle}
                    onChange = {(e) => props.setAddressSingle(e.target.value)}
                />
                <input 
                    className="border rounded p-1"
                    type = "number"
                    placeholder = "montante"
                    value={props.valueSingle}
                    onChange = {(e) => props.setValueSingle(e.target.value)}
                />
            </div>
            <div className='pr-10'>
                <select 
                id="area"
                // value={props.areaSingle === "" ? def  : props.areaSingle}
                onChange={(e) => e.target.value === "escolha uma área" ? props.setAreaSingle("") : props.setAreaSingle(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                    <option defaultValue="">escolha uma área</option>
                    <option value="0">Ordinária</option>
                    <option value="1">Educação</option>
                    <option value="2">Infraestrutura</option>
                    <option value="3">Saúde</option>
                </select>
            
            </div>
            <div className='py-2'>
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={props.handleSingleTransfer}
                    >
                        {props.buttonSingleText}
                </button>
            </div>
        </div>
        </>
    )
}

export default SingleTransfer;