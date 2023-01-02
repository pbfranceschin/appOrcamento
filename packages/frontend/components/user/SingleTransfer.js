import React from 'react';


const SingleTransfer = (props) => {
    
    return (
        <>
        <div className='form-control pb-2'>
            <div>
            <input
                className="input input-bordered"
                type='text'
                placeholder = "endereço"
                value={props.addressSingle}
                onChange = {(e) => props.setAddressSingle(e.target.value)}
            />
            </div>
            <div>
            <input
                className="input input-bordered"
                type = "number"
                placeholder = "area"
                value={props.areaSingle}
                onChange = {(e) => props.setAreaSingle(e.target.value)}
            />
            <input 
                className="input input-bordered"
                type = "number"
                placeholder = "montante"
                value={props.valueSingle}
                onChange = {(e) => props.setValueSingle(e.target.value)}
            />
            </div>
        </div>
        </>
    )
}

export default SingleTransfer;