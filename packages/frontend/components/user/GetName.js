import React from "react";

const GetName = (props) => {

    return (

        <>
        <div className='form-control pb-2'>
        <input
                className="border rounded"
                type='text'
                placeholder = "endereço"
                value={props.addressGet}
                onChange = {(e) => props.setAddressGet(e.target.value)}
            />
        </div>        
        </>
    )
}

export default GetName;