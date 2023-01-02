import React from 'react';

const BatchTransfer = (props) => {
    return (
    <div className='form-control pb-2'>
        <div>
            <input
                type='text'
                placeholder='endereço'
                onChange={(e) => props.setBatchAddress(e.target.value)}
            />
        </div>
        {/* <div>
            <input 
                type='number'
                placeholder='montante 1'
                // onChange={(e) => props.setBacthValue1(e.target.value)}
            />
            <input 
                type='number'
                placeholder='área 1'
                // onChange={(e) => props.setBatchArea1(e.target.value)}
            />
        </div> */}
        <div>
            <input 
                type='number'
                placeholder='montante 2'
                onChange={(e) => props.setBacthValue2(e.target.value)}
            />
            <input 
                type='number'
                placeholder='área 2'
                onChange={(e) => props.setBatchArea2(e.target.value)}
            />
        </div>
        {/* <div>
            <input 
                type='number'
                placeholder='montante 3'
                onChange={(e) => props.setBacthValue3(e.target.value)}
            />
            <input 
                type='number'
                placeholder='área 3'
                onChange={(e) => props.setBatchArea3(e.target.value)}
            />
        </div> */}
    </div>
    )
}

export default BatchTransfer;