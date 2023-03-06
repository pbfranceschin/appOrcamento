import React from 'react';

const GetArea = (props) => {

    return (
        <>
        <div className='form-control pb-2'>
        <input
                className="border rounded p-1"
                type='text'
                placeholder = "endereço"
                value={props.areaGet}
                onChange = {(e) => props.setAreaGet(e.target.value)}
            />
        </div>        
        </>

    )
}

export default GetArea;