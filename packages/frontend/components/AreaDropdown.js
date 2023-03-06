import React from 'react';

const options = [
    {
        label: "Ordinária",
        value: 0,
    },
    {
        label: "Educação",
        value: 1
    },
    {
        label: "Infraestrutura",
        value: 2
    },
    {
        label: "Saúde",
        value: 3
    }
]


const AreaDropdown = (props) => {

    return (
        <>
        <div className='py-1 pr-10'>
                <select 
                id="area"
                // value={props.areaSingle === "" ? def  : props.areaSingle}
                onChange={(e) => e.target.value === props.defaultLabel ? props.setArea("") : props.setArea(e.target.value)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                    <option defaultValue={props.defaultValue}>{props.defaultLabel}</option>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            
            </div>
        </>
    )
}

export default AreaDropdown;