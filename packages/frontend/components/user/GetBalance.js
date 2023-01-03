import React from "react";

const GetBalance = (props) => {

    return (
    <>
    <div className='form-control pb-2'>
        <input
            className="input input-bordered"
            type='text'
            placeholder = "endereço"
            value={props.addressBalance}
            onChange = {(e) => props.setAddressBalance(e.target.value)}
        />
        <input
            className="input input-bordered"
            type='number'
            placeholder = "área"
            value={props.areaBalance}
            onChange = {(e) => props.setAreaBalance(e.target.value)}
        /> 
    </div>
    </>
    )   
}

export default GetBalance;