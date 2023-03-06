import React from "react";

const GetBalance = (props) => {

    return (
    <>
    <div className='form-control pb-2'>
        <input
            className="border rounded p-1"
            type='text'
            placeholder = "endereço"
            value={props.addressBalance}
            onChange = {(e) => props.setAddressBalance(e.target.value)}
        />
        <div className='pr-10'>
                <select 
                id="small"
                onChange={(e) => e.target.value === "escolha uma área" ? props.setAreaBalance("") : props.setAreaBalance(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                    <option defaultValue="">escolha uma área</option>
                    <option value="0">Ordinária</option>
                    <option value="1">Educação</option>
                    <option value="2">Infraestrutura</option>
                    <option value="3">Saúde</option>
                </select>
        </div>
        
        {/* <input
            className="border rounded p-1"
            type='number'
            placeholder = "área"
            value={props.areaBalance}
            onChange = {(e) => props.setAreaBalance(e.target.value)}
        />  */}
    </div>
    </>
    )   
}

export default GetBalance;