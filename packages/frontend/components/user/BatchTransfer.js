import React from 'react';

const BatchTransfer = (props) => {
    return (
    <div className='form-control pb-2'>
        <div>
            <input
                className='border rounded'
                type='text'
                placeholder='endereço'
                value={props.addressBatch}
                onChange={(e) => props.setBatchAddress(e.target.value)}
            />
        </div>
        <div>
            <input
                className='border rounded'
                type='number'
                placeholder='montante 1'
                value={props.batchValue1}
                onChange={(e) => props.setBatchValue1(e.target.value)}
            />
            <input 
                className='border rounded'
                type='number'
                placeholder='área 1'
                value={props.batchArea1}
                onChange={(e) => props.setBatchArea1(e.target.value)}
            />
        </div>
        <div>
            <input 
                className='border rounded'
                type='number'
                placeholder='montante 2'
                value={props.bacthValue2}
                onChange={(e) => props.setBatchValue2(e.target.value)}
            />
            <input
                className='border rounded'
                type='number'
                placeholder='área 2'
                value={props.batchArea2}
                onChange={(e) => props.setBatchArea2(e.target.value)}
            />
        </div>
        <div>
            <input 
                className='border rounded'
                type='number'
                placeholder='montante 3'
                value={props.batchValue3}
                onChange={(e) => props.setBatchValue3(e.target.value)}
            />
            <input 
                className='border rounded'
                type='number'
                placeholder='área 3'
                value={props.batchArea3}
                onChange={(e) => props.setBatchArea3(e.target.value)}
            />
        </div>
        <div>
            <input 
                className='border rounded'
                type='number'
                placeholder='montante 4'
                value={props.batchValue4}
                onChange={(e) => props.setBatchValue4(e.target.value)}
            />
            <input 
                className='border rounded'
                type='number'
                placeholder='área 4'
                value={props.batchArea4}
                onChange={(e) => props.setBatchArea4(e.target.value)}
            />
        </div>
        <div className='py-2'>
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.handleBatchTransfer}
            >
                {props.buttonBatchText}
            </button>
        </div>
    </div>
    )
}

export default BatchTransfer;