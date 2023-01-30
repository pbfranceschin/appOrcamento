import React from "react";

const GetAddress = (props) => {

    return (
        <>
        <div className='form-control pb-2'>
        <input
                className="border rounded"
                type='text'
                placeholder = "nome do órgão"
                value={props.nameGet}
                onChange = {(e) => props.setNameGet(e.target.value)}
            />
        </div>        
        </>
    )
}

export default GetAddress;