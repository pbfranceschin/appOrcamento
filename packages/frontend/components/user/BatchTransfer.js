import React from 'react';
import AreaDropdown from '../AreaDropdown';

const BatchTransfer = (props) => {
    return (
    <div className='form-control pb-2'>
        <div>
            <input
                className='border rounded p-1'
                type='text'
                placeholder='endereço'
                value={props.addressBatch}
                onChange={(e) => props.setBatchAddress(e.target.value)}
            />
        </div>
        <div>
            <input
                className='border rounded p-1'
                type='number'
                placeholder='montante 1'
                value={props.batchValue1}
                onChange={(e) => props.setBatchValue1(e.target.value)}
            />
            <AreaDropdown
                setArea={props.setBatchArea1}
                defaultValue=""
                defaultLabel="área 1"
            />

            {/* <div className='pr-10'>
                <select 
                id="small"
                onChange={(e) => e.target.value === "área 1" ? props.setBatchArea1("") : props.setBatchArea1(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                    <option defaultValue="">área 1</option>
                    <option value="0">Ordinária</option>
                    <option value="1">Educação</option>
                    <option value="2">Infraestrutura</option>
                    <option value="3">Saúde</option>
                </select>
            </div> */}
            {/* <input 
                className='border rounded'
                type='number'
                placeholder='área 1'
                value={props.batchArea1}
                onChange={(e) => props.setBatchArea1(e.target.value)}
            /> */}
        </div>
        <div>
            <input 
                className='border rounded p-1'
                type='number'
                placeholder='montante 2'
                value={props.bacthValue2}
                onChange={(e) => props.setBatchValue2(e.target.value)}
            />
            <AreaDropdown
                setArea={props.setBatchArea2}
                defaultValue=""
                defaultLabel="área 2"
            />
            
        </div>
        <div>
            <input 
                className='border rounded p-1'
                type='number'
                placeholder='montante 3'
                value={props.batchValue3}
                onChange={(e) => props.setBatchValue3(e.target.value)}
            />
            <AreaDropdown
                setArea={props.setBatchArea3}
                defaultValue=""
                defaultLabel="área 3"
            />
            
        </div>
        <div>
            <input 
                className='border rounded p-1'
                type='number'
                placeholder='montante 4'
                value={props.batchValue4}
                onChange={(e) => props.setBatchValue4(e.target.value)}
            />
            <AreaDropdown
                setArea={props.setBatchArea4}
                defaultValue=""
                defaultLabel="área 4"
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