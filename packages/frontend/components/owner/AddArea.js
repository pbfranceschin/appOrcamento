import React from "react";
import AreaDropdown from "../AreaDropdown";

const AddArea = (props) => {
    return (
        <>
        <div>
            <p>Cadastramento de órgão a nova área</p>
        </div>
        <div className='form-control pb-2'>
            <input
                className="border rounded p-1"
                type='text'
                placeholder = "endereço"
                value={props.addressAdd}
                onChange = {(e) => props.setAddressAdd(e.target.value)}
            />
            <AreaDropdown
                setArea={props.setAreaAdd}
                defaultValue=""
                defaultLabel="área"
            />
            
            {/* <input
                className="border rounded"
                type='number'
                placeholder = "área"
                value={props.areaAdd}
                onChange = {(e) => props.setAreaAdd(e.target.value)}
            /> */}
        </div>
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={props.handleAddArea}
            >
                {props.buttonAddAreaText}
            </button>
        </div>
        </>
    )
}

export default AddArea;