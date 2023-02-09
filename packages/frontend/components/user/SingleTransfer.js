import React from 'react';


const SingleTransfer = (props) => {
    
    return (
        <>
        <div className='form-control pb-2'>
            <div>
                <input
                    className="border rounded"
                    type='text'
                    placeholder = "endereço"
                    value={props.addressSingle}
                    onChange = {(e) => props.setAddressSingle(e.target.value)}
                />
            </div>
            <div>    
                <input 
                    className="border rounded"
                    type = "number"
                    placeholder = "montante"
                    value={props.valueSingle}
                    onChange = {(e) => props.setValueSingle(e.target.value)}
                />
                    <input
                        className="border rounded"
                        type = "number"
                        placeholder = "area"
                        value={props.areaSingle}
                        onChange = {(e) => props.setAreaSingle(e.target.value)}
                    />
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