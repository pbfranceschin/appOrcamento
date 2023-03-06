import React from "react";
import AreaDropdown from "../AreaDropdown";

const AddOrg = (props) => {
    return (
        <>
        <div>
            <p>Cadastramento de novo órgão</p>
        </div>
        <div className='form-control pb-2'>
            <div>
                <input
                    className="border rounded p-1"
                    type='text'
                    placeholder = "endereço"
                    value={props.address1stAdd}
                    onChange = {(e) => props.setAddress1stAdd(e.target.value)}
                />
                {/* <input
                    className="border rounded"
                    type='number'
                    placeholder = "área (opcional)"
                    value={props.area1stAdd}
                    onChange = {(e) => props.setArea1stAdd(e.target.value)}
                /> */}
                <input
                    className="border rounded p-1"
                    type='text'
                    placeholder='nome'
                    value={props.nameAdd}
                    onChange={(e) => props.setNameAdd(e.target.value)}
                />
                <AreaDropdown
                setArea={props.setArea1stAdd}
                defaultValue=""
                defaultLabel="área (opcional)"
                />
            </div>
            
            <div className='pt-2'>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={props.handleAddOrg}
                >
                    {props.buttonAddOrgText}
                </button>
            </div>
        </div>
        </>
    )
}

export default AddOrg;