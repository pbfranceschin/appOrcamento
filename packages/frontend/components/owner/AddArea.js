import React from "react";

const AddArea = (props) => {
    return (
        <>
        <div className='form-control pb-2'>
            <input
                className="border rounded"
                type='text'
                placeholder = "endereço"
                value={props.addressAdd}
                onChange = {(e) => props.setAddressAdd(e.target.value)}
            />
            <input
                className="border rounded"
                type='number'
                placeholder = "área"
                value={props.areaAdd}
                onChange = {(e) => props.setAreaAdd(e.target.value)}
            />
        </div>
        </>
    )
}

export default AddArea;